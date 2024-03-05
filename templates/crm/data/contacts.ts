import { ulid } from "netzo/plugins/api/utils.ts";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { z } from "zod";
import { getLinks, linksSchema } from "./mod.ts";

// schemas:

export const contactSchema = z.object({
  id: z.string().ulid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  name: z.string(),
  description: z.string(),
  image: z.string().url(),
  position: z.string(),
  department: z.string(),
  accountId: z.string(),
  emails: z.object({
    work: z.string().email(),
    personal: z.string().email(),
  }),
  phones: z.object({
    work: z.string(),
    mobile: z.string(),
    personal: z.string(),
  }),
  links: linksSchema,
});

// types:

export type Contact = z.infer<typeof contactSchema>;

// defaults:

export const getContact = (data?: Partial<Contact>) => ({
  id: ulid(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  name: "",
  description: "",
  image: "",
  position: "",
  department: "",
  accountId: "",
  emails: {
    work: "",
    personal: "",
  },
  phones: {
    work: "",
    mobile: "",
    personal: "",
  },
  links: getLinks(data?.links),
  ...data,
});

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
