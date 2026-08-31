import { Meta } from '../schemas';
import { faker } from '@faker-js/faker';

export const createMockMeta = (props: Partial<Meta> = {}): Meta => {
  return {
    last_updated: faker.date.recent().toISOString(),
    pricing_updated: faker.date.recent().toISOString(),
    total_categories: faker.number.int(),
    total_sets: faker.number.int(),
    total_products: faker.number.int(),
    version: '1.1',
    documentation: '/tcgapi/docs',
    file_types: {
      static: faker.lorem.words(),
      cards: faker.lorem.words(),
      sealed: faker.lorem.words(),
      pricing: faker.lorem.words(),
      skus: faker.lorem.words(),
    },
    last_export_stats: {
      sets_checked: faker.number.int(),
      static_updated: faker.number.int(),
      static_skipped: faker.number.int(),
      pricing_updated: faker.number.int(),
      skus_updated: faker.number.int(),
      products_exported: faker.number.int(),
    },
    ...props,
  };
};
