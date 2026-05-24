import { z } from "zod";

export const SourceConnectorSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

export type SourceConnector = z.infer<typeof SourceConnectorSchema>;
