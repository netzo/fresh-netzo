import { assertExists } from "../../deps.ts";
import { googledrive } from "./mod.ts";

Deno.test("googledrive", async (t) => {
  const { options } = await import('./googledrive.options.ts')
  const { api } = googledrive(options)

  await t.step("api", async () => {
    const result = await api.drives.get()
    assertExists(result.kind)
  })
})