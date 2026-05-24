import { z } from "zod";

export const ResearchSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

export type Research = z.infer<typeof ResearchSchema>;
