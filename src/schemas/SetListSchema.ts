import { z } from 'zod';
import { SetSchema } from './SetSchema';

export const SetListSchema = z.object({
  category_id: z.number(),
  category_name: z.string(),
  generated_at: z.iso.datetime({ offset: true }),
  sets: z.array(SetSchema),
});

export type SetList = z.infer<typeof SetListSchema>;
