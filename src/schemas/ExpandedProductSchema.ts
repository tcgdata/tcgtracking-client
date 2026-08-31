import { z } from 'zod';
import {
  SKU_CONDITION,
  SKU_CONDITION_ABBREVIATION,
  SKU_CONDITION_ID,
  SKU_LANGUAGE,
  SKU_LANGUAGE_ID,
  SKU_VARIANT,
  SKU_VARIANT_ID,
} from '../constants';
import { LooseIsoDateTime } from '../validators';

export const ExpandedProductTCGPlayerPriceSchema = z.object({
  product_id: z.number(),
  sub_type_name: z.union([z.string(), z.enum(SKU_VARIANT)]),
  low_price: z.string(),
  mid_price: z.string(),
  high_price: z.string(),
  market_price: z.string(),
  direct_low_price: z.string().nullable(),
  updated_at: LooseIsoDateTime,
});

export const ExpandedProductSkuSchema = z.object({
  sku_id: z.number(),
  product_id: z.number(),
  condition_name: z.union([z.string(), z.enum(SKU_CONDITION)]),
  variant_name: z.union([z.string(), z.enum(SKU_VARIANT)]),
  language_name: z.union([z.string(), z.enum(SKU_LANGUAGE)]),
  condition_id: z.union([z.number(), z.enum(SKU_CONDITION_ID)]),
  variant_id: z.union([z.number(), z.enum(SKU_VARIANT_ID)]),
  language_id: z.union([z.number(), z.enum(SKU_LANGUAGE_ID)]),
  market_price: z.string().nullable(),
  lowest_price: z.string().nullable(),
  highest_price: z.string().nullable(),
  price_count: z.number().nullable(),
  price_updated_at: LooseIsoDateTime.nullable(),
  sku_checked_at: LooseIsoDateTime,
  created_at: LooseIsoDateTime,
  updated_at: LooseIsoDateTime,
});

export const ExpandedProductProductSchema = z.object({
  product_id: z.number(),
  category_id: z.number(),
  group_id: z.number(),
  name: z.string(),
  clean_name: z.string(),
  search_blob: z.string(),
  image_url: z.url(),
  url: z.url(),
  modified_on: LooseIsoDateTime,
  image_count: z.number(),
  is_presale: z.number(),
  presale_release_on: z.iso.date().nullable(),
  presale_note: z.null(),
  ext_number: z.string(),
  ext_rarity: z.string(),
  sealed_packaging: z.null(),
  ext_data: z.record(z.string(), z.string()),
  market_price: z.string(),
  manapool_low: z.string().nullable(),
  manapool_qty: z.number().nullable(),
  scryfall_id: z.string().nullable(),
  mtgjson_uuid: z.string().nullable(),
  cardmarket_id: z.number().nullable(),
  cardtrader_id: z.number().nullable(),
  cardtrader_expansion_id: z.number().nullable(),
  cardtrader_synced_at: LooseIsoDateTime.nullable(),
  mtg_colors: z.string().nullable(),
  mtg_color_identity: z.string().nullable(),
  mtg_mana_value: z.string().nullable(),
  mtg_finishes: z.string().nullable(),
  mtg_is_full_art: z.null(),
  mtg_is_promo: z.null(),
  mtg_is_textless: z.null(),
  mtg_frame_effects: z.string().nullable(),
  mtg_promo_types: z.string().nullable(),
  mtg_border_color: z.string().nullable(),
  mtg_keywords: z.null(),
  mtgjson_synced_at: LooseIsoDateTime.nullable(),
  mtg_primary_color: z.string().nullable(),
  created_at: LooseIsoDateTime,
  updated_at: LooseIsoDateTime,
  set_name: z.string(),
  set_abbr: z.string(),
  set_released: z.iso.date(),
  set_modified: LooseIsoDateTime,
  category_name: z.string(),
  category_display_name: z.string(),
});

export const ExpandedProductSchema = z.object({
  success: z.boolean(),
  product_id: z.number(),
  product: ExpandedProductProductSchema,
  prices: z.object({
    tcgplayer: z.array(ExpandedProductTCGPlayerPriceSchema),
    manapool: z
      .object({
        product_id: z.number(),
        manapool_id: z.null(),
        nf_low: z.string(),
        nf_nm: z.string(),
        nf_lp: z.string(),
        fo_low: z.string(),
        fo_nm: z.string(),
        fo_lp: z.string(),
        ef_low: z.null(),
        ef_nm: z.null(),
        low_price: z.string(),
        total_qty: z.number(),
        manapool_url: z.url(),
        updated_at: LooseIsoDateTime,
      })
      .nullable(),
    manapool_variants: z.array(
      z.object({
        id: z.number(),
        manapool_id: z.string(),
        product_type: z.string(),
        product_id: z.number(),
        scryfall_id: z.string(),
        manapool_name: z.string().nullable(),
        manapool_set_code: z.string().nullable(),
        manapool_number: z.string().nullable(),
        sku_id: z.number(),
        condition_id: z.union([z.string(), z.enum(SKU_CONDITION_ABBREVIATION)]),
        finish_id: z.string(),
        language_id: z.string(),
        low_price: z.string(),
        available_qty: z.number(),
        manapool_url: z.url(),
        last_seen_at: LooseIsoDateTime,
        updated_at: LooseIsoDateTime,
      })
    ),
  }),
  skus: z.array(ExpandedProductSkuSchema),
  sku_count: z.number(),
  sku_dimensions: z.object({
    variants: z.array(
      z.object({
        id: z.union([z.number(), z.enum(SKU_VARIANT_ID)]),
        name: z.union([z.string(), z.enum(SKU_VARIANT)]),
      })
    ),
    conditions: z.array(
      z.object({
        id: z.union([z.number(), z.enum(SKU_CONDITION_ID)]),
        name: z.union([z.string(), z.enum(SKU_CONDITION)]),
      })
    ),
    languages: z.array(
      z.object({
        id: z.union([z.number(), z.enum(SKU_LANGUAGE_ID)]),
        name: z.union([z.string(), z.enum(SKU_LANGUAGE)]),
      })
    ),
  }),
  sku_sync_status: z.object({
    product_id: z.number(),
    sku_count: z.number(),
    last_synced_at: LooseIsoDateTime,
    last_changed_at: LooseIsoDateTime.nullable(),
    sync_error: z.unknown(),
  }),
  cardtrader: z.object({
    product_map: z.array(
      z.object({
        product_id: z.number(),
        category_id: z.number(),
        blueprint_id: z.number(),
        variant_foil: z.string(),
        variant_language: z.string(),
        variant_finish: z.string().nullable(),
        match_type: z.string(),
        match_confidence: z.number(),
        created_at: LooseIsoDateTime,
        updated_at: LooseIsoDateTime,
      })
    ),
    blueprints: z.array(
      z.object({
        product_id: z.number(),
        blueprint_id: z.number(),
        match_type: z.string(),
        match_confidence: z.number(),
        name: z.string(),
        version: z.string().nullable(),
        ct_game_id: z.number(),
        ct_category_id: z.number(),
        ct_expansion_id: z.number(),
        rarity: z.string(),
        collector_number: z.string(),
        fixed_properties: z.string(),
        has_foil: z.number(),
        has_nonfoil: z.number(),
        has_etched: z.number(),
        languages: z.array(z.string()),
        editable_properties: z.array(
          z.object({
            name: z.string(),
            type: z.string(),
            default_value: z.string(),
            possible_values: z.array(z.union([z.string(), z.boolean()])),
          })
        ),
        scryfall_id: z.string(),
        tcg_player_id: z.number(),
        card_market_id: z.array(z.number()).optional(),
        image_url: z.url(),
        content_hash: z.string(),
        created_at: LooseIsoDateTime,
        updated_at: LooseIsoDateTime,
        expansion_name: z.string(),
        expansion_code: z.string(),
        cardtrader_group_id: z.number(),
        cardtrader_category_name: z.string(),
        cardtrader_product_type: z.string(),
        card_market_ids: z.array(z.number()).optional(),
      })
    ),
    sku_mappings: z.array(
      z.object({
        sku_id: z.number(),
        blueprint_id: z.number(),
        ct_condition: z.string(),
        ct_language: z.string(),
        ct_foil: z.number(),
        tcg_condition_id: z.union([z.number(), z.enum(SKU_CONDITION_ID)]),
        tcg_variant_id: z.union([z.number(), z.enum(SKU_VARIANT_ID)]),
        tcg_language_id: z.union([z.number(), z.enum(SKU_LANGUAGE_ID)]),
        created_at: LooseIsoDateTime,
        updated_at: LooseIsoDateTime,
      })
    ),
  }),
});

export type ExpandedProductTCGPlayerPriceSchema = z.infer<
  typeof ExpandedProductTCGPlayerPriceSchema
>;
export type ExpandedProductSku = z.infer<typeof ExpandedProductSkuSchema>;
export type ExpandedProductProduct = z.infer<typeof ExpandedProductProductSchema>;
export type ExpandedProduct = z.infer<typeof ExpandedProductSchema>;
