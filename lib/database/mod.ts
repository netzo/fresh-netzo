// IMPORTANT: requires importing createClient from /web and not from root nor /node
// see https://github.com/tursodatabase/libsql-client-ts/issues/138#issuecomment-1921954374
import { IS_BROWSER } from "$fresh/runtime.ts";
import { createClient } from "npm:/@libsql/client@0.6.0/web";
import { drizzle } from "npm:/drizzle-orm@0.30.10/libsql";
import { drizzle as drizzleProxy } from "npm:/drizzle-orm@0.30.10/sqlite-proxy";
import type { DrizzleConfig } from "npm:drizzle-orm@0.30.10/utils";

export { nanoid as id } from "./mod.utils.ts";

export type DatabaseOptions = {
  url?: string;
  authToken?: string;
  config?: DrizzleConfig;
};

export const database = (options: DatabaseOptions = {}) => {
  if (IS_BROWSER) {
    const db = drizzleProxy(async (sql, params, method) => {
      try {
        const response = await fetch("/database", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ sql, params, method }),
        });
        const rows = await response.json();
        console.log(rows);
        return { rows: rows.data };
      } catch (e) {
        console.error("Error from sqlite proxy server: ", e.response.data);
        return { rows: [] };
      }
    });

    return db;
  } else {
    const {
      url = Deno.env.get("NETZO_DATABASE_URL")!,
      authToken = Deno.env.get("NETZO_DATABASE_AUTH_TOKEN"),
      config,
    } = options ?? {};

    const client = createClient({ url, authToken });

    const db = drizzle(client, config);

    return db;
  }
};
