import { ulid } from "netzo/plugins/api/utils.ts";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { z } from "zod";
import { getLinks, linksSchema } from "./mod.ts";

// schemas:

export const accountSchema = z.object({
  id: z.string().ulid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  name: z.string(),
  description: z.string(),
  image: z.string().url(),
  email: z.string().email(),
  phone: z.string(),
  links: linksSchema,
});

// types:

export type Account = z.infer<typeof accountSchema>;

// defaults:

export const getAccount = (data?: Partial<Account>) => ({
  id: ulid(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  name: "",
  description: "",
  image: "",
  email: "",
  phone: "",
  links: getLinks(data?.links),
  ...data,
});

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
