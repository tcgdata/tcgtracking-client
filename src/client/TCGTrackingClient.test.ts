import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { faker } from '@faker-js/faker';
import { TCGTrackingClient } from './TCGTrackingClient';
import {
  CategoryList,
  ProductList,
  ProductSkuList,
  SetList,
  ProductPriceList,
  SetSearchList,
} from '../schemas';
import { CATEGORY_ID, PRODUCT_TYPE } from '../constants';
import {
  createMockExpandedProduct,
  createMockMeta,
  createMockProduct,
  createMockScanResult,
  createMockCategory,
  createMockSet,
  createMockProductPrice,
  createMockProductSku,
} from '../mocks';
import { ScanProps } from './TCGTrackingClient.types';

describe('TCGTrackingClient', () => {
  const server = setupServer();
  let userAgent: string;
  let client: TCGTrackingClient;

  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });

  beforeEach(() => {
    userAgent = faker.internet.userAgent();
    client = new TCGTrackingClient({ userAgent });
    server.resetHandlers();
  });

  describe('Common behaviour', () => {
    test('Attaches customer user agent header to request', async () => {
      let requestUserAgent: string | null = null;
      const expectedResult: CategoryList = {
        categories: [],
      };

      server.use(
        http.get('https://openapi.tcgtracking.com/v1/categories', ({ request }) => {
          requestUserAgent = request.headers.get('user-agent');
          return HttpResponse.json(expectedResult);
        })
      );

      await client.getCategories();
      expect(requestUserAgent).toBe(userAgent);
    });

    test('Throws if a non-success response status is returned', async () => {
      const error = faker.lorem.words();

      server.use(
        http.get('https://openapi.tcgtracking.com/v1/categories', () =>
          HttpResponse.text(error, { status: 500 })
        )
      );

      await expect(client.getCategories()).rejects.toThrow(
        `Failed to fetch "https://openapi.tcgtracking.com/v1/categories", received status 500: ${error}`
      );
    });

    test('Removes unknown properties from the response when strict is disabled', async () => {
      const expectedResult: CategoryList = {
        categories: [],
        extra: 'property',
      };

      server.use(
        http.get('https://openapi.tcgtracking.com/v1/categories', () =>
          HttpResponse.json(expectedResult, { status: 200 })
        )
      );

      expect(await client.getCategories()).toStrictEqual({ categories: [] });
    });

    test('Throws if unknown properties are in the response when strict is enabled', async () => {
      const expectedResult: CategoryList = {
        categories: [],
        extra: 'property',
      };

      server.use(
        http.get('https://openapi.tcgtracking.com/v1/categories', () =>
          HttpResponse.json(expectedResult, { status: 200 })
        )
      );

      client = new TCGTrackingClient({
        userAgent: faker.internet.userAgent(),
        strict: true,
      });

      await expect(client.getCategories()).rejects.toThrow(/Unrecognized key: \\"extra\\"/);
    });
  });

  describe('getMeta', () => {
    test('Returns metadata about the database', async () => {
      const expectedResult = createMockMeta();

      server.use(
        http.get('https://openapi.tcgtracking.com/v1/meta', () => HttpResponse.json(expectedResult))
      );

      const categories = await client.getMeta();
      expect(categories).toStrictEqual(expectedResult);
    });
  });

  describe('getCategories', () => {
    test('Returns a list of categories', async () => {
      const expectedResult: CategoryList = {
        categories: [createMockCategory()],
      };

      server.use(
        http.get('https://openapi.tcgtracking.com/v1/categories', () =>
          HttpResponse.json(expectedResult)
        )
      );

      const categories = await client.getCategories();
      expect(categories).toStrictEqual(expectedResult);
    });
  });

  describe('getSets', () => {
    test('Returns a list of sets', async () => {
      const expectedResult: SetList = {
        category_id: faker.number.int(),
        category_name: faker.lorem.words(),
        generated_at: faker.date.recent().toISOString(),
        sets: [createMockSet()],
      };

      server.use(
        http.get(`https://openapi.tcgtracking.com/v1/${CATEGORY_ID.POKEMON}/sets`, () =>
          HttpResponse.json(expectedResult)
        )
      );

      const categories = await client.getSets(CATEGORY_ID.POKEMON);
      expect(categories).toStrictEqual(expectedResult);
    });

    test('Throws if attempting to query a non-integer category', async () => {
      // @ts-expect-error Testing bad input
      await expect(client.getSets('not/a/number')).rejects.toThrow(
        'Category "not/a/number" is invalid, must be a positive integer.'
      );
    });
  });

  describe('searchSets', () => {
    test('Returns a list of matching sets', async () => {
      const categoryId = faker.number.int();
      const query = faker.lorem.words(5);
      const expectedResult: SetSearchList = {
        query,
        category_id: faker.number.int(),
        count: faker.number.int(),
        sets: [createMockSet()],
      };

      let requestUrlQuery: string | undefined = undefined;

      server.use(
        http.get(`https://openapi.tcgtracking.com/v1/${categoryId}/search`, ({ request }) => {
          requestUrlQuery = new URL(request.url).search;
          return HttpResponse.json(expectedResult);
        })
      );

      const categories = await client.searchSets(categoryId, query);
      expect(categories).toStrictEqual(expectedResult);

      // Query should be url encoded
      expect(requestUrlQuery).toBe(`?q=${encodeURIComponent(query)}`);
      expect(requestUrlQuery).not.toBe(`?q=${query}`);
    });

    test('Throws if attempting to search a non-integer category', async () => {
      // @ts-expect-error Testing bad input
      await expect(client.searchSets('not/a/number')).rejects.toThrow(
        'Category "not/a/number" is invalid, must be a positive integer.'
      );
    });
  });

  describe('getProducts', () => {
    test('Returns a list of products', async () => {
      const categoryId = faker.number.int();
      const setId = faker.number.int();
      const expectedResult: ProductList = {
        set_id: faker.number.int(),
        set_name: faker.lorem.words(),
        set_abbr: faker.lorem.word(),
        set_released: faker.date.recent().toISOString().split('T')[0],
        product_count: faker.number.int(),
        data_modified: faker.date.recent().toISOString(),
        file_generated: faker.date.recent().toISOString(),
        pricing_url: `/v1/${categoryId}/sets/${setId}/pricing`,
        cards_url: `/v1/${categoryId}/sets/${setId}/cards`,
        sealed_url: `/v1/${categoryId}/sets/${setId}/sealed`,
        skus_url: `/v1/${categoryId}/sets/${setId}/skus`,
        products: [createMockProduct()],
      };

      server.use(
        http.get(`https://openapi.tcgtracking.com/v1/${categoryId}/sets/${setId}`, () =>
          HttpResponse.json(expectedResult)
        )
      );

      const products = await client.getProducts(categoryId, setId);
      expect(products).toStrictEqual(expectedResult);
    });

    test('Returns a filtered list of products when a product type is provided', async () => {
      const categoryId = faker.number.int();
      const setId = faker.number.int();
      const productType = faker.helpers.enumValue(PRODUCT_TYPE);
      const expectedResult: ProductList = {
        set_id: faker.number.int(),
        set_name: faker.lorem.words(),
        set_abbr: faker.lorem.word(),
        set_released: faker.date.recent().toISOString().split('T')[0],
        product_count: faker.number.int(),
        data_modified: faker.date.recent().toISOString(),
        file_generated: faker.date.recent().toISOString(),
        pricing_url: `/v1/${categoryId}/sets/${setId}/pricing`,
        cards_url: `/v1/${categoryId}/sets/${setId}/cards`,
        sealed_url: `/v1/${categoryId}/sets/${setId}/sealed`,
        skus_url: `/v1/${categoryId}/sets/${setId}/skus`,
        products: [createMockProduct()],
      };

      server.use(
        http.get(
          `https://openapi.tcgtracking.com/v1/${categoryId}/sets/${setId}/${productType}`,
          () => HttpResponse.json(expectedResult)
        )
      );

      const products = await client.getProducts(categoryId, setId, productType);
      expect(products).toStrictEqual(expectedResult);
    });

    test('Throws if attempting to query a non-integer category', async () => {
      // @ts-expect-error Testing bad input
      await expect(client.getProducts('not/a/number', faker.number.int())).rejects.toThrow(
        'Category "not/a/number" is invalid, must be a positive integer.'
      );
    });

    test('Throws if attempting to query a non-integer set', async () => {
      // @ts-expect-error Testing bad input
      await expect(client.getProducts(faker.number.int(), 'not/a/number')).rejects.toThrow(
        'Set "not/a/number" is invalid, must be a positive integer.'
      );
    });

    test('Throws if attempting to filter by an invalid product type', async () => {
      const productType = faker.lorem.words();

      await expect(
        // @ts-expect-error Testing bad input
        client.getProducts(faker.number.int(), faker.number.int(), productType)
      ).rejects.toThrow(`Product type "${productType}" is invalid, must be one of: cards, sealed.`);
    });
  });

  describe('getProduct', () => {
    test('Returns a single product', async () => {
      const productId = faker.number.int();
      const expectedResult = createMockExpandedProduct();

      server.use(
        http.get(`https://openapi.tcgtracking.com/v1/products/${productId}`, () =>
          HttpResponse.json(expectedResult)
        )
      );

      const products = await client.getProduct(productId);
      expect(products).toStrictEqual(expectedResult);
    });

    test('Throws if attempting to query a non-integer set', async () => {
      // @ts-expect-error Testing bad input
      await expect(client.getProduct('not/a/number')).rejects.toThrow(
        'Product "not/a/number" is invalid, must be a positive integer.'
      );
    });
  });

  describe('getProductPrices', () => {
    test('Returns a list of product prices', async () => {
      const categoryId = faker.number.int();
      const setId = faker.number.int();
      const expectedResult: ProductPriceList = {
        set_id: faker.number.int(),
        updated: faker.date.recent().toISOString(),
        prices: {
          [faker.number.int()]: createMockProductPrice(),
        },
      };

      server.use(
        http.get(`https://openapi.tcgtracking.com/v1/${categoryId}/sets/${setId}/pricing`, () =>
          HttpResponse.json(expectedResult)
        )
      );

      const prices = await client.getProductPrices(categoryId, setId);
      expect(prices).toStrictEqual(expectedResult);
    });

    test('Returns an empty object when no TCGplayer prices are available for a product', async () => {
      const categoryId = faker.number.int();
      const setId = faker.number.int();
      const productId = faker.number.int();
      const expectedResult: ProductPriceList = {
        set_id: faker.number.int(),
        updated: faker.date.recent().toISOString(),
        prices: {
          [productId]: createMockProductPrice({
            // @ts-expect-error TCGTracking returns an empty array rather than an object when it has no
            //   TCGPlayer pricing
            tcg: [],
          }),
        },
      };

      server.use(
        http.get(`https://openapi.tcgtracking.com/v1/${categoryId}/sets/${setId}/pricing`, () =>
          HttpResponse.json(expectedResult)
        )
      );

      const prices = await client.getProductPrices(categoryId, setId);
      expect(prices).toStrictEqual({
        ...expectedResult,
        prices: {
          [productId]: {
            ...expectedResult.prices[productId],
            tcg: {},
          },
        },
      });
    });

    test('Throws if attempting to query a non-integer category', async () => {
      // @ts-expect-error Testing bad input
      await expect(client.getProductPrices('not/a/number', faker.number.int())).rejects.toThrow(
        'Category "not/a/number" is invalid, must be a positive integer.'
      );
    });

    test('Throws if attempting to query a non-integer set', async () => {
      // @ts-expect-error Testing bad input
      await expect(client.getProductPrices(faker.number.int(), 'not/a/number')).rejects.toThrow(
        'Set "not/a/number" is invalid, must be a positive integer.'
      );
    });
  });

  describe('getProductSkus', () => {
    test('Returns a list of product SKUs', async () => {
      const categoryId = faker.number.int();
      const setId = faker.number.int();
      const expectedResult: ProductSkuList = {
        set_id: faker.number.int(),
        updated: faker.date.recent().toISOString(),
        sku_count: faker.number.int(),
        product_count: faker.number.int(),
        products: {
          [faker.number.int()]: {
            [faker.number.int()]: createMockProductSku(),
          },
        },
      };

      server.use(
        http.get(`https://openapi.tcgtracking.com/v1/${categoryId}/sets/${setId}/skus`, () =>
          HttpResponse.json(expectedResult)
        )
      );

      const skus = await client.getProductSkus(categoryId, setId);
      expect(skus).toStrictEqual(expectedResult);
    });

    test('Throws if attempting to query a non-integer category', async () => {
      // @ts-expect-error Testing bad input
      await expect(client.getProductSkus('not/a/number', faker.number.int())).rejects.toThrow(
        'Category "not/a/number" is invalid, must be a positive integer.'
      );
    });

    test('Throws if attempting to query a non-integer set', async () => {
      // @ts-expect-error Testing bad input
      await expect(client.getProductSkus(faker.number.int(), 'not/a/number')).rejects.toThrow(
        'Set "not/a/number" is invalid, must be a positive integer.'
      );
    });
  });

  describe('scan', () => {
    test('Returns a list of products which match the provided image', async () => {
      const scanProps: ScanProps = {
        setIds: [faker.number.int()],
        gameId: faker.number.int(),
        limit: 5,
        image: Buffer.from('faker-image-content', 'utf-8'),
      };
      const expectedResult = createMockScanResult();
      let requestBody: unknown;

      server.use(
        http.post(`https://openapi.tcgtracking.com/v1/scan`, async ({ request }) => {
          requestBody = await request.clone().json();
          return HttpResponse.json(expectedResult);
        })
      );

      const result = await client.scan(scanProps);
      expect(result).toStrictEqual(expectedResult);
      expect(requestBody).toStrictEqual({
        game_id: scanProps.gameId,
        image: 'data:image/jpeg;base64,ZmFrZXItaW1hZ2UtY29udGVudA==',
        limit: scanProps.limit,
        set_ids: scanProps.setIds,
      });
    });

    test('Throws an error if invalid input is provided', async () => {
      const scanProps = 'invalid';
      // @ts-expect-error Testing bad input
      await expect(client.scan(scanProps)).rejects.toThrow(
        'Invalid scan inputs: [\n' +
          '  {\n' +
          '    "expected": "object",\n' +
          '    "code": "invalid_type",\n' +
          '    "path": [],\n' +
          '    "message": "Invalid input: expected object, received string"\n' +
          '  }\n' +
          ']'
      );
    });
  });
});
