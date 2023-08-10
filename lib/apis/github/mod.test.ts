import { assertEquals, assertExists } from "../deps.ts";
import { github } from "./mod.ts";

Deno.test("github", async (t) => {
  const { api } = github({
    personalAccessToken: Deno.env.get("GITHUB_PERSONAL_ACCESS_TOKEN")!,
  });

  await t.step("find users", async () => {
    const data = await api.users.get();
    assertExists(data);
    assertEquals(Array.isArray(data), true);
  });

  await t.step("get user", async () => {
    const data = await api.users["netzo"].get();
    assertExists(data);
    assertEquals(typeof data, "object");
  });

  await t.step("Find repositories of user", async () => {
    const data = await api.users["octocat"].repos.get();
    assertExists(data);
    assertEquals(Array.isArray(data), true);
  });

  await t.step("Find repositories of organization", async () => {
    const data = await api.orgs["netzo"].repos.get();
    assertExists(data);
    assertEquals(Array.isArray(data), true);
  });

  await t.step("Find issues of repository", async () => {
    const data = await api.repos["octocat"]["Hello-World"].issues.get();
    assertExists(data);
    assertEquals(Array.isArray(data), true);
  });
});
