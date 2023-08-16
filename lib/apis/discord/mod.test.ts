import "https://deno.land/std@0.198.0/dotenv/load.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { discord } from "./mod.ts";

Deno.test("discord", async (t) => {
  const { api } = discord({
    tokenType: Deno.env.get("DISCORD_TOKEN_TYPE") ?? "Bot",
    token: Deno.env.get("DISCORD_TOKEN")!,
  });

  await t.step("get channel", async () => {
    const data = await api.channels["CHANNEL_ID"].get();
    assertExists(data);
    assertEquals(typeof data, "object");
  });

  await t.step("find messages", async () => {
    const data = await api.channels["CHANNEL_ID"].messages.get();
    assertExists(data);
    assertEquals(Array.isArray(data), true);
  });

  await t.step("add message", async () => {
    const data = await api.channels["CHANNEL_ID"].messages.post({
      content: "Test message",
    });
    assertExists(data);
    assertEquals(typeof data, "object");
  });

  await t.step("update Message", async () => {
    const data = await api.channels["CHANNEL_ID"].messages["MESSAGE_ID"].patch({
      content: "Updated message",
    });
    assertExists(data);
    assertEquals(typeof data, "object");
  });
});
