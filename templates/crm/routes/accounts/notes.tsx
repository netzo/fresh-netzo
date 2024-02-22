import { defineRoute } from "$fresh/server.ts";
import { type Note } from "../../data/notes.ts";
import { Notes } from "../../islands/notes/Notes.tsx";
import { $client } from "../../netzo.config.ts";

export default defineRoute(async (req, ctx) => {
  const data = await $client.notes.find() as Note[];

  return <Notes data={data} />;
});
