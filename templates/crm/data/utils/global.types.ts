import { z } from "zod";

const phoneRegex = /^(\+?1)?\s?\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/;

export const emailSchema = z.object({
  type: z.enum(["personal", "work", "other"]),
  name: z.string(),
  value: z.string().email(),
});

export const phoneSchema = z.object({
  type: z.enum(["mobile", "work", "whatsapp", "other"]),
  name: z.string(),
  value: z.string().regex(phoneRegex),
});

export const linkSchema = z.object({
  type: z.enum(["linkedin", "github", "twitter", "facebook", "other"]),
  name: z.string(),
  value: z.string().url(),
});

export const noteSchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
