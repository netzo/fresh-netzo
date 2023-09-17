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
      prefix: "db",
      idField: "id",
      services: [
        {
          name: "users",
          schema: z.object({
            "id": z.number(),
            "name": z.string(),
            "username": z.string(),
            "email": z.string().email(),
            "address": z.object({
              "street": z.string(),
              "suite": z.string(),
              "city": z.string(),
              "zipcode": z.string(),
              "geo": z.object({
                "lat": z.string(),
                "lng": z.string(),
              }),
            }),
            "phone": z.string(),
            "website": z.string().url(),
            "company": z.object({
              "name": z.string(),
              "catchPhrase": z.string(),
              "bs": z.string(),
            }),
          }),
        },
        {
          name: "todos",
          schema: z.object({
            id: z.number(),
            userId: z.number(),
            title: z.string(),
            completed: z.boolean(),
          }),
        },
        // ...more services
      ],
    }),
    netzoErrorPages(),
    unocss(unoConfig),
    htmx(),
  ],
});
