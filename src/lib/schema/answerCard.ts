import { z } from "zod";

export const AnswerCardSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

export type AnswerCard = z.infer<typeof AnswerCardSchema>;
