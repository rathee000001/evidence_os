import { z } from "zod";

export const ChatbotSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

export type Chatbot = z.infer<typeof ChatbotSchema>;
