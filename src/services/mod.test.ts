import { config } from "https://deno.land/x/dotenv/mod.ts";
import { assertEquals, assertExists } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { Netzo } from '../../mod.ts'

const { API_KEY } = config()

const netzo = Netzo({ apiKey: API_KEY })

const SERVICE_ID_JSONPLACEHOLDER = "63358aa658e6b95844732847"

Deno.test("service", async () => {
  const service = await netzo.services(SERVICE_ID_JSONPLACEHOLDER)
  assertExists(service)
})

Deno.test("service.save", async () => {
  const service = await netzo.services(SERVICE_ID_JSONPLACEHOLDER)
  assertExists(service.save)
})

Deno.test("service.todos", async () => {
  const service = await netzo.services(SERVICE_ID_JSONPLACEHOLDER)
  assertExists(service.todos)
})

Deno.test("service.todos.get()", async () => {
  const service = await netzo.services(SERVICE_ID_JSONPLACEHOLDER)
  const todos = await service.todos.get()
  assertEquals(todos?.length, 200)
})

Deno.test("service.todos[1].get()", async () => {
  const service = await netzo.services(SERVICE_ID_JSONPLACEHOLDER)
  const todo = await service.todos[1].get()
  assertEquals(todo?.id, 1)
})

Deno.test("service.todos.post()", async () => {
  const service = await netzo.services(SERVICE_ID_JSONPLACEHOLDER)
  const todo = await service.todos.post({ userId: 1, title: "lorem ipsum", completed: true })
  assertExists(todo)
})

Deno.test("service.todos[1].put()", async () => {
  const service = await netzo.services(SERVICE_ID_JSONPLACEHOLDER)
  const todo = await service.todos[1].put({ userId: 1, id: 1, title: "lorem ipsum", completed: true })
  assertExists(todo)
})

Deno.test("service.todos[1].patch()", async () => {
  const service = await netzo.services(SERVICE_ID_JSONPLACEHOLDER)
  const todo = await service.todos[1].patch({ completed: true })
  assertExists(todo)
})

Deno.test("service.todos[1].delete()", async () => {
  const service = await netzo.services(SERVICE_ID_JSONPLACEHOLDER)
  const todo = await service.todos[1].delete()
  assertExists(todo)
})