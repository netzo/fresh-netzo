import { config } from "https://deno.land/x/dotenv/mod.ts";
import { assertEquals, assertExists } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { Netzo } from '../../../mod.ts'

const { API_KEY } = config()

const _netzo = Netzo({ apiKey: API_KEY })

const netzo = _netzo.services.netzo()

Deno.test('netzo', () => {
  assertExists(_netzo)
  assertExists(netzo.services.netzo)
  assertExists(netzo)
})

Deno.test('netzo.services', async () => {
  const { data: services } = await netzo.services.get()
  assertEquals(Array.isArray(services), true)

  if (services.length) {
    const service = await netzo.services[services[0]._id].get()
    assertEquals(service._id, services[0]._id)
  }
})

Deno.test('netzo.workers', async () => {
  const { data: workers } = await netzo.workers.get()
  assertEquals(Array.isArray(workers), true)

  if (workers.length) {
    const worker = await netzo.workers[workers[0]._id].get()
    assertEquals(worker._id, workers[0]._id)
  }
})

Deno.test('netzo.workflows', async () => {
  const { data: workflows } = await netzo.workflows.get()
  assertEquals(Array.isArray(workflows), true)

  if (workflows.length) {
    const workflow = await netzo.workflows[workflows[0]._id].get()
    assertEquals(workflow._id, workflows[0]._id)
  }
})