import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  display_name: z.string(),
  product_count: z.number(),
  set_count: z.number(),
  api_url: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;
