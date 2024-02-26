import { ulid } from "netzo/plugins/api/utils.ts";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { z } from "zod";
import { linkSchema, noteSchema } from "./mod.ts";

// schemas:

export const contactSchema = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  name: z.string(),
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
  links: linkSchema,
  notes: z.array(noteSchema),
});

// types:

export type Contact = z.infer<typeof contactSchema>;

// data:

export const mock = (idField = "id") => ({
  [idField]: ulid() as string,
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  name: faker.person.fullName(),
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
  notes: Array.from(Array(5)).map(() => ({
    name: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  })),
});
