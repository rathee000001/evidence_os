import { z } from "zod";

export const ModelRouterSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

export type ModelRouter = z.infer<typeof ModelRouterSchema>;
