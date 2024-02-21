import { ulid } from "netzo/plugins/api/utils.ts";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { z } from "zod";

// schemas:

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string().url(),
  department: z.string(),
  category: z.string(),
  material: z.string(),
  isbn: z.string(),
  price: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// types:

export type Product = z.infer<typeof productSchema>;

// data:

export const mock = (idField = "id") => ({
  [idField]: ulid() as string,
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  image: faker.image.avatarGitHub(),
  department: faker.commerce.department(),
  category: faker.commerce.product(),
  material: faker.commerce.productMaterial(),
  isbn: faker.commerce.isbn(13),
  price: faker.commerce.price(),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
});

// i18n:

export const I18N = {
  id: "Product ID",
  name: "Full Name",
  description: "Description",
  image: "Image",
  department: "Department",
  category: "Category",
  material: "Material",
  isbn: "ISBN",
  price: "Price",
  createdAt: "Created At",
  updatedAt: "Updated At",
};
