import { z } from 'zod';
import { ProductPriceSchema } from './ProductPriceSchema';

export const ProductPriceListSchema = z.object({
  set_id: z.number(),
  updated: z.iso.datetime({ offset: true }),
  prices: z.record(z.number(), ProductPriceSchema),
});

export type ProductPriceList = z.infer<typeof ProductPriceListSchema>;
