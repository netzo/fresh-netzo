import "../../../deps/std/dotenv/load.ts";
import { assertEquals, assertExists } from "../../../deps/std/assert/mod.ts";
import { github } from "./mod.ts";

Deno.test("[apis] github", async (t) => {
  const api = github({
    personalAccessToken: Deno.env.get("GITHUB_PERSONAL_ACCESS_TOKEN")!,
  });

  await t.step("find users", async () => {
    const resultData = await api.users.get();
    assertExists(resultData);
    assertEquals(Array.isArray(resultData), true);
  });

  await t.step("get user", async () => {
    const resultData = await api.users["netzo"].get();
    assertExists(resultData);
    assertEquals(typeof resultData, "object");
  });

  await t.step("Find repositories of user", async () => {
    const resultData = await api.users["octocat"].repos.get();
    assertExists(resultData);
    assertEquals(Array.isArray(resultData), true);
  });

  await t.step("Find repositories of organization", async () => {
    const resultData = await api.orgs["netzo"].repos.get();
    assertExists(resultData);
    assertEquals(Array.isArray(resultData), true);
  });

  await t.step("Find issues of repository", async () => {
    const resultData = await api.repos["octocat"]["Hello-World"].issues.get();
    assertExists(resultData);
    assertEquals(Array.isArray(resultData), true);
  });
});
