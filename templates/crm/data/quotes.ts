import { ulid } from "netzo/plugins/api/utils.ts";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { z } from "zod";

// schemas:

export const quoteSchema = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  status: z.enum([
    "pending",
    "paid",
    "lost",
  ]),
  items: z.array(z.object({
    name: z.string(),
    description: z.string(),
    image: z.string().url(),
    isbn: z.string(),
    price: z.string(),
  })), // item could eventually come from external system (e.g. WMS/PIM/ERP)
  xml: z.string(),
  pdf: z.string().url(),
});

// types:

export type Quote = z.infer<typeof quoteSchema>;

// data:

export const mock = (idField = "id") => ({
  [idField]: ulid() as string,
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  status: faker.helpers.arrayElement(["pending", "paid", "lost"]),
  items: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    image: faker.image.avatarGitHub(),
    isbn: faker.commerce.isbn(13),
    price: faker.commerce.price(),
  })),
  xml: faker.lorem.paragraph(),
  pdf: faker.internet.url(),
});
