import { config } from "https://deno.land/x/dotenv/mod.ts";
import { assertEquals, assertExists } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { Netzo } from '../../mod.ts'

const { API_KEY } = config()

const netzo = Netzo({ apiKey: API_KEY })

Deno.test('netzo', () => {
  assertExists(netzo)
  assertExists(netzo.services)
})

Deno.test('netzo.services(serviceOptions)', async () => {
  const service = netzo.services({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json'
    }
  })
  assertExists(service)

  const todo = await service.todos[1].get()
  assertEquals(todo?.id, 1)
})

// Deno.test('netzo.services[SERVICE_ID] - Select existing Service by ID', async () => {
  // // instantiate service
  // // TODO: const promise = netzo.services[SERVICE_ID]
  // const service = netzo.services({
  //   baseURL: 'https://jsonplaceholder.typicode.com',
  //   headers: {
  //     'accept': 'application/json',
  //     'content-type': 'application/json'
  //   }
  // })
//   // use service instance
//   const [
//     findResult,
//     getResult,
//     postResult,
//     putResult,
//     patchResult,
//     deleteResult
//   ] = await Promise.all([
//     service.todos.get(),
//     service.todos[1].get(),
//     service.todos.post({ userId: 1, title: "lorem ipsum", completed: true }),
//     service.todos[1].put({ userId: 1, id: 1, title: "lorem ipsum", completed: true }),
//     service.todos[1].patch({ completed: true }),
//     service.todos[1].delete()
//   ])
//   assertEquals(findResult?.length, 200)
//   assertEquals(getResult?.id, 1)
//   assertExists(postResult)
//   assertExists(putResult)
//   assertExists(patchResult)
//   assertExists(deleteResult)
// })

// Deno.test('netzo.services(serviceOptions) - Create new custom Service', async () => {
//   // instantiate service
//   const service = netzo.services({
//     baseURL: 'https://jsonplaceholder.typicode.com',
//     headers: {
//       'accept': 'application/json',
//       'content-type': 'application/json'
//     }
//   })
//   // use service instance
//   const [
//     findResult,
//     getResult,
//     postResult,
//     putResult,
//     patchResult,
//     deleteResult
//   ] = await Promise.all([
//     service.todos.get(),
//     service.todos[1].get(),
//     service.todos.post({ userId: 1, title: "lorem ipsum", completed: true }),
//     service.todos[1].put({ userId: 1, id: 1, title: "lorem ipsum", completed: true }),
//     service.todos[1].patch({ completed: true }),
//     service.todos[1].delete()
//   ])
//   assertEquals(findResult?.length, 200)
//   assertEquals(getResult?.id, 1)
//   assertExists(postResult)
//   assertExists(putResult)
//   assertExists(patchResult)
//   assertExists(deleteResult)
// })