import { Category } from '../schemas';
import { faker } from '@faker-js/faker';

export const createMockCategory = (props: Partial<Category> = {}): Category => {
  return {
    id: faker.number.int(),
    name: faker.lorem.words(),
    display_name: faker.lorem.words(),
    product_count: faker.number.int(),
    set_count: faker.number.int(),
    api_url: `/tcgapi/v1/${faker.number.int()}/sets`,
    ...props,
  };
};
