import { assertEquals } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { createClient } from "./mod.ts";

const client = createClient({
  baseURL: "https://jsonplaceholder.typicode.com/"
});

Deno.test("createClient", async (): Promise<void> => {
  const [albums, album] = await Promise.all([
    client.albums.get(),
    client.albums(1).get()
  ])
  assertEquals(albums.length, 100)
  assertEquals(album.id, 1)
});

