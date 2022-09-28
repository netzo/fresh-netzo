import { assertEquals, assertExists } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { http } from "./mod.ts";

Deno.test("http", async () => {
  const client = http({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json'
    }
  })
  assertExists(client)

  const [
    findResult,
    getResult,
    postResult,
    putResult,
    patchResult,
    deleteResult
  ] = await Promise.all([
    client.todos.get(),
    client.todos[1].get(),
    client.todos.post({ userId: 1, title: "lorem ipsum", completed: true }),
    client.todos[1].put({ userId: 1, id: 1, title: "lorem ipsum", completed: true }),
    client.todos[1].patch({ completed: true }),
    client.todos[1].delete()
  ])
  assertEquals(findResult?.length, 200)
  assertEquals(getResult?.id, 1)
  assertExists(postResult)
  assertExists(putResult)
  assertExists(patchResult)
  assertExists(deleteResult)
})