import { z } from 'zod';
import { LooseIsoDateTime } from '../validators';
import { SET_TYPE } from '../constants';

export const SetSchema = z.object({
  id: z.number(),
  name: z.string(),
  abbreviation: z.string().nullable(),
  type: z.union([z.string(), z.enum(SET_TYPE)]).nullable(),
  is_supplemental: z.boolean(),
  published_on: z.iso.date().nullable(),
  modified_on: LooseIsoDateTime,
  product_count: z.number(),
  sku_count: z.number(),
  products_modified: z.iso.datetime({ offset: true }).nullable(),
  pricing_modified: z.iso.datetime({ offset: true }).nullable(),
  skus_modified: z.iso.datetime({ offset: true }).nullable(),
  set_symbol_url: z.url().nullable(),
  set_symbol_cached: z.boolean(),
  api_url: z.string(),
  cards_url: z.string(),
  sealed_url: z.string(),
  pricing_url: z.string(),
  skus_url: z.string(),
});

export type Set = z.infer<typeof SetSchema>;
