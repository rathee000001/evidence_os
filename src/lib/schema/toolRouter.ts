import { z } from "zod";

export const ToolRouterSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

export type ToolRouter = z.infer<typeof ToolRouterSchema>;
