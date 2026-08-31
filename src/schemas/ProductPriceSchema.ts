import { z } from 'zod';
import { MANAPOOL_SKU_VARIANT, SKU_VARIANT } from '../constants';

export const ProductPriceSchema = z.object({
  tcg: z
    .preprocess(
      (value: unknown) => {
        if (value instanceof Array && value.length === 0) {
          // Convert to empty object for consistency.
          return {};
        }

        return value;
      },
      z.partialRecord(
        z.union([z.string(), z.enum(SKU_VARIANT)]),
        z.object({
          low: z.number(),
          market: z.number().optional(),
        })
      )
    )
    .optional(),
  manapool: z
    .partialRecord(z.union([z.string(), z.enum(MANAPOOL_SKU_VARIANT)]), z.number())
    .optional(),
  mp_qty: z.number().optional(),
});

export type ProductPrice = z.infer<typeof ProductPriceSchema>;
