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

Deno.test("service.client.todos.get({ userId: 1 })", async () => {
  const todosQuery = await service.client.todos.get({ userId: 1 })
  assertEquals(todosQuery?.length, 20)
})

Deno.test("service.client.todos[1].get()", async () => {
  const todo = await service.client.todos[1].get()
  assertEquals(todo?.id, 1)
})

Deno.test("service.client.todos[1].get({ userId: 1 })", async () => {
  const todoQuery = await service.client.todos[1].get({ userId: 1 })
  assertEquals(todoQuery?.id, 1)
})

Deno.test("service.client.todos.post()", async () => {
  const todo = await service.client.todos.post({ userId: 1, title: "lorem ipsum", completed: true })
  assertExists(todo)
})

Deno.test("service.client.todos[1].put()", async () => {
  const todo = await service.client.todos[1].put({ userId: 1, id: 1, title: "lorem ipsum", completed: true })
  assertExists(todo)
})

Deno.test("service.client.todos[1].patch()", async () => {
  const todo = await service.client.todos[1].patch({ completed: true })
  assertExists(todo)
})

Deno.test("service.client.todos[1].delete()", async () => {
  const todo = await service.client.todos[1].delete()
  assertExists(todo)
})

// FIXME: test returning result of client.todos[0].get()
// Deno.test("service.requests[0].invoke()", async () => {
//   const todos = await service.requests[0].invoke()
//   console.log(todos)
//   assertEquals(todos?.length, 200)
// })

// FIXME: test returning result of client.todos[0].get()
// Deno.test("service.requests.getAllTodos()", async () => {
//   const todos = await service.requests.getAllTodos()
//   console.log(todos)
//   assertEquals(todos?.length, 200)
// })

Deno.test("service.requests[1].invoke()", async () => {
  const todo = await service.requests[1].invoke()
  assertEquals(todo?.id, 1)
})

Deno.test("service.requests.getFirstTodo()", async () => {
  const todo = await service.requests.getFirstTodo()
  assertEquals(todo?.id, 1)
})