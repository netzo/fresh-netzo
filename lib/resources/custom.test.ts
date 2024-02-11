import "../deps/std/dotenv/load.ts";
// import { assertEquals, assertExists } from "../../deps/std/assert/mod.ts";
import { z } from "../deps/zod/mod.ts";
// import { CustomResource } from "./custom.ts";

const todoSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

type Todo = z.infer<typeof todoSchema>;

// Deno.test("[api/adapters] CustomResource", async (t) => {
//   const $todos = CustomResource({
//     idField: "id",
//   });
// });
