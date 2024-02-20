import { z } from "zod";

const phoneRegex = /^(\+?1)?\s?\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/;

export const EmailSchema = {
  type: z.enum(["personal", "work", "other"]),
  name: z.string(),
  value: z.string().email(),
};

export const PhoneSchema = {
  type: z.enum(["mobile", "work", "whatsapp", "other"]),
  name: z.string(),
  value: z.string().regex(phoneRegex),
};

export const LinksSchema = {
  type: z.enum(["linkedin", "github", "twitter", "facebook", "other"]),
  name: z.string(),
  value: z.string().url(),
};

export const NoteSchema = {
  id: z.string(),
  content: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
};
