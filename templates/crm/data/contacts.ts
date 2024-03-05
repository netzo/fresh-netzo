import { ulid } from "netzo/plugins/api/utils.ts";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { z } from "zod";
import { linksSchema } from "./mod.ts";

// schemas:

export const contactSchema = z.object({
  id: z.string().ulid().default(() => ulid()),
  createdAt: z.string().datetime().default(() => new Date().toISOString()),
  updatedAt: z.string().datetime().default(() => new Date().toISOString()),
  name: z.string().default(""),
  description: z.string().default(""),
  image: z.string().url().default(""),
  position: z.string().default(""),
  department: z.string().default(""),
  accountId: z.string().default(""),
  emails: z.object({
    work: z.string().email().default(""),
    personal: z.string().email().default(""),
  }).default(() => ({})),
  phones: z.object({
    work: z.string().default(""),
    mobile: z.string().default(""),
    personal: z.string().default(""),
  }).default(() => ({})),
  links: linksSchema,
});

// types:

export type Contact = z.infer<typeof contactSchema>;

// data:

export const mock = (idField = "id") => ({
  [idField]: ulid() as string,
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  name: faker.person.fullName(),
  description: faker.lorem.sentences(),
  image: `https://avatar.vercel.sh/${ulid()}.png`, // faker.image.avatarGitHub(),
  position: faker.person.jobTitle(),
  department: faker.person.jobArea(),
  accountId: ulid() as string,
  emails: {
    work: faker.internet.email().toLowerCase(),
    personal: faker.internet.email().toLowerCase(),
  },
  phones: {
    work: faker.phone.number(),
    mobile: faker.phone.number(),
    personal: faker.phone.number(),
  },
  links: {
    website: faker.internet.url(),
    facebook: faker.internet.url(),
    linkedin: faker.internet.url(),
    twitter: faker.internet.url(),
    other: faker.internet.url(),
  },
});
