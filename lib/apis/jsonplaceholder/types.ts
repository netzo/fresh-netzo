import { z } from "../deps.ts";

export const todoSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean()
}).deepPartial()

export const queryAddTodoSchema = todoSchema.omit({ id: true })

//types:

export type Todo = z.infer<typeof todoSchema>
export type QueryAddTodo = z.infer<typeof queryAddTodoSchema>