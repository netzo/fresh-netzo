import { z } from "../deps.ts";

export const userSchema = z.object({
  data: z.object({
    id: z.string(),
    username: z.string(),
    name: z.string(),
    url: z.string(),
    imageUrl: z.string(),
  }),
}).deepPartial();

export const publicationsSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      url: z.string(),
      imageUrl: z.string(),
    }),
  ),
}).deepPartial();

export const postSchema = z.object({
  data: z.object({
    id: z.string(),
    title: z.string(),
    authorId: z.string(),
    tags: z.array(z.string()),
    url: z.string(),
    canonicalUrl: z.string(),
    publishStatus: z.string(),
    publishedAt: z.number(),
    license: z.string(),
    licenseUrl: z.string(),
  }),
}).deepPartial();

export const dataAddPostSchema = z.object({
  title: z.string(),
  contentFormat: z.union([z.literal("html"), z.literal("markdown")]),
  content: z.string(),
  tags: z.array(z.string()).optional(),
  canonicalUrl: z.string().optional(),
  publishStatus: z
    .union([z.literal("public"), z.literal("draft"), z.literal("unlisted")])
    .optional(),
  license: z
    .union([
      z.literal("all-rights-reserved"),
      z.literal("cc-40-by"),
      z.literal("cc-40-by-sa"),
      z.literal("cc-40-by-nd"),
      z.literal("cc-40-by-nc"),
      z.literal("cc-40-by-nc-nd"),
      z.literal("cc-40-by-nc-sa"),
      z.literal("cc-40-zero"),
      z.literal("public-domain"),
    ])
    .optional(),
  notifyFollowers: z.boolean().optional(),
});

//types:

export type User = z.infer<typeof userSchema>;
export type Publications = z.infer<typeof publicationsSchema>;
export type Post = z.infer<typeof postSchema>;
export type DataAddPost = z.infer<typeof dataAddPostSchema>;
