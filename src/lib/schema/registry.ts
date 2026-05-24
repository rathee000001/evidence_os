import { z } from "zod";

export const RegistrySchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

export type Registry = z.infer<typeof RegistrySchema>;
