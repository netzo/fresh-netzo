import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import { mdx } from "../../mod.ts";

export default defineConfig({
  plugins: [await mdx({ configLocation: import.meta.url }), tailwind()],
});
