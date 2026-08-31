import { z } from 'zod';
import {
  SKU_CONDITION_ABBREVIATION,
  SKU_LANGUAGE_ABBREVIATION,
  SKU_VARIANT,
  SKU_VARIANT_ABBREVIATION,
  SKU_VARIANT_ID,
} from '../constants';

export const ProductSkuSchema = z.object({
  /** Condition */
  cnd: z.union([z.string(), z.enum(SKU_CONDITION_ABBREVIATION)]),
  /** Variant */
  var: z.union([z.string(), z.enum(SKU_VARIANT)]),
  /** Variant abbreviation */
  var_a: z.union([z.string(), z.enum(SKU_VARIANT_ABBREVIATION)]),
  /** Variant ID */
  vid: z.union([z.number(), z.enum(SKU_VARIANT_ID)]),
  /** Language */
  lng: z.union([z.string(), z.enum(SKU_LANGUAGE_ABBREVIATION)]),
  /** Market price */
  mkt: z.number().optional(),
  /** Low price */
  low: z.number().optional(),
  /** High price */
  hi: z.number().optional(),
  /** Count */
  cnt: z.number().optional(),
  /** Manapool */
  mp: z.number().optional(),
});

export type ProductSku = z.infer<typeof ProductSkuSchema>;
