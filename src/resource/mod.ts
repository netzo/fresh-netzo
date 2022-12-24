import { createClient } from "../clients/http/mod.ts";
import { ClientBuilder } from "../clients/http/types.ts";
import { IResource, ResourceClient } from "./types.ts";
import replace from "https://esm.sh/object-replace-mustache@1.0.2";
import { render } from "https://deno.land/x/mustache_ts@v0.4.1.1/mustache.ts";
import { auth } from "../utils/auth/mod.ts";

export const createResource = (api: ClientBuilder) => {
  return async (ref: string | IResource): Promise<ResourceClient> => {
    const item: IResource = typeof ref === "string"
      ? await api.resources[ref].get<IResource>()
      : ref;

    // [variables] adds support for templated options via {{•}} syntax
    let { baseURL, body, variables = {}, ...base } = item.base;
    const { authorization, query, headers } = replace(base, variables);

    // [baseURL] render templated string e.g. 'https://...{{•}}...'
    baseURL = baseURL ? render(baseURL, variables) : undefined;

    switch (item.type) {
      case "http":
      default: {
        const client = createClient({
          baseURL,
          query,
          headers,
          body,
          // query,
          async onRequest(ctx) {
            // [authorization] inject handlers for base.authorization in hooks
            await auth(authorization, ctx);
          },
          // async onRequestError(ctx) {},
          // async onResponse(ctx) {},
          // async onResponseError(ctx) {},
        });
        // NOTE: cannot return client directly like "return client"
        // nor use spread operator like "return { ...client, {...})" nor
        // "return Object.assign(client, {...})" somehow since client is
        // a Proxy object so we return an object wrapper which also allows
        // returning additional properties/methods in ResourceClient interface
        return { client, item };
      }
    }
  };
};
