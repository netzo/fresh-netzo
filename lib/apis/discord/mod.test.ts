import "https://deno.land/std@0.205.0/dotenv/load.ts";
import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.205.0/testing/asserts.ts";
import { discord } from "./mod.ts";

Deno.test("[apis] discord", async (t) => {
  const api = discord({
    tokenType: Deno.env.get("DISCORD_TOKEN_TYPE") ?? "Bot",
    token: Deno.env.get("DISCORD_TOKEN")!,
  });

  await t.step("get channel", async () => {
    const resultData = await api.channels["CHANNEL_ID"].get();
    assertExists(resultData);
    assertEquals(typeof resultData, "object");
  });

  await t.step("find messages", async () => {
    const resultData = await api.channels["CHANNEL_ID"].messages.get();
    assertExists(resultData);
    assertEquals(Array.isArray(resultData), true);
  });

  //CUD operations:

  // await t.step("add message", async () => {
  //   const resultData = await api.channels["CHANNEL_ID"].messages.post({
  //     content: "Test message",
  //   });
  //   assertExists(resultData);
  //   assertEquals(typeof resultData, "object");
  // });

  // await t.step("update Message", async () => {
  //   const resultData = await api.channels["CHANNEL_ID"].messages["MESSAGE_ID"].patch({
  //     content: "Updated message",
  //   });
  //   assertExists(resultData);
  //   assertEquals(typeof resultData, "object");
  // });
});
