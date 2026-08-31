import { faker } from '@faker-js/faker';
import { Product } from '../schemas';
import { CARD_TRADER_PRODUCT_TYPE, CARD_TRADER_PROPERTY_TYPE } from '../constants';

export const createMockProduct = (props: Partial<Product> = {}): Product => {
  return {
    id: faker.number.int(),
    name: faker.lorem.words(),
    clean_name: faker.lorem.words(),
    number: faker.lorem.word(),
    rarity: faker.lorem.words(),
    ext_data: {
      [faker.lorem.words()]: faker.lorem.words(),
    },
    image_url: faker.internet.url(),
    image_count: faker.number.int(),
    tcgplayer_url: faker.internet.url(),
    manapool_url: null,
    scryfall_id: null,
    mtgjson_uuid: null,
    cardmarket_id: faker.number.int(),
    cardtrader_id: faker.number.int(),
    cardtrader: [
      {
        id: faker.number.int(),
        name: faker.lorem.words(),
        match_type: faker.lorem.words(),
        match_confidence: faker.number.int(),
        expansion: faker.lorem.words(),
        expansion_code: faker.lorem.word(),
        collector_number: faker.lorem.word(),
        rarity: faker.lorem.words(),
        finishes: [faker.lorem.words()],
        languages: [faker.lorem.word()],
        properties: [
          {
            name: faker.lorem.words(),
            type: faker.helpers.enumValue(CARD_TRADER_PROPERTY_TYPE),
            default_value: faker.lorem.words(),
            possible_values: [faker.lorem.words()],
          },
        ],
        cardmarket_ids: [faker.number.int()],
        image_url: faker.internet.url(),
        scryfall_id: null,
        tcg_player_id: faker.number.int(),
        game_id: faker.number.int(),
        category_id: faker.number.int(),
        category_name: faker.lorem.words(),
        product_type: faker.helpers.enumValue(CARD_TRADER_PRODUCT_TYPE),
        group_id: faker.number.int(),
      },
    ],
    ...props,
  };
};
