import { assertEquals } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import {
  getServices,
  getService,
  getWorkers,
  getWorker,
  getWorkflows,
  getWorkflow,
  getFunctions,
  getFunction
} from './mod.ts'

Deno.test('netzo.getServices', async () => {
  const [services, service] = await Promise.all([getServices(), getService(1)])
  assertEquals(services.length, 100)
  assertEquals(service.id, 1)
})

Deno.test('netzo.getWorkers', async () => {
  const [workers, worker] = await Promise.all([getWorkers(), getWorker(1)])
  assertEquals(workers.length, 5000)
  assertEquals(worker.id, 1)
})

Deno.test('netzo.getWorkflows', async () => {
  const [workflows, workflow] = await Promise.all([getWorkflows(), getWorkflow(1)])
  assertEquals(workflows.length, 100)
  assertEquals(workflow.id, 1)
})

Deno.test('netzo.getFunctions', async () => {
  const [functions, function] = await Promise.all([getFunctions(), getFunction(1)])
  assertEquals(functions.length, 200)
  assertEquals(function.id, 1)
})