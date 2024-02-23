import { ulid } from "netzo/plugins/api/utils.ts";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { z } from "zod";

// schemas:

export const contactSchema = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  name: z.string(),
  tags: z.array(z.string()),
  image: z.string().url(),
  emails: z.object({
    work: z.string().email(),
    personal: z.string().email(),
  }),
  phones: z.object({
    work: z.string(),
    mobile: z.string(),
    personal: z.string(),
  }),
  links: z.object({
    website: z.string().url(),
    facebook: z.string().url(),
    linkedin: z.string().url(),
    twitter: z.string().url(),
    other: z.string().url(),
  }),
  notes: z.array(z.object({
    name: z.string(),
    tags: z.array(z.string()),
    content: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })),
  position: z.string(),
  department: z.string(),
  accountId: z.string(),
});

// types:

export type Contact = z.infer<typeof contactSchema>;

// data:

export const mock = (idField = "id") => ({
  [idField]: ulid() as string,
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  name: faker.person.fullName(),
  tags: Array.from(Array(3)).map(() => faker.lorem.word()),
  image: faker.image.avatarGitHub(),
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
    name: faker.lorem.paragraph(),
    tags: Array.from(Array(2)).map(() => faker.lorem.word()),
    content: faker.lorem.paragraph(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  })),
  position: faker.person.jobTitle(),
  department: faker.person.jobArea(),
  accountId: ulid() as string,
});
