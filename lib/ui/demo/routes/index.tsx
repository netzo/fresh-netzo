import { defineRoute } from "$fresh/server.ts";
import Demo from "@/islands/Demo.tsx";

export default defineRoute(() => {
  return (
    <html>
      <head>
        <title>netzo/ui/components</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <main class="p-4 mx-auto">
        <Demo />
      </main>
    </html>
  );
});
