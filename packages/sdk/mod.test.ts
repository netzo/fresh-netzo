import { config } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts'
import { get } from 'https://deno.land/x/lodash_es@v0.0.2/mod.ts'
import {
  assertEquals,
  assertExists,
} from 'https://deno.land/std@0.97.0/testing/asserts.ts'
import { createClientHttp, Netzo } from './mod.ts'
import { IResource } from './resource/types.ts'

const { NETZO_API_KEY } = config()

const RESOURCE: IResource['base'] = {
  'baseURL': 'https://jsonplaceholder.typicode.com',
  'authorization': {
    'type': 'none',
  },
}

Deno.test('netzo', () => {
  const netzo = Netzo(NETZO_API_KEY)

  assertExists(netzo)
  assertExists(netzo.api)
  assertExists(netzo.getApiKey)
  assertExists(netzo.getResource)
})

Deno.test('createClientHttp', async (t) => {
  const client = createClientHttp(RESOURCE)

  await t.step('client', () => {
    assertExists(client)
  })

  await t.step('client.todos.get()', async () => {
    const todos = await client.todos.get()
    assertEquals(todos?.length, 200)
  })

  await t.step('client.todos.get({ userId: 1 })', async () => {
    const todosQuery = await client.todos.get({ userId: 1 })
    assertEquals(todosQuery?.length, 20)
  })

  await t.step('client.todos[1].get()', async () => {
    const todo = await client.todos[1].get()
    assertEquals(todo?.id, 1)
  })

  await t.step('client.todos[1].get({ userId: 1 })', async () => {
    const todoQuery = await client.todos[1].get({ userId: 1 })
    assertEquals(todoQuery?.id, 1)
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

  await t.step('lodash.get(client, \'todos\').get()', async () => {
    const endpoint = get(client, 'todos')
    const todo = await endpoint.get()
    assertExists(todo)
  })

  await t.step('lodash.get(client, \'todos.get\')()', async () => {
    const endpointFn = get(client, 'todos.get')
    const todo = await endpointFn()
    assertExists(todo)
  })
})
