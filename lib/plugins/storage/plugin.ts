import type { Plugin, PluginRoute } from "fresh";
import { apiKeyAuthentication, cors } from "../middleware.ts";

export type StorageConfig = {
  /** Wether to require authentication using the provided API key in the
   * "x-api-key" header or "apiKey" query parameter. To disable authentication
   * set to `undefined`, otherwise it is recommended to set using Deno.env.get().
   * Defaults to Deno.env.get("NETZO_API_KEY"). */
  apiKey?: string;
};

// deno-lint-ignore ban-types
export type StorageState = {};

/**
 * A fresh plugin that registers middleware and handlers to
 * to mount RESTful API routes on the `/storage` route path.
 *
 * - `GET /storage/objects` find all objects matching query
 * - `GET /storage/objects/:id` get an object by key
 * - `POST /storage/objects` create a new object (auto-generates id)
 * - `PUT /storage/objects/:id` update an object by key
 * - `PATCH /storage/objects/:id` patch an object by key
 * - `DELETE /storage/objects/:id` remove an object by key
 */
export const storage = (config?: StorageConfig): Plugin => {
  if (!config) return { name: "netzo.storage" };

  if (!("apiKey" in config)) config.apiKey = Deno.env.get("NETZO_API_KEY");

  return {
    name: "netzo.storage",
    middlewares: [
      {
        path: "/storage",
        middleware: {
          handler: cors(),
        },
      },
      {
        path: "/storage",
        middleware: {
          handler: apiKeyAuthentication({ apiKey: config.apiKey! }),
        },
      },
    ],
    routes: [
      {
        path: "/storage/objects",
        handler: {
          GET: async (req, _ctx) => {
            const response = await proxyStorage(req);
            return response;
          },
          POST: async (req, _ctx) => {
            const response = await proxyStorage(req);
            return response;
          },
          PUT: async (req, _ctx) => {
            const response = await proxyStorage(req);
            return response;
          },
          PATCH: async (req, _ctx) => {
            const response = await proxyStorage(req);
            return response;
          },
          DELETE: async (req, _ctx) => {
            const response = await proxyStorage(req);
            return response;
          },
        },
      } satisfies PluginRoute,
    ],
  };
};

/**
 * Proxies HTTP requests to the Netzo Storage API at api.netzo.io/objects.
 *
 * @example Manually use fetch on submit event with multipart/form-data
 * <form onSubmit={async (e: SubmitEventHandler<HTMLFormElement>) => {
 *   e.preventDefault()
 *   await fetch('/objects', { method: 'POST', body: new FormData(e.target) })
 *   e.target.reset()
 * }}>
 *   <input id="file" type="file" name="file" />
 *   <button type="submit">Submit</button>
 * </form>
 */
function proxyStorage(req: Request) {
  const apiKey = Deno.env.get("NETZO_API_KEY")!;
  const url = new URL(req.url);
  url.protocol = "https";
  url.hostname = "api.netzo.io";
  url.pathname = url.pathname.replace(/^\/storage/, ""); // remove "/storage" prefix
  const headers = new Headers(req.headers);
  headers.set("x-api-key", apiKey);
  const request = new Request(url.href, {
    method: req.method,
    headers,
    body: req.body,
  });

  return fetch(request);
}
