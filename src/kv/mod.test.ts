import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { assertExists } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { Netzo } from "../../mod.ts";

const { API_KEY } = config();

const obj: Record<string | number, unknown> = {};

const asyncGetter = async (key: string) => {
  const value = await obj[key];
  return value;
};

const asyncSetter = async (key: string, value: unknown) => {
  obj[key] = await value;
};

Deno.test("netzo.kv", { ignore: !API_KEY }, async (t) => {
  const netzo = Netzo({ apiKey: API_KEY });
  const kv = netzo.kv(asyncGetter, asyncSetter);

  await t.step("kv", () => {
    assertExists(kv);
  });

  // kv.receiver.prop = await kv.provider.prop   // await it here
  // console.log(await kv.receiver.prop)

  // kv.receiver.another = kv.provider.another   // direct assign here, no await
  // console.log(await kv.receiver.another)

  // kv.provider.foo = "bar" // store someting providerly. up to you to decide await or not
});
