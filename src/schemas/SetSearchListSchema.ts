import { z } from 'zod';
import { SetSchema } from './SetSchema';

export const SetSearchListSchema = z.object({
  query: z.string(),
  category_id: z.number(),
  count: z.number(),
  sets: z.array(SetSchema),
});

export type SetSearchList = z.infer<typeof SetSearchListSchema>;
