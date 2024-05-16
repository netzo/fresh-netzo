// IMPORTANT: requires importing createClient from /web and not from root nor /node
// see https://github.com/tursodatabase/libsql-client-ts/issues/138#issuecomment-1921954374
import { IS_BROWSER } from "$fresh/runtime.ts";
import { createClient } from "npm:/@libsql/client@0.6.0";
import { drizzle } from "npm:/drizzle-orm@0.30.10/libsql";
import { drizzle as drizzleSqliteProxy } from "npm:/drizzle-orm@0.30.10/sqlite-proxy";
import type { DrizzleConfig } from "npm:drizzle-orm@0.30.10/utils";

export { nanoid as id } from "./mod.utils.ts";

export type DatabaseOptions = DrizzleConfig & {
  url?: string;
  authToken?: string;
};

export const database = (options: DatabaseOptions = {}) => {
  // [client] use sqlite- proxy in browser to sent SQL queries via the netzo.database()
  // plugin which mounts a POST /database endpoint to proxy the SQL queries
  // see https://orm.drizzle.team/docs/get-started-sqlite#http-proxy
  // see https://github.com/drizzle-team/drizzle-orm/tree/main/examples/sqlite-proxy#proxy-server-implementation-example
  // see https://github.com/tdwesten/tauri-drizzle-sqlite-proxy-demo/blob/37a05b36d19d990abe86aff7d03cd8be87c5ba6a/src/db/database.ts
  if (IS_BROWSER) {
    /**
     * HTTP proxy
     *
     * Drizzle ORM also supports simply using asynchronous callback function for executing SQL.
     *
     * • sql is a query string with placeholders.
     * • params is an array of parameters.
     * • one of the following values will set for method depending on the SQL statement - run, all, values or get.
     * • drizzle always waits for {rows: string[][]} or {rows: string[]} for the return value.
     *
     * • when the method is get, you should return a value as {rows: string[]}
     * • otherwise, you should return {rows: string[][]}.
     */
    const db = drizzleSqliteProxy(
      async (sql, params, method) => {
        try {
          const response = await fetch("/database", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ sql, params, method }),
          });
          const rows = await response.json();
          return { rows };
        } catch (e) {
          console.error(e.response.data);
          return { rows: [] };
        }
      },
      options, // pass drizzle config (schema and logger)
    );

    return db;
  } // [server] use drizzle-orm in deno to connect to a remote libSQL database directly
  else {
    const client = createClient({
      url: Deno.env.get("NETZO_DATABASE_URL")!,
      authToken: Deno.env.get("NETZO_DATABASE_AUTH_TOKEN"),
    });

    const db = drizzle(client, options!);

    return db;
  }
};
