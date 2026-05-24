import { z } from "zod";

export const SourceConfidenceSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

export type SourceConfidence = z.infer<typeof SourceConfidenceSchema>;
