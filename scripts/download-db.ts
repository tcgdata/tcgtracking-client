import * as fs from 'node:fs/promises';
import { parseArgs } from 'node:util';
import * as path from 'node:path';
import { HTTPError, TCGTrackingClient } from '../src';
import { newQueue } from '@henrygd/queue';

const args = parseArgs({
  options: {
    directory: {
      type: 'string',
      short: 'd',
    },
  },
  strict: true,
});

if (!args.values.directory) {
  console.error('Script usage:');
  console.error('  npx tsx ./scripts/download-db.ts -d [output-directory]');
  process.exit(1);
}

const queue = newQueue(20);
const outputDirectory = path.resolve(process.cwd(), args.values.directory);
const notFoundFileName = path.resolve(outputDirectory, 'not-found.json');
let notFoundFiles: Array<string> = [];

try {
  const notFoundFilesRaw = (await fs.readFile(notFoundFileName)).toString('utf-8');
  notFoundFiles = JSON.parse(notFoundFilesRaw);
} catch {
  // file doesn't exist
}

const downloadIfMising = async <T>(
  filePath: string,
  downloader: () => Promise<T>,
  returnResult: boolean = true
): Promise<T | undefined> => {
  return queue.add(async () => {
    filePath = path.resolve(outputDirectory, filePath);

    if (notFoundFiles.includes(filePath)) {
      return;
    }

    try {
      await fs.access(filePath, fs.constants.F_OK);

      if (returnResult) {
        const content = await fs.readFile(filePath);
        return JSON.parse(content.toString('utf-8'));
      } else {
        // don't bother loading the file if it isn't going to be used
        return;
      }
    } catch {
      // file doesn't exist
    }

    try {
      const content = await downloader();
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(content, null, 2));

      if (returnResult) {
        return content;
      } else {
        return;
      }
    } catch (e) {
      if (e instanceof HTTPError && e.response?.status === 404) {
        notFoundFiles.push(filePath);
        await fs.writeFile(notFoundFileName, JSON.stringify(notFoundFiles, null, 2));
        return;
      }

      throw e;
    } finally {
      await new Promise((resolve) => {
        setTimeout(resolve, 200);
      });
    }
  });
};

const client = new TCGTrackingClient({ userAgent: 'TCGTracking-DB-Downloader/1.0' });

await fs.mkdir(outputDirectory, { recursive: true });

console.log('Downloading categories');
const { categories } = (await downloadIfMising('categories.json', () => client.getCategories()))!;

console.log('Downloading sets');
const setsByCategory = await Promise.all(
  categories.map(async (category) => {
    const response = await downloadIfMising(path.join('sets', `${category.id}.json`), () =>
      client.getSets(category.id)
    );

    if (!response) {
      return { category, sets: [] };
    }

    return { category, sets: response.sets };
  })
);

for (const { category, sets } of setsByCategory) {
  console.log(`Downloading products for category ${category.name} (${category.id})`);
  await Promise.all(
    sets.map(async (set) => {
      if (set.product_count === 0) {
        return;
      }

      await downloadIfMising(
        path.join('products', `${category.id}/${set.id}/products.json`),
        () => client.getProducts(category.id, set.id),
        false
      );
      await downloadIfMising(
        path.join('products', `${category.id}/${set.id}/prices.json`),
        () => client.getProductPrices(category.id, set.id),
        false
      );
      await downloadIfMising(
        path.join('products', `${category.id}/${set.id}/skus.json`),
        () => client.getProductSkus(category.id, set.id),
        false
      );
    })
  );
}
