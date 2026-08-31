import { z } from 'zod';

export const MetaSchema = z.object({
  last_updated: z.iso.datetime({ offset: true }),
  pricing_updated: z.iso.datetime({ offset: true }),
  total_categories: z.number(),
  total_sets: z.number(),
  total_products: z.number(),
  version: z.string(),
  documentation: z.string(),
  file_types: z.object({
    static: z.string(),
    cards: z.string(),
    sealed: z.string(),
    pricing: z.string(),
    skus: z.string(),
  }),
  last_export_stats: z.object({
    sets_checked: z.number(),
    static_updated: z.number(),
    static_skipped: z.number(),
    pricing_updated: z.number(),
    skus_updated: z.number(),
    products_exported: z.number(),
  }),
});

export type Meta = z.infer<typeof MetaSchema>;
