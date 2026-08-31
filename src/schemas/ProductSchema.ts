import { z } from 'zod';
import { CARD_TRADER_PRODUCT_TYPE, CARD_TRADER_PROPERTY_TYPE } from '../constants';

export const ProductCardTraderPropertySchema = z.object({
  name: z.string(),
  type: z.union([z.string(), z.enum(CARD_TRADER_PROPERTY_TYPE)]),
  default_value: z.string(),
  possible_values: z.array(z.union([z.string(), z.boolean()])),
});

export const ProductCardTraderDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  match_type: z.string(),
  match_confidence: z.number(),
  expansion: z.string(),
  expansion_code: z.string(),
  collector_number: z.string().nullable(),
  rarity: z.string().nullable(),
  finishes: z.array(z.string()),
  languages: z.array(z.string()),
  properties: z.array(ProductCardTraderPropertySchema),
  cardmarket_ids: z.array(z.number()),
  image_url: z.url(),
  scryfall_id: z.string().nullable(),
  tcg_player_id: z.number(),
  game_id: z.number(),
  category_id: z.number(),
  category_name: z.string(),
  product_type: z.union([z.string(), z.enum(CARD_TRADER_PRODUCT_TYPE)]),
  group_id: z.number().nullable(),
});

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  clean_name: z.string(),
  number: z.string().nullable(),
  rarity: z.string().nullable(),
  ext_data: z.record(z.string(), z.union([z.array(z.string()), z.string().nullable()])).nullable(),
  image_url: z.url(),
  image_count: z.number(),
  tcgplayer_url: z.url().nullable(),
  manapool_url: z.url().nullable(),
  scryfall_id: z.string().nullable(),
  mtgjson_uuid: z.string().nullable(),
  cardmarket_id: z.number().nullable(),
  cardmarket_ids: z.array(z.number().nullable()).optional(),
  cardtrader_id: z.number().nullable(),
  cardtrader: z.array(ProductCardTraderDataSchema).optional(),
  is_presale: z.boolean().optional(),
  presale_release_date: z.iso.date().optional(),
  presale_note: z.string().optional(),
  colors: z.array(z.string()).optional(),
  color_identity: z.array(z.string()).optional(),
  mana_value: z.number().optional(),
  finishes: z.array(z.string()).optional(),
  is_full_art: z.boolean().optional(),
  is_promo: z.boolean().optional(),
  is_textless: z.boolean().optional(),
  border_color: z.string().optional(),
});

export type ProductCardTraderProperty = z.infer<typeof ProductCardTraderPropertySchema>;
export type ProductCardTraderData = z.infer<typeof ProductCardTraderDataSchema>;
export type Product = z.infer<typeof ProductSchema>;
