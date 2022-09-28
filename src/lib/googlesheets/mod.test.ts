import { config } from "https://deno.land/x/dotenv/mod.ts";
import { assertEquals, assertExists } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { Netzo } from '../../../mod.ts'

const { API_KEY, API_KEY_SENDINBLUE } = config()

const netzo = Netzo({ apiKey: API_KEY })

const sendinblue = netzo.lib.sendinblue({ apiKey: API_KEY_SENDINBLUE })

Deno.test('sendinblue', () => {
  assertExists(netzo)
  assertExists(netzo.lib.sendinblue)
  assertExists(sendinblue)
})