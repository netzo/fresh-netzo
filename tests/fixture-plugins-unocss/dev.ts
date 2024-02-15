#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";

await dev(import.meta.url, "./main.ts"); // DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $0 from "./routes/index.tsx";
import * as $$0 from "./islands/CheckDuplication.tsx";
import * as $$1 from "./islands/InsertCssRules.tsx";

const manifest = {
  routes: {
    "./routes/check-duplication.tsx": $0,
    "./routes/insert-cssrules.tsx": $1,
    "./routes/static.tsx": $2,
    "./routes/unused.tsx": $3,
  },
  islands: {
    "./islands/CheckDuplication.tsx": $$0,
    "./islands/InsertCssRules.tsx": $$1,
  },
  baseUrl: import.meta.url,
};

export default manifest;
