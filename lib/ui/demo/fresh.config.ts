import "std/dotenv/load.ts";
import { defineConfig } from "$fresh/server.ts";
import { htmx } from "netzo/ui/plugins/htmx/mod.ts";
import { netzoAuth } from "netzo/ui/plugins/netzoAuth/mod.ts";
import { netzoDB } from "netzo/ui/plugins/netzoDB/mod.ts";
import { netzoErrorPages } from "netzo/ui/plugins/netzoErrorPages/mod.ts";
import { unocss } from "netzo/ui/plugins/unocss/mod.ts";
import unoConfig from "./uno.config.ts";
import { z } from "zod/mod.ts";

export default defineConfig({
  plugins: [
    netzoAuth({ visibility: "public" }),
    netzoDB({
      prefix: 'db',
      idField: "id",
      methods: ["find", "get", "create", "update", "patch", "delete"],
      services: {
        users: {
          idField: "_id",
          methods: ["find", "get"], // allow reading only
          schema: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string().email(),
            password: z.string(),
            role: z.enum(["admin", "user"]),
          })
        },
        companies: {
          schema: z.object({
            id: z.string(),
            name: z.string(),
            city: z.string(),
          })
        },
        // ...more services
      },
    }),
    netzoErrorPages(),
    unocss(unoConfig),
    htmx(),
  ],
});
