import { z } from 'zod';

export const ScanResultSchema = z.object({
  success: z.boolean(),
  game_id: z.number(),
  set_ids: z.array(z.number()),
  cropped_image: z.string(),
  results: z.array(z.object({ product_id: z.number(), score: z.number() })),
  candidates_scanned: z.number(),
});

export type ScanResult = z.infer<typeof ScanResultSchema>;
