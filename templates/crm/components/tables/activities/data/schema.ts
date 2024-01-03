import { z } from "netzo/deps/zod/mod.ts";

export const activitySchema = z.object({
  id: z.string(),
  status: z.union([
    z.literal("backlog"),
    z.literal("todo"),
    z.literal("in-progress"),
    z.literal("done"),
    z.literal("cancelled"),
  ]),
  contactId: z.string(),
  name: z.string(),
  description: z.string(),
  labels: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Contact = z.infer<typeof activitySchema>;
