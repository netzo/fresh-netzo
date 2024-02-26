import { ulid } from "netzo/plugins/api/utils.ts";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { z } from "zod";
import { linkSchema, noteSchema } from "./mod.ts";

// schemas:

export const accountSchema = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  name: z.string(),
  image: z.string().url(),
  email: z.string().email(),
  phone: z.string(),
  links: linkSchema,
  notes: z.array(noteSchema),
});

// types:

export type Account = z.infer<typeof accountSchema>;

// data:

export const mock = (idField = "id") => ({
  [idField]: ulid() as string,
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  name: faker.company.name(),
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
  notes: Array.from(Array(5)).map(() => ({
    name: faker.lorem.paragraph(),
    content: faker.lorem.paragraph(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  })),
});
