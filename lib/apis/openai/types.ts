import { z } from "netzo/deps/zod/mod.ts";

export const chatCompletionSchema = z.object({
  id: z.string(),
  object: z.string(),
  created: z.number(),
  model: z.string(),
  choices: z.array(
    z.object({
      index: z.number(),
      message: z.object({
        role: z.string(),
        content: z.string(),
      }),
      finish_reason: z.string(),
    }),
  ),
  usage: z.object({
    prompt_tokens: z.number(),
    completion_tokens: z.number(),
    total_tokens: z.number(),
  }),
}).deepPartial();

export const dataChatCompletionSchema = z.object({
  model: z.string(),
  messages: z.array(
    z.object({
      role: z.union([
        z.literal("system"),
        z.literal("user"),
        z.literal("assistant"),
        z.literal("function"),
      ]),
      content: z.string(),
      name: z.string().optional(),
      function_call: z.object({}).optional(),
    }),
  ),
  functions: z
    .array(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        parameters: z.object({}),
      }),
    )
    .optional(),
  function_call: z.string().optional(),
  temperature: z.number().optional(),
  top_p: z.number().optional(),
  n: z.number().optional(),
  stream: z.boolean().optional(),
  stop: z.string().optional(),
  max_tokens: z.number().optional(),
  presence_penalty: z.number().optional(),
  frequency_penalty: z.number().optional(),
  logit_bias: z.any().optional(),
  user: z.string().optional(),
});

//types:

export type ChatCompletion = z.infer<typeof chatCompletionSchema>;
export type DataChatCompletion = z.infer<typeof dataChatCompletionSchema>;
