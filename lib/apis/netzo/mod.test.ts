import { config } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts'
import { assertExists } from 'https://deno.land/std@0.97.0/testing/asserts.ts'
import { netzo } from './mod.ts'

const { AUTH_ENV_VAR_API_KEY_EDIT: apiKey } = config()

Deno.test('netzo', async (t) => {
  const { api, getVariable } = netzo({ apiKey })

  await t.step('declarations', () => {
    assertExists(netzo)
    assertExists(api)
    assertExists(getVariable)
  })

  await t.step('api.users.get({ $limit: 0 })', async () => {
    const result = await api.users.get({ $limit: 0 })
    assertExists(result?.total)
    assertExists(result?.limit)
    assertExists(result?.skip)
    assertExists(result?.data)
  })
})
