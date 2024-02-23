import { ulid } from "netzo/plugins/api/utils.ts";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { z } from "zod";

// schemas:

export const accountSchema = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  type: z.enum([
    "prospect",
    "customer",
    "supplier",
    "partner",
    "other",
  ]),
  name: z.string(),
  tags: z.array(z.string()),
  image: z.string().url(),
  email: z.string().email(),
  phone: z.string(),
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
});

// types:

export type Account = z.infer<typeof accountSchema>;

// data:

export const mock = (idField = "id") => ({
  [idField]: ulid() as string,
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  type: faker.helpers.arrayElement([
    "prospect",
    "customer",
    "supplier",
    "partner",
    "other",
  ]),
  name: faker.company.name(),
  tags: Array.from(Array(3)).map(() => faker.lorem.word()),
  image: faker.image.avatarGitHub(),
  email: faker.internet.email().toLowerCase(),
  phone: faker.phone.number(),
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
});
