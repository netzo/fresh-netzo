// deno-lint-ignore-file no-explicit-any
import type { App } from "fresh";
import { database as createDatabase } from "../../database/mod.ts";
import { createClient } from "../../deps/@libsql/client.ts";
import { eq, getTableColumns, SQL, sql } from "../../deps/drizzle-orm/mod.ts";
import { SQLiteTable } from "../../deps/drizzle-orm/sqlite-core.ts";
import { DrizzleConfig } from "../../deps/drizzle-orm/utils.ts";
import { NetzoState } from "../../mod.ts";
import { apiKeyAuthentication, cors } from "../middleware.ts";
import { parseRequestBody } from "../utils.ts";

const {
  NETZO_API_KEY,
  NETZO_DATABASE_URL,
  NETZO_DATABASE_AUTH_TOKEN,
} = Deno.env.toObject();

export type DatabaseConfig = DrizzleConfig & {
  /** Wether to require authentication using the provided API key in the
   * "x-api-key" header or "apiKey" query parameter. To disable authentication
   * set to `undefined`, otherwise it is recommended to set using Deno.env.get().
   * Defaults to Deno.env.get("NETZO_API_KEY"). */
  apiKey?: string;
};

// deno-lint-ignore ban-types
export type DatabaseState = {};

// WORKAROUND: drizzle-kit has a bug and .$onUpdated(() => new Date().toISOString())
// is somehow currently not updating the updatedAt field. So we do it manually
// until this is resolved upstream in drizzle-orm for the SQLite adapter.
// see https://github.com/drizzle-team/drizzle-orm/issues/2212
// see https://github.com/t3-oss/create-t3-turbo/issues/1082
const resolveData = (data: Record<string, unknown>) => ({
  ...data,
  updatedAt: new Date().toISOString(),
});

/**
 * A fresh plugin that registers middleware and handlers to
 * to mount RESTful API routes on the `/database` route path.
 *
 * - `GET /database/:tableName` find all records matching query
 * - `GET /database/:tableName/:id` get an entry by key
 * - `POST /database/:tableName` create a new entry (auto-generates id)
 * - `PUT /database/:tableName/:id` update an entry by key
 * - `PATCH /database/:tableName/:id` patch an entry by key
 * - `DELETE /database/:tableName/:id` remove an entry by key
 */
export const database = (app: App<NetzoState>, config?: DatabaseConfig) => {
  if (!config) return;
  if (!("apiKey" in config)) config.apiKey = NETZO_API_KEY;

  const db = createDatabase(config);

  const client = createClient({
    url: NETZO_DATABASE_URL!,
    authToken: NETZO_DATABASE_AUTH_TOKEN,
  });

  // middlewares:

  app.all("/database/:path*", cors());
  app.all("/database/:path*", apiKeyAuthentication({ apiKey: config.apiKey! }));

  // routes:

  app.post("/database", async (ctx) => {
    const {
      sql,
      params: args = [],
      method,
    } = await parseRequestBody(ctx.req);
    const result = await client.execute({ sql, args });
    // NOTE: Drizzle always waits for {rows: string[][]} or {rows: string[]}
    // for the return value. When the method is get, you should return a value
    // as { rows: string[] }. Otherwise, you should return { rows: string[][] }
    // see https://orm.drizzle.team/docs/get-started-sqlite#http-proxy
    const rows = method === "all"
      ? result.rows.map((row: any) => Array.from(row)) // somehow requires Array.from
      : result.rows[0];
    return Response.json(rows);
  });
  app.get("/database/[tableName]", async (ctx) => {
    const { tableName } = ctx.params;
    const table = config.schema![tableName] as any;
    const rows = await db.select().from(table);
    return Response.json(rows);
  });
  app.post("/database/[tableName]", async (ctx) => {
    const pk = ctx.url.searchParams.get("pk") || "id";
    const { tableName } = ctx.params;
    const table = config.schema![tableName] as any;
    const data = await parseRequestBody(ctx.req);
    try {
      const result = await db
        .insert(table)
        .values(data)
        // NOTE: there is no option to exclude column in sql, that's why we
        // have to specify the columns we want to update by using a custom
        // function buildConflictUpdateColumns() to allow for bulk upserts
        // see https://discord.com/channels/1043890932593987624/1243571991945019402/1243571991945019402
        // and also https://orm.drizzle.team/learn/guides/upsert
        .onConflictDoUpdate({
          target: table[pk],
          set: { ...data, id: sql`${table[pk]}` }, // leave "id" as it was
          // set: buildConflictUpdateColumns(table[pk], columns),
        })
        .returning();
      console.log(result);
      return Response.json(
        Array.isArray(result) ? result[0] : result.rows,
      );
    } catch (error) {
      console.error(error);
      return Response.json({ error: error.message }, { status: 400 });
    }
  });
  app.get("/database/[tableName]/[id]", async (ctx) => {
    const { tableName, id } = ctx.params;
    const table = config.schema![tableName] as any;
    const [row] = await db.select().from(table).where(eq(table.id, id));
    return Response.json(row);
  });
  app.put("/database/[tableName]/[id]", async (ctx) => {
    const { tableName, id } = ctx.params;
    const table = config.schema![tableName] as any;
    // WORKAROUND: resolveData until drizzle fixes .$onUpdated(() => new Date().toISOString())
    const data = Object.keys(table).includes("updatedAt")
      ? resolveData(await parseRequestBody(ctx.req))
      : await parseRequestBody(ctx.req);
    const result = await db.update(table).set(data).where(
      eq(table.id, id),
    ).returning();
    return Response.json(
      Array.isArray(result) ? result[0] : result.rows,
    );
  });
  app.patch("/database/[tableName]/[id]", async (ctx) => {
    const { tableName, id } = ctx.params;
    const table = config.schema![tableName] as any;
    // WORKAROUND: resolveData until drizzle fixes .$onUpdated(() => new Date().toISOString())
    const data = Object.keys(table).includes("updatedAt")
      ? resolveData(await parseRequestBody(ctx.req))
      : await parseRequestBody(ctx.req);
    const result = await db.update(table).set(data).where(
      eq(table.id, id),
    ).returning();
    return Response.json(
      Array.isArray(result) ? result[0] : result.rows,
    );
  });
  app.delete("/database/[tableName]/[id]", async (ctx) => {
    const { tableName, id } = ctx.params;
    const table = config.schema![tableName] as any;
    const result = await db.delete(table).where(eq(table.id, id))
      .returning();
    return Response.json(
      Array.isArray(result) ? result[0] : result.rows,
    );
  });
};

// deno-lint-ignore no-unused-vars
function buildConflictUpdateColumns<
  T extends SQLiteTable,
  Q extends keyof T["_"]["columns"],
>(table: T, columns: Q[]) {
  const cls = getTableColumns(table);
  return columns.reduce((acc, column) => {
    const colName = cls?.[column]?.name;
    if (colName) acc[column] = sql.raw(`excluded.${colName}`);
    return acc;
  }, {} as Record<Q, SQL>);
}
