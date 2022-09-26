import { config } from "https://deno.land/x/dotenv/mod.ts";
import { assertEquals } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { Netzo } from '../../mod.ts'

const netzo = Netzo({ apiKey: config().API_KEY_NETZO })

Deno.test('netzo.services', async () => {
  const [services, service] = await Promise.all([
    netzo.netzo.services.find(),
    netzo.netzo.services.get('63208ffb0b782c3aae212c16')
  ])
  assertEquals(Array.isArray(services?.data), true)
  assertEquals(service._id, '63208ffb0b782c3aae212c16')
})

Deno.test('netzo.workers', async () => {
  const [workers, worker] = await Promise.all([
    netzo.netzo.workers.find(),
    netzo.netzo.workers.get('63112ce37fd6850c95923702')
  ])
  assertEquals(Array.isArray(workers?.data), true)
  assertEquals(String(worker._id), '63112ce37fd6850c95923702')
})

Deno.test('netzo.workflows', async () => {
  const [workflows, workflow] = await Promise.all([
    netzo.netzo.workflows.find(),
    netzo.netzo.workflows.get('631926529a32a492ad592938')
  ])
  assertEquals(Array.isArray(workflows?.data), true)
  assertEquals(workflow._id, '631926529a32a492ad592938')
})