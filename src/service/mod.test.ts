import { config } from "https://deno.land/x/dotenv/mod.ts";
import { assertEquals, assertExists } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { Netzo } from '../../mod.ts'

const { API_KEY } = config()

const netzo = Netzo({ apiKey: API_KEY })

const SERVICE_ID_JSONPLACEHOLDER = "63358aa658e6b95844732847"

const service = await netzo.service(SERVICE_ID_JSONPLACEHOLDER)

Deno.test("service", () => {
  assertExists(service)
  assertExists(service.client)
  assertExists(service.requests)
  assertExists(service.item)
  assertEquals(service.item._id, SERVICE_ID_JSONPLACEHOLDER)
})

Deno.test("service.client.todos.get()", async () => {
  const todos = await service.client.todos.get()
  assertEquals(todos?.length, 200)
})

Deno.test("service.client.todos[1].get()", async () => {
  const todo = await service.client.todos[1].get()
  assertEquals(todo?.id, 1)
})

// Deno.test("service.client.todos.post()", async () => {
//   const todo = await service.client.todos.post({ userId: 1, title: "lorem ipsum", completed: true })
//   assertExists(todo)
// })

// Deno.test("service.client.todos[1].put()", async () => {
//   const todo = await service.client.todos[1].put({ userId: 1, id: 1, title: "lorem ipsum", completed: true })
//   assertExists(todo)
// })

// Deno.test("service.client.todos[1].patch()", async () => {
//   const todo = await service.client.todos[1].patch({ completed: true })
//   assertExists(todo)
// })

// Deno.test("service.client.todos[1].delete()", async () => {
//   const todo = await service.client.todos[1].delete()
//   assertExists(todo)
// })

Deno.test("service.requests.getAllTodos.invoke()", async () => {
  const todos = await service.requests.getAllTodos.invoke()
  assertEquals(todos?.length, 200)
})

Deno.test("service.requests.getFirstTodo.invoke()", async () => {
  const todo = await service.requests.getFirstTodo.invoke()
  assertEquals(todo?.id, 1)
})