import { ulid } from "netzo/plugins/api/utils.ts";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { z } from "zod";

// schemas:

export const eventSchema = z.object({
  id: z.string().ulid().default(() => ulid()),
  createdAt: z.string().datetime().default(() => new Date().toISOString()),
  updatedAt: z.string().datetime().default(() => new Date().toISOString()),
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
  ]).default("other"),
  name: z.string().default(""),
  content: z.string().default(""),
  accountIds: z.array(z.string()).default([]),
  contactIds: z.array(z.string()).default([]),
  dealIds: z.array(z.string()).default([]),
  userIds: z.array(z.string()).default([]),
});

// types:

export type Event = z.infer<typeof eventSchema>;

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
  userIds: Array.from(Array(2)).map(() => ulid()),
});
