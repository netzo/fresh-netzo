import { config } from "https://deno.land/x/dotenv/mod.ts";
import { assertEquals, assertExists } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { Netzo } from '../../mod.ts'

const { API_KEY } = config()

const netzo = Netzo({ apiKey: API_KEY })

const obj: Record<string | number, any> = {}

const asyncGetter = async (key: string) => {
  const value = await obj[key]
  return value
}

const asyncSetter = async (key: string, value: any) => {
  obj[key] = await value
}

const kv = netzo.kv(asyncGetter, asyncSetter)

Deno.test("netzo.kv", () => {
  assertExists(netzo.kv)
})

Deno.test("kv", async () => {
  assertExists(kv)

  kv.local.prop = await kv.remote.prop   // await it here
  console.log(await kv.local.prop)

  kv.local.another = kv.remote.another   // direct assign here, no await
  console.log(await kv.local.another)

  kv.remote.foo = "bar" // store someting remotely. up to you to decide await or not
})