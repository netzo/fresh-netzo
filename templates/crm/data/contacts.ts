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
