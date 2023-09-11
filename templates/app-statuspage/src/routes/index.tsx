import { defineRoute } from "$fresh/server.ts";
import Statuspage from "../islands/Statuspage.tsx";

export default defineRoute(() => {
  return (
    <html>
      <head>
        <title>Fresh App</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <Statuspage />
    </html>
  );
});
