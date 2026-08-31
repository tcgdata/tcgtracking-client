import { faker } from '@faker-js/faker';
import { ProductSku } from '../schemas';
import {
  SKU_CONDITION_ABBREVIATION,
  SKU_LANGUAGE_ABBREVIATION,
  SKU_VARIANT,
  SKU_VARIANT_ABBREVIATION,
  SKU_VARIANT_ID,
} from '../constants';

export const createMockProductSku = (props: Partial<ProductSku> = {}): ProductSku => {
  return {
    cnd: faker.helpers.enumValue(SKU_CONDITION_ABBREVIATION),
    var: faker.helpers.enumValue(SKU_VARIANT),
    var_a: faker.helpers.enumValue(SKU_VARIANT_ABBREVIATION),
    vid: faker.helpers.enumValue(SKU_VARIANT_ID),
    lng: faker.helpers.enumValue(SKU_LANGUAGE_ABBREVIATION),
    mkt: faker.number.float(),
    low: faker.number.float(),
    hi: faker.number.float(),
    cnt: faker.number.float(),
    mp: faker.number.float(),
    ...props,
  };
};
