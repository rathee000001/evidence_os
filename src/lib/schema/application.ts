import { z } from "zod";

export const ApplicationSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

export type Application = z.infer<typeof ApplicationSchema>;
