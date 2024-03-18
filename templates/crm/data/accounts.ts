import { z } from "zod";
import { getLinks, linksSchema } from "./mod.ts";

// schemas:

export const accountSchema = z.object({
  id: z.string().ulid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  name: z.string(),
  description: z.string(),
  image: z.string().url(),
  email: z.string().email(),
  phone: z.string(),
  links: linksSchema,
});

// types:

export type Account = z.infer<typeof accountSchema>;

// defaults:

export const getAccount = (data?: Partial<Account>) => ({
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  name: "",
  description: "",
  image: "",
  email: "",
  phone: "",
  links: getLinks(data?.links),
  ...data,
});
