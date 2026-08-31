import { faker } from '@faker-js/faker';
import { ProductPrice } from '../schemas';
import { MANAPOOL_SKU_VARIANT, SKU_VARIANT } from '../constants';

export const createMockProductPrice = (props: Partial<ProductPrice> = {}): ProductPrice => {
  return {
    tcg: {
      [faker.helpers.enumValue(SKU_VARIANT)]: {
        low: faker.number.float(),
        market: faker.number.float(),
      },
    },
    manapool: {
      [faker.helpers.enumValue(MANAPOOL_SKU_VARIANT)]: faker.number.float(),
    },
    mp_qty: faker.number.int(),
    ...props,
  };
};
