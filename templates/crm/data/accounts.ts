import { ulid } from "netzo/plugins/api/utils.ts";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { z } from "zod";
import { linksSchema } from "./mod.ts";

// schemas:

export const accountSchema = z.object({
  id: z.string().ulid().default(() => ulid()),
  createdAt: z.string().datetime().default(() => new Date().toISOString()),
  updatedAt: z.string().datetime().default(() => new Date().toISOString()),
  name: z.string().default(""),
  description: z.string().default(""),
  image: z.string().url().default(""),
  email: z.string().email().default(""),
  phone: z.string().default(""),
  links: linksSchema,
});

// types:

export type Account = z.infer<typeof accountSchema>;

// data:

export const mock = (idField = "id") => ({
  [idField]: ulid() as string,
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  name: faker.company.name(),
  description: faker.company.catchPhrase(),
  image: `https://avatar.vercel.sh/${ulid()}.png`, // faker.image.avatarGitHub(),
  email: faker.internet.email().toLowerCase(),
  phone: faker.phone.number(),
  links: {
    website: faker.internet.url(),
    facebook: faker.internet.url(),
    linkedin: faker.internet.url(),
    twitter: faker.internet.url(),
    other: faker.internet.url(),
  },
});
