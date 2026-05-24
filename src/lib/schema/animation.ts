import { z } from "zod";

export const AnimationSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

export type Animation = z.infer<typeof AnimationSchema>;
