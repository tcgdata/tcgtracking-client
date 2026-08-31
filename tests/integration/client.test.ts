import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import { CATEGORY_ID, TCGTrackingClient } from '../../src';
import { expect } from 'vitest';

describe('Client', () => {
  let client: TCGTrackingClient;

  beforeEach(() => {
    client = new TCGTrackingClient({ userAgent: 'TCGTracking-Client-Integration-Tests/1.0' });
  });

  describe('getMeta', () => {
    test('Returns metadata about the database', async () => {
      const meta = await client.getMeta();

      expect(meta).toStrictEqual({
        documentation: '/tcgapi/docs',
        file_types: {
          cards: '{set_id}-cards.json - Card products only',
          pricing: '{set_id}-pricing.json - Prices, updated daily',
          sealed: '{set_id}-sealed.json - Sealed products only',
          skus: '{set_id}-skus.json - SKU details with prices, updated daily',
          static: '{set_id}.json - All product data, cache for weeks',
        },
        last_export_stats: {
          pricing_updated: expect.any(Number),
          products_exported: expect.any(Number),
          sets_checked: expect.any(Number),
          skus_updated: expect.any(Number),
          static_skipped: expect.any(Number),
          static_updated: expect.any(Number),
        },
        last_updated: expect.any(String),
        pricing_updated: expect.any(String),
        total_categories: expect.any(Number),
        total_products: expect.any(Number),
        total_sets: expect.any(Number),
        version: '1.1',
      });
    });
  });

  describe('getCategories', () => {
    test('Returns a list of categories', async () => {
      const result = await client.getCategories();

      expect(result).toStrictEqual({
        categories: expect.arrayContaining([
          expect.objectContaining({
            id: 3,
            name: 'Pokemon',
          }),
        ]),
      });
    });
  });

  describe('getSets', () => {
    test('Returns a list of sets', async () => {
      const result = await client.getSets(CATEGORY_ID.POKEMON_JAPAN);

      expect(result).toStrictEqual({
        category_id: 85,
        category_name: 'Pokemon Japan',
        generated_at: expect.any(String),
        sets: expect.arrayContaining([
          expect.objectContaining({
            id: 23645,
            name: 'S12a: VSTAR Universe',
          }),
        ]),
      });
    });
  });

  describe('searchSets', () => {
    test('Returns a list of matching sets', async () => {
      const result = await client.searchSets(CATEGORY_ID.WEISS_SCHWARZ, 'Fate/Zero');

      expect(result).toStrictEqual({
        category_id: 20,
        count: expect.any(Number),
        query: 'fate/zero',
        sets: expect.arrayContaining([
          expect.objectContaining({
            id: 23554,
            name: 'Fate/Zero Chronicle Set',
          }),
        ]),
      });
    });
  });

  describe('getProducts', () => {
    test('Returns a list of products', async () => {
      const result = await client.getProducts(CATEGORY_ID.MAGIC_THE_GATHERING, 2576);

      expect(result).toStrictEqual({
        set_id: 2576,
        set_name: 'Secret Lair Drop Series',
        set_abbr: 'SLD',
        set_released: '2026-06-23',
        product_count: 4283,
        data_modified: expect.any(String),
        file_generated: expect.any(String),
        pricing_url: '/v1/1/sets/2576/pricing',
        cards_url: '/v1/1/sets/2576/cards',
        sealed_url: '/v1/1/sets/2576/sealed',
        skus_url: '/v1/1/sets/2576/skus',
        products: expect.arrayContaining([
          expect.objectContaining({
            id: 659468,
            name: 'Aloy, Savior of Meridian (Rainbow Foil)',
          }),
        ]),
      });
    });
  });

  describe('getProduct', () => {
    test('Returns a product', async () => {
      const result = await client.getProduct(659468);

      expect(result).toStrictEqual(
        expect.objectContaining({
          product: expect.objectContaining({
            product_id: 659468,
            name: 'Aloy, Savior of Meridian (Rainbow Foil)',
          }),
        })
      );
    });
  });

  describe('getProductPrices', () => {
    test('Returns a list of product prices', async () => {
      const result = await client.getProductPrices(CATEGORY_ID.MAGIC_THE_GATHERING, 2576);

      expect(result).toStrictEqual(
        expect.objectContaining({
          prices: expect.objectContaining({
            659468: {
              tcg: {
                Foil: {
                  low: expect.any(Number),
                  market: expect.any(Number),
                },
              },
            },
          }),
        })
      );
    });
  });

  describe('getProductSkus', () => {
    test('Returns a list of product SKUS', async () => {
      const result = await client.getProductSkus(CATEGORY_ID.MAGIC_THE_GATHERING, 2576);

      expect(result).toStrictEqual(
        expect.objectContaining({
          products: expect.objectContaining({
            '659468': expect.objectContaining({
              '8968389': {
                cnd: 'NM',
                var: 'Foil',
                var_a: 'F',
                vid: expect.any(Number),
                lng: 'EN',
                mkt: expect.any(Number),
                low: expect.any(Number),
                hi: expect.any(Number),
                cnt: expect.any(Number),
                mp: expect.any(Number),
              },
            }),
          }),
        })
      );
    });
  });

  describe('scan', () => {
    test('Returns products which match the provided image', async () => {
      const fileName = path.resolve(import.meta.dirname, 'fixtures', 'mewtwo-gg44.jpg');
      const file = await fs.readFile(fileName);
      const result = await client.scan({
        gameId: CATEGORY_ID.POKEMON,
        image: file,
        limit: 5,
      });

      expect(result).toStrictEqual({
        candidates_scanned: 28911,
        cropped_image: expect.any(String),
        game_id: 3,
        results: expect.arrayContaining([
          {
            name: 'Mewtwo VSTAR',
            number: 'GG44/GG70',
            printing: 'Normal',
            product_id: 477057,
            score: expect.any(Number),
            set_id: 17689,
          },
        ]),
        set_ids: [],
        success: true,
      });
    });
  });
});
