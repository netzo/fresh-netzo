import "https://deno.land/std@0.198.0/dotenv/load.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { monday } from "./mod.ts";

Deno.test("monday", async (t) => {
  const { api } = monday({
    apiKey: Deno.env.get("MONDAY_API_KEY")!,
  });

  await t.step("find boards", async () => {
    const query = `
    query { 
        boards (limit:5) { 
            name 
            id 
        }
    }`;
    const resultData = await api.post(query);
    assertExists(resultData);
    assertEquals(typeof resultData, "object");
  });

  await t.step("get board", async () => {
    const query = `
      query {
          boards (ids: ${"BOARD_ID"}) {
              name
              state
              id
              permissions
          }
      }`;
    const resultData = await api.post(query);
    assertExists(resultData);
    assertEquals(typeof resultData, "object");
  });
});
