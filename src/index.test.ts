import * as index from './index';

describe('index', () => {
  test('Exposes expected exports', () => {
    expect({ ...index }).toStrictEqual({
      // Constants
      SET_TYPE: expect.any(Object),
      PRODUCT_TYPE: expect.any(Object),
      CARD_TRADER_PROPERTY_TYPE: expect.any(Object),
      CARD_TRADER_PRODUCT_TYPE: expect.any(Object),
      SKU_CONDITION: expect.any(Object),
      SKU_CONDITION_ABBREVIATION: expect.any(Object),
      SKU_CONDITION_ID: expect.any(Object),
      SKU_VARIANT: expect.any(Object),
      SKU_VARIANT_ABBREVIATION: expect.any(Object),
      SKU_VARIANT_ID: expect.any(Object),
      SKU_LANGUAGE: expect.any(Object),
      SKU_LANGUAGE_ABBREVIATION: expect.any(Object),
      SKU_LANGUAGE_ID: expect.any(Object),
      MANAPOOL_SKU_VARIANT: expect.any(Object),
      CATEGORY_ID: expect.any(Object),

      // Error classes
      HTTPError: expect.any(Function),
      ValidationError: expect.any(Function),

      // Client class
      TCGTrackingClient: expect.any(Function),
    });
  });
});
