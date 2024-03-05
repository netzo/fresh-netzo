import { ulid } from "netzo/plugins/api/utils.ts";
import { faker } from "npm:@faker-js/faker@8.4.0";
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
  content: z.string(),
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
  content: "",
  accountIds: [],
  contactIds: [],
  dealIds: [],
  ...data,
});

// data:

export const mock = (idField = "id") => ({
  [idField]: ulid() as string,
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  type: faker.helpers.arrayElement([
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
  name: faker.lorem.words(),
  content: faker.lorem.paragraph(),
  accountIds: Array.from(Array(2)).map(() => ulid()),
  contactIds: Array.from(Array(2)).map(() => ulid()),
  dealIds: Array.from(Array(2)).map(() => ulid()),
});
