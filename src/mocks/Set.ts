import { Set } from '../schemas';
import { faker } from '@faker-js/faker';

export const createMockSet = (props: Partial<Set> = {}): Set => {
  return {
    id: faker.number.int(),
    name: faker.lorem.words(),
    abbreviation: faker.lorem.word(),
    type: null,
    is_supplemental: faker.datatype.boolean(),
    published_on: faker.date.recent().toISOString().split('T')[0],
    modified_on: faker.date.recent().toISOString(),
    product_count: 70,
    sku_count: 350,
    products_modified: faker.date.recent().toISOString(),
    pricing_modified: faker.date.recent().toISOString(),
    skus_modified: faker.date.recent().toISOString(),
    set_symbol_url: faker.internet.url(),
    set_symbol_cached: faker.datatype.boolean(),
    api_url: `/v1/${faker.number.int()}/sets/${faker.number.int()}`,
    cards_url: `/v1/${faker.number.int()}/sets/${faker.number.int()}/cards`,
    sealed_url: `/v1/${faker.number.int()}/sets/${faker.number.int()}/sealed`,
    pricing_url: `/v1/${faker.number.int()}/sets/${faker.number.int()}/pricing`,
    skus_url: `/v1/${faker.number.int()}/sets/${faker.number.int()}/skus`,
    ...props,
  };
};
