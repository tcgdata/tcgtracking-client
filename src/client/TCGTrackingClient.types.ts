import { z } from 'zod';
import { Buffer } from 'node:buffer';

export type TCGTrackingClientProps = {
  baseUrl?: string;
  strict?: boolean;
  userAgent: string;
};

export const ScanPropsSchema = z.object({
  gameId: z.number(),
  setIds: z.array(z.number()).optional(),
  limit: z.union([z.literal(5), z.literal(10)]),
  image: z.instanceof(Buffer),
});

export type ScanProps = z.infer<typeof ScanPropsSchema>;
