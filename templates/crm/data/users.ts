import { ulid } from "netzo/plugins/api/utils.ts";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { z } from "zod";

// schemas:

export const userSchema = z.object({
  id: z.string().ulid().default(() => ulid()),
  createdAt: z.string().datetime().default(() => new Date().toISOString()),
  updatedAt: z.string().datetime().default(() => new Date().toISOString()),
  name: z.string().default(""),
  email: z.string().email().default(""),
  image: z.string().url().default(""),
});

// types:

export type User = z.infer<typeof userSchema>;

// data:

export const mock = (idField = "id") => ({
  [idField]: ulid() as string,
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  name: faker.person.fullName(),
  email: faker.internet.email().toLowerCase(),
  image: `https://avatar.vercel.sh/${ulid()}.png`, // faker.image.avatarGitHub(),
});
