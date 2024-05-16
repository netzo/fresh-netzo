// IMPORTANT: requires importing createClient from /web and not from root nor /node
// see https://github.com/tursodatabase/libsql-client-ts/issues/138#issuecomment-1921954374
import { IS_BROWSER } from "$fresh/runtime.ts";
import { createClient } from "npm:/@libsql/client@0.6.0/web";
import { drizzle } from "npm:/drizzle-orm@0.30.10/libsql";
import { drizzle as drizzleSqliteProxy } from "npm:/drizzle-orm@0.30.10/sqlite-proxy";
import type { DrizzleConfig } from "npm:drizzle-orm@0.30.10/utils";

export { nanoid as id } from "./mod.utils.ts";

export type DatabaseOptions = {
  url?: string;
  authToken?: string;
  config?: DrizzleConfig;
};

type Query = {
  sql: string;
  // deno-lint-ignore no-explicit-any
  params: any[];
  method: "all" | "run" | "get" | "values";
};

export const database = (options: DatabaseOptions = {}) => {
  // [client] use sqlite- proxy in browser to sent SQL queries via the netzo.database()
  // plugin which mounts a POST /database endpoint to proxy the SQL queries
  if (IS_BROWSER) {
    const db = drizzleSqliteProxy(
      async (
        sql: Query["sql"],
        params: Query["params"],
        method: Query["method"],
      ) => {
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
      },
      // deno-lint-ignore require-await
      async (_queries: Query[]) => {
        // TODO: add support for batch queries (multiple in a single request) via db.batch([])
        // see https://orm.drizzle.team/docs/get-started-sqlite#http-proxy
        throw new Error("Batch queries are not supported yet");
      },
    );

    return db;
  } // [server] use drizzle-orm in deno to connect to a remote libSQL database directly
  else {
    const client = createClient({
      url: Deno.env.get("NETZO_DATABASE_URL")!,
      authToken: Deno.env.get("NETZO_DATABASE_AUTH_TOKEN"),
    });

    const db = drizzle(client, options.config!);

    return db;
  }
};
