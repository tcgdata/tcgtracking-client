# @tcgdata/tcgtracking-client

![NPM Version](https://img.shields.io/npm/v/%40tcgdata%2Ftcgtracking-client)
![CI](https://github.com/tcgdata/tcgtracking-client/actions/workflows/ci.yml/badge.svg)

A strongly typed JS client library for fetching data from https://openapi.tcgtracking.com/

This library is not affiliated or endorsed by TCGTracking.

## Notes

- See TCGTracking docs for additional details and best practices: https://openapi.tcgtracking.com/?tab=docs
- See `./scripts/download-db.ts` for example usage of the package, can be executed using `npx tsx ./scripts/download-db.ts -d [output-directory]`.

## Installation

```
npm i @tcgdata/tcgtracking-client
```

## Usage

```ts
import * as fs from 'node:fs/promises';
import { TCGTrackingClient, CATEGORY_ID } from '@tcgdata/tcgtracking-client';

// Create client object
const client = new TCGTrackingClient({
  userAgent: 'YourApplication/X.Y.Z',
});

// Download metadata, check when data was updated
// {
//   last_updated: '2026-08-30T13:41:31-04:00',
//   pricing_updated: '2026-08-30T13:41:31-04:00',
//   total_categories: 62,
//   total_sets: 3733,
//   total_products: 473317,
//   version: '1.1',
//   documentation: '/tcgapi/docs',
//   file_types: {
//     static: '{set_id}.json - All product data, cache for weeks',
//     cards: '{set_id}-cards.json - Card products only',
//     sealed: '{set_id}-sealed.json - Sealed products only',
//     pricing: '{set_id}-pricing.json - Prices, updated daily',
//     skus: '{set_id}-skus.json - SKU details with prices, updated daily'
//   },
//   last_export_stats: {
//     sets_checked: 4024,
//     static_updated: 0,
//     static_skipped: 3733,
//     pricing_updated: 359,
//     skus_updated: 2666,
//     products_exported: 0
//   }
// }
const meta = await client.getMeta();

// Query a list of categories
// {
//   categories: [
//     {
//       id: 3,
//       name: 'Pokemon',
//       display_name: 'Pokemon',
//       product_count: 32632,
//       set_count: 215,
//       api_url: '/tcgapi/v1/3/sets'
//     },
//     ...
//   ]
// }
const categories = await client.getCategories();

// Query a list of sets in a category
// {
//   category_id: 3,
//   category_name: 'Pokemon',
//   generated_at: '2026-08-29T13:36:52-04:00',
//   sets: [
//     {
//       id: 17689,
//       name: 'SWSH: Crown Zenith: Galarian Gallery',
//       abbreviation: 'CRZ:GG',
//       type: null,
//       is_supplemental: false,
//       published_on: '2023-01-20',
//       modified_on: '2026-08-29T06:00:07.000Z',
//       product_count: 70,
//       sku_count: 350,
//       products_modified: '2026-08-12T08:31:03-04:00',
//       pricing_modified: '2026-08-29T12:15:34-04:00',
//       skus_modified: '2026-08-29T13:36:43-04:00',
//       set_symbol_url: 'https://tcgtracking.com/scan/set-symbols/pokemon/CRZ_GG.png',
//       set_symbol_cached: true,
//       api_url: '/v1/3/sets/17689',
//       cards_url: '/v1/3/sets/17689/cards',
//       sealed_url: '/v1/3/sets/17689/sealed',
//       pricing_url: '/v1/3/sets/17689/pricing',
//       skus_url: '/v1/3/sets/17689/skus'
//     },
//     ...
//   ]
// }
const sets = await client.getSets(CATEGORY_ID.POKEMON);

// Query a list of products in a set
// {
//   set_id: 17689,
//   set_name: 'SWSH: Crown Zenith: Galarian Gallery',
//   set_abbr: 'CRZ:GG',
//   set_released: '2023-01-20',
//   product_count: 70,
//   data_modified: '2026-08-12T06:00:10-04:00',
//   file_generated: '2026-08-12T08:31:03-04:00',
//   pricing_url: '/v1/3/sets/17689/pricing',
//   cards_url: '/v1/3/sets/17689/cards',
//   sealed_url: '/v1/3/sets/17689/sealed',
//   skus_url: '/v1/3/sets/17689/skus',
//   products: [
//     {
//       id: 477057,
//       name: 'Mewtwo VSTAR',
//       clean_name: 'Mewtwo VSTAR',
//       number: 'GG44/GG70',
//       rarity: 'Ultra Rare',
//       ext_data: {
//         'Card Type': 'Psychic',
//         HP: '280',
//         Stage: 'VSTAR',
//         CardText: '<em>VSTAR rule — When your Pokémon VSTAR is Knocked Out, your opponent takes 2 Prize cards.</em>',
//         'Attack 1': '[1P] Psy Purge (90x)\r\n' +
//           '<br>\r\n' +
//           'Discard up to 3 Psychic Energy from your Pokémon. This attack does 90 damage for each card you discarded in this way.',
//         'Attack 2': '<span style="color:gold"><strong>VSTAR Power</strong></span>\r\n' +
//           '<br>\r\n' +
//           '[1P] Star Raid\r\n' +
//           '<br>\r\n' +
//           "This attack does 120 damage to each of your opponent's Pokémon V. This damage isn't affected by Weakness or Resistance. <em>(You can't use more than 1 VSTAR Power in a game.)</em>",
//         Weakness: 'Dx2',
//         Resistance: 'F-30',
//         RetreatCost: '2'
//       },
//       image_url: 'https://cdn.tcgtracking.com/product/477057_200w.jpg',
//       image_count: 1,
//       tcgplayer_url: 'https://partner.tcgplayer.com/c/6207277/1830156/21018?u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F477057%2Fpokemon-swsh-crown-zenith-galarian-gallery-mewtwo-vstar',
//       manapool_url: null,
//       scryfall_id: null,
//       mtgjson_uuid: null,
//       cardmarket_id: 691924,
//       cardtrader_id: 235148,
//       cardtrader: [
//         {
//           id: 235148,
//           name: 'Mewtwo VSTAR',
//           match_type: 'tcgplayer',
//           match_confidence: 100,
//           expansion: 'Crown Zenith',
//           expansion_code: 'crz',
//           collector_number: 'GG44',
//           rarity: 'Special Illustration Rare',
//           finishes: [ 'normal' ],
//           languages: [ 'en', 'fr', 'de', 'it', 'pt', 'es' ],
//           properties: [
//             {
//               name: 'condition',
//               type: 'string',
//               default_value: 'Near Mint',
//               possible_values: [
//                 'Mint',
//                 'Near Mint',
//                 'Slightly Played',
//                 'Moderately Played',
//                 'Played',
//                 'Poor'
//               ]
//             },
//             {
//               name: 'signed',
//               type: 'boolean',
//               default_value: 'false',
//               possible_values: [ true, false ]
//             },
//             {
//               name: 'altered',
//               type: 'boolean',
//               default_value: 'false',
//               possible_values: [ true, false ]
//             },
//             {
//               name: 'pokemon_language',
//               type: 'string',
//               default_value: 'en',
//               possible_values: [ 'en', 'fr', 'de', 'it', 'pt', 'es' ]
//             }
//           ],
//           cardmarket_ids: [ 691924 ],
//           image_url: 'https://cdn.tcgtracking.com/product/477057_200w.jpg',
//           scryfall_id: null,
//           tcg_player_id: 477057,
//           game_id: 5,
//           category_id: 73,
//           category_name: 'Pokémon Singles',
//           product_type: 'single',
//           group_id: 17688
//         }
//       ]
//     },
//    ...
//   ]
// }
const products = await client.getProducts(CATEGORY_ID.POKEMON, 17689 /*, 'sealed'|'cards' */);

// Query the prices of products in a set
// {
//   set_id: 17689,
//   updated: '2026-08-30T12:15:35-04:00',
//   prices: {
//     '477057': { tcg: { Holofoil: { low: 263.76, market: 274.33 } } }
//   }
// }
const prices = await client.getProductPrices(CATEGORY_ID.POKEMON, 17689);

// Query the SKUs of products in a set
// {
//   set_id: 17689,
//   updated: '2026-08-30T13:36:29-04:00',
//   sku_count: 350,
//   product_count: 70,
//   products: {
//     '477057': {
//       '6922026': {
//         cnd: 'NM',
//         var: 'Holofoil',
//         var_a: 'H',
//         vid: 3,
//         lng: 'EN',
//         mkt: 274.33,
//         low: 263.76,
//         hi: 310,
//         cnt: 25
//       },
//       '6922027': {
//         cnd: 'LP',
//         var: 'Holofoil',
//         var_a: 'H',
//         vid: 3,
//         lng: 'EN',
//         mkt: 262.33,
//         low: 222.74,
//         hi: 337.49,
//         cnt: 25
//       },
//       '6922028': {
//         cnd: 'MP',
//         var: 'Holofoil',
//         var_a: 'H',
//         vid: 3,
//         lng: 'EN',
//         mkt: 185.34,
//         low: 136.37,
//         hi: 240,
//         cnt: 10
//       },
//       '6922029': {
//         cnd: 'HP',
//         var: 'Holofoil',
//         var_a: 'H',
//         vid: 3,
//         lng: 'EN',
//         mkt: 139.8,
//         low: 82.5,
//         hi: 195.98,
//         cnt: 6
//       },
//       '6922030': {
//         cnd: 'DMG',
//         var: 'Holofoil',
//         var_a: 'H',
//         vid: 3,
//         lng: 'EN',
//         mkt: 142.4,
//         low: 100,
//         hi: 188.66,
//         cnt: 8
//       }
//     }
//   }
// }
const skus = await client.getProductSkus(CATEGORY_ID.POKEMON, 17689);

// Query comprehensive product data for a single product ID
// {
//   success: true,
//   product_id: 477057,
//   product: {
//     product_id: 477057,
//     category_id: 3,
//     group_id: 17689,
//     name: 'Mewtwo VSTAR',
//     clean_name: 'Mewtwo VSTAR',
//     search_blob: 'Mewtwo VSTAR Mewtwo VSTAR GG44/GG70 SWSH: Crown Zenith: Galarian Gallery CRZ:GG',
//     image_url: 'https://tcgplayer-cdn.tcgplayer.com/product/477057_200w.jpg',
//     url: 'https://www.tcgplayer.com/product/477057/pokemon-swsh-crown-zenith-galarian-gallery-mewtwo-vstar',
//     modified_on: '2026-08-22T06:02:50.000Z',
//     image_count: 1,
//     is_presale: 0,
//     presale_release_on: null,
//     presale_note: null,
//     ext_number: 'GG44/GG70',
//     ext_rarity: 'Ultra Rare',
//     sealed_packaging: null,
//     ext_data: {
//       'Card Type': 'Psychic',
//       HP: '280',
//       Stage: 'VSTAR',
//       CardText: '<em>VSTAR rule — When your Pokémon VSTAR is Knocked Out, your opponent takes 2 Prize cards.</em>',
//       'Attack 1': '[1P] Psy Purge (90x)\r\n' +
//         '<br>\r\n' +
//         'Discard up to 3 Psychic Energy from your Pokémon. This attack does 90 damage for each card you discarded in this way.',
//       'Attack 2': '<span style="color:gold"><strong>VSTAR Power</strong></span>\r\n' +
//         '<br>\r\n' +
//         '[1P] Star Raid\r\n' +
//         '<br>\r\n' +
//         "This attack does 120 damage to each of your opponent's Pokémon V. This damage isn't affected by Weakness or Resistance. <em>(You can't use more than 1 VSTAR Power in a game.)</em>",
//       Weakness: 'Dx2',
//       Resistance: 'F-30',
//       RetreatCost: '2'
//     },
//     market_price: '283.43',
//     manapool_low: null,
//     manapool_qty: null,
//     scryfall_id: null,
//     mtgjson_uuid: null,
//     cardmarket_id: 691924,
//     cardtrader_id: 235148,
//     cardtrader_expansion_id: 3171,
//     cardtrader_synced_at: '2026-05-30T06:52:10.000Z',
//     mtg_colors: null,
//     mtg_color_identity: null,
//     mtg_mana_value: null,
//     mtg_finishes: null,
//     mtg_is_full_art: null,
//     mtg_is_promo: null,
//     mtg_is_textless: null,
//     mtg_frame_effects: null,
//     mtg_promo_types: null,
//     mtg_border_color: null,
//     mtg_keywords: null,
//     mtgjson_synced_at: null,
//     mtg_primary_color: null,
//     created_at: '2026-01-25T13:19:47.000Z',
//     updated_at: '2026-08-22T06:02:50.000Z',
//     set_name: 'SWSH: Crown Zenith: Galarian Gallery',
//     set_abbr: 'CRZ:GG',
//     set_released: '2023-01-20',
//     set_modified: '2026-08-30T06:00:10.000Z',
//     category_name: 'Pokemon',
//     category_display_name: 'Pokemon'
//   },
//   prices: {
//     tcgplayer: [
//       {
//         product_id: 477057,
//         sub_type_name: 'Holofoil',
//         low_price: '263.76',
//         mid_price: '346.96',
//         high_price: '2497.92',
//         market_price: '275.33',
//         direct_low_price: '309.89',
//         updated_at: '2026-08-30T20:12:25.000Z'
//       },
//      ...
//     ],
//     manapool: null,
//     manapool_variants: []
//   },
//   skus: [
//     {
//       sku_id: 6922026,
//       product_id: 477057,
//       condition_name: 'Near Mint',
//       variant_name: 'Holofoil',
//       language_name: 'English',
//       condition_id: 1,
//       variant_id: 3,
//       language_id: 1,
//       market_price: '275.33',
//       lowest_price: '263.76',
//       highest_price: '310.00',
//       price_count: 25,
//       price_updated_at: '2026-08-30T20:11:13.000Z',
//       sku_checked_at: '2026-08-06T14:28:09.000Z',
//       created_at: '2026-01-29T11:39:44.000Z',
//       updated_at: '2026-08-30T20:11:13.000Z'
//     },
//     ...
//   ],
//   sku_count: 5,
//   sku_dimensions: {
//     variants: [ { id: 3, name: 'Holofoil' } ],
//     conditions: [
//       { id: 1, name: 'Near Mint' },
//       ...
//     ],
//     languages: [ { id: 1, name: 'English' } ]
//   },
//   sku_sync_status: {
//     product_id: 477057,
//     sku_count: 5,
//     last_synced_at: '2026-08-06T14:28:09.000Z',
//     last_changed_at: null,
//     sync_error: null
//   },
//   cardtrader: {
//     product_map: [
//       {
//         product_id: 477057,
//         category_id: 3,
//         blueprint_id: 235148,
//         variant_foil: 'nonfoil',
//         variant_language: 'en',
//         variant_finish: null,
//         match_type: 'tcgplayer',
//         match_confidence: 100,
//         created_at: '2026-05-30T06:52:01.000Z',
//         updated_at: '2026-05-30T06:52:01.000Z'
//       }
//     ],
//     blueprints: [
//       {
//         product_id: 477057,
//         blueprint_id: 235148,
//         match_type: 'tcgplayer',
//         match_confidence: 100,
//         name: 'Mewtwo VSTAR',
//         version: 'Special Illustration Rare | GG44/GG70',
//         ct_game_id: 5,
//         ct_category_id: 73,
//         ct_expansion_id: 3171,
//         rarity: 'Special Illustration Rare',
//         collector_number: 'GG44',
//         fixed_properties: '{"collector_number":"GG44","pokemon_rarity":"Special Illustration Rare"}',
//         has_foil: 0,
//         has_nonfoil: 1,
//         has_etched: 0,
//         languages: [ 'en', 'fr', 'de', 'it', 'pt', 'es' ],
//         editable_properties: [
//           {
//             name: 'condition',
//             type: 'string',
//             default_value: 'Near Mint',
//             possible_values: [
//               'Mint',
//               'Near Mint',
//               'Slightly Played',
//               'Moderately Played',
//               'Played',
//               'Poor'
//             ]
//           },
//           ...
//         ],
//         scryfall_id: '',
//         tcg_player_id: 477057,
//         image_url: 'https://cardtrader.com/uploads/blueprints/image/235148/preview_mewtwo-vstar-ultra-rare-gg44-gg70-crown-zenith(2).jpg',
//         content_hash: '3eca8fcb04d9564b5f9a114b17a0700a',
//         created_at: '2026-01-29T08:35:28.000Z',
//         updated_at: '2026-07-01T05:09:27.000Z',
//         expansion_name: 'Crown Zenith',
//         expansion_code: 'crz',
//         cardtrader_group_id: 17688,
//         cardtrader_category_name: 'Pokémon Singles',
//         cardtrader_product_type: 'single',
//         card_market_ids: [ 691924 ]
//       }
//     ],
//     sku_mappings: [
//       {
//         sku_id: 6922026,
//         blueprint_id: 235148,
//         ct_condition: 'Near Mint',
//         ct_language: 'en',
//         ct_foil: 1,
//         tcg_condition_id: 1,
//         tcg_variant_id: 3,
//         tcg_language_id: 1,
//         created_at: '2026-05-30T07:11:45.000Z',
//         updated_at: '2026-07-02T06:05:48.000Z'
//       },
//       ...
//     ]
//   }
// }
const product = await client.getProduct(477057);

// Search for sets in a category
// {
//   query: 'crown',
//   category_id: 3,
//   count: 3,
//   sets: [
//     {
//       id: 17689,
//       name: 'SWSH: Crown Zenith: Galarian Gallery',
//       abbreviation: 'CRZ:GG',
//       type: null,
//       is_supplemental: false,
//       published_on: '2023-01-20',
//       modified_on: '2026-08-30T06:00:10.000Z',
//       product_count: 70,
//       sku_count: 350,
//       products_modified: '2026-08-12T08:31:03-04:00',
//       pricing_modified: '2026-08-30T12:15:35-04:00',
//       skus_modified: '2026-08-30T13:36:29-04:00',
//       set_symbol_url: 'https://tcgtracking.com/scan/set-symbols/pokemon/CRZ_GG.png',
//       set_symbol_cached: true,
//       api_url: '/v1/3/sets/17689',
//       cards_url: '/v1/3/sets/17689/cards',
//       sealed_url: '/v1/3/sets/17689/sealed',
//       pricing_url: '/v1/3/sets/17689/pricing',
//       skus_url: '/v1/3/sets/17689/skus'
//     },
//     ...
//   ]
// }
const filteredSets = await client.searchSets(CATEGORY_ID.POKEMON, 'crown');

// Identify card from a pre-cropped, max image size 100KB.
// {
//   success: true,
//   game_id: 3,
//   set_ids: [ 17689 ],
//   cropped_image: '...',
//   results: [
//     {
//       product_id: 477057,
//       score: 53,
//       name: 'Mewtwo VSTAR',
//       number: 'GG44/GG70',
//       printing: 'Normal',
//       set_id: 17689
//     }
//   ],
//   candidates_scanned: 70
// }
const matchedCards = await client.scan({
  gameId: CATEGORY_ID.POKEMON,
  setIds: [17689], // optional
  image: await fs.readFile('/path/to/image.jpg'),
  limit: 5, // or 10
});
```
