import { z } from "zod";

export const SkillItemSchema = z.object({
  skillId: z.string().min(1),
  name: z.string().min(1),
  group: z.string().min(1),
  aliases: z.array(z.string()),
  evidenceRequired: z.boolean()
});

export const SkillRegistrySchema = z.array(SkillItemSchema);
