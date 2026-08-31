import { z } from 'zod';
import { CategorySchema } from './CategorySchema';

export const CategoryListSchema = z.object({
  categories: z.array(CategorySchema),
});

export type CategoryList = z.infer<typeof CategoryListSchema>;
