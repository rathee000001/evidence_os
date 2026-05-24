import { z } from "zod";

export const TemplateSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

export type Template = z.infer<typeof TemplateSchema>;
