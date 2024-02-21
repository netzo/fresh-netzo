import { ulid } from "netzo/plugins/api/utils.ts";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { z } from "zod";

const ROLES = ["admin", "edit", "view"] as const;

// schemas:

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  image: z.string().url(),
  roles: z.array(z.enum(ROLES)),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// types:

export type User = z.infer<typeof userSchema>;

// data:

export const mock = (idField = "id") => ({
  [idField]: ulid(),
  name: faker.person.fullName(),
  email: faker.internet.email().toLowerCase(),
  image: faker.image.avatarGitHub(),
  roles: [faker.helpers.arrayElement(ROLES)],
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
});

// i18n:

export const I18N = {
  "id": "Employee ID",
  "name": "Name",
  "email": "Email",
  "image": "Image",
  "roles": "Roles",
  "createdAt": "Created at",
  "updatedAt": "Updated at",
};
