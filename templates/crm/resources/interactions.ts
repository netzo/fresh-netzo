import { z } from "zod";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { defineApiEndpoint } from "netzo/plugins/api/plugin.ts";
import { DenoKvResource } from "netzo/plugins/api/resources/mod.ts";
import { authenticate, log } from "netzo/plugins/api/hooks/mod.ts";
import { ulid } from "netzo/plugins/api/utils.ts";

export const interactions = defineApiEndpoint({
  name: "interactions",
  idField: "id",
  resource: DenoKvResource({ prefix: ["interactions"] }),
  hooks: {
    all: [authenticate(), log()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
});

// schemas:

export const interactionSchema = z.object({
  id: z.string(),
  type: z.string(), // "call", "email", "meeting", "whatsapp-msg", "livechat-msg", facebook-msg", "instagram-msg", "linkedin-msg", "twitter-msg", "other"
  data: z.any(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// types:

export type Interaction = z.infer<typeof interactionSchema>;

// data:

export const mock = (idField = "id") => ({
  [idField]: ulid(),
  type: faker.helpers.arrayElement([
    "call",
    "email",
    "meeting",
    "whatsapp-msg",
    "livechat-msg",
    "facebook-msg",
    "instagram-msg",
    "linkedin-msg",
    "twitter-msg",
    "other",
  ]),
  data: faker.lorem.paragraph(),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
});

// i18n:

export const I18N = {
  id: "Interaction ID",
  type: "Type",
  data: "Data",
  createdAt: "Created At",
  updatedAt: "Updated At",
};
