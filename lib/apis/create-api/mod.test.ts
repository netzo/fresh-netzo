// TODO: implement tests from https://github.com/johannschopplich/uncreate/blob/main/test/index.test.ts
import {
  assertEquals,
  assertExists,
} from 'https://deno.land/std@0.97.0/testing/asserts.ts'
import { createApi } from './mod.ts'

Deno.test('createApi', async (t) => {
  const client = createApi({
    baseURL: 'https://jsonplaceholder.typicode.com',
  })

  await t.step('createApi', () => {
    assertExists(createApi)
  })

  await t.step('client', () => {
    assertExists(client)
  })

  await t.step('client.todos', () => {
    assertExists(client.todos)
  })

  await t.step('client.todos.get()', async () => {
    const todos = await client.todos.get()
    assertEquals(todos?.length, 200)
  })

  await t.step('client.todos[1].get()', async () => {
    const todo = await client.todos[1].get()
    assertEquals(todo?.id, 1)
  })

  await t.step('client.todos.post()', async () => {
    const todo = await client.todos.post({
      userId: 1,
      title: 'lorem ipsum',
      completed: true,
    })
    assertExists(todo)
  })

  await t.step('client.todos[1].put()', async () => {
    const todo = await client.todos[1].put({
      userId: 1,
      id: 1,
      title: 'lorem ipsum',
      completed: true,
    })
    assertExists(todo)
  })

  await t.step('client.todos[1].patch()', async () => {
    const todo = await client.todos[1].patch({ completed: true })
    assertExists(todo)
  })

  await t.step('client.todos[1].delete()', async () => {
    const todo = await client.todos[1].delete()
    assertExists(todo)
  })
})
