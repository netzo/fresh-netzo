import "std/dotenv/load.ts";
import { defineNetzoConfig } from "netzo/config.ts";
import unoConfig from "./uno.config.ts";
import { z } from "zod/mod.ts";

export default defineNetzoConfig({
  project: "stuck-halibut-554329",
  entrypoint: "main.ts",
  modules: {
    errorPages: {},
    restdb: {
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
    },
    oauth: { visibility: "public" },
    unocss: unoConfig,
  },
});
