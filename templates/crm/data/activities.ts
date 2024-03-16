import { ulid } from "netzo/plugins/api/utils.ts";
import { z } from "zod";

// schemas:

export const activitySchema = z.object({
  id: z.string().ulid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  type: z.enum([
    "email",
    "call",
    "videocall",
    "meeting",
    "whatsapp",
    "livechat",
    "facebook",
    "instagram",
    "linkedin",
    "twitter",
    "other",
  ]),
  name: z.string(),
  notes: z.string(),
  accountIds: z.array(z.string()),
  contactIds: z.array(z.string()),
  dealIds: z.array(z.string()),
});

// types:

export type Activity = z.infer<typeof activitySchema>;

// defaults:

export const getActivity = (data?: Partial<Activity>) => ({
  id: ulid(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  type: "other",
  name: "",
  notes: "",
  accountIds: [],
  contactIds: [],
  dealIds: [],
  ...data,
});
