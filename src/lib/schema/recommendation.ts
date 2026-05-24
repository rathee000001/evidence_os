import { z } from "zod";

export const RecommendationSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

export type Recommendation = z.infer<typeof RecommendationSchema>;
