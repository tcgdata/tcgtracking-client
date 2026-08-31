import { z } from 'zod';
import { ProductSchema } from './ProductSchema';
import { PRODUCT_TYPE } from '../constants';

export const ProductListSchema = z.object({
  set_id: z.number(),
  set_name: z.string(),
  set_abbr: z.string().nullable(),
  set_released: z.iso.date().nullable(),
  product_count: z.number(),
  data_modified: z.iso.datetime({ offset: true }).optional(),
  file_generated: z.iso.datetime({ offset: true }),
  pricing_url: z.string(),
  cards_url: z.string(),
  sealed_url: z.string(),
  skus_url: z.string(),
  product_type: z.union([z.string(), z.enum(PRODUCT_TYPE)]).optional(),
  products: z.array(ProductSchema),
});

export type ProductList = z.infer<typeof ProductListSchema>;
