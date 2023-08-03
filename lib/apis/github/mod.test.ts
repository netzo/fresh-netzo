import { assertExists } from "../deps.ts";
import { github } from "./mod.ts";

Deno.test("github", async (t) => {
  const { api } = github({
    personalAccessToken: Deno.env.get("GITHUB_PERSONAL_ACCESS_TOKEN"),
  });

  await t.step("api", async () => {
    const result = await api.users.get();
    assertExists(result);
  });
});
