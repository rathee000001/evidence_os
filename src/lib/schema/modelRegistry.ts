import { z } from "zod";

export const ModelRegistrySchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

export type ModelRegistry = z.infer<typeof ModelRegistrySchema>;
