import { z } from 'zod';
import { ProductSkuSchema } from './ProductSkuSchema';

export const ProductSkuListSchema = z.object({
  set_id: z.number(),
  updated: z.iso.datetime({ offset: true }),
  sku_count: z.number().optional(),
  product_count: z.number().optional(),
  products: z.record(z.number(), z.record(z.number(), ProductSkuSchema)).optional(),
});

export type ProductSkuList = z.infer<typeof ProductSkuListSchema>;
