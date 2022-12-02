import { createClient } from "../client/mod.ts";
import { ClientBuilder } from "../client/types.ts";
import { IService, ServiceClient } from "./types.ts";
import replace from "https://esm.sh/object-replace-mustache@1.0.2";
import { render } from "https://deno.land/x/mustache_ts@v0.4.1.1/mustache.ts";
import { auth } from "../utils/auth/mod.ts";

export const createService = (api: ClientBuilder) => {
  return async (ref: string | IService): Promise<ServiceClient> => {
    const item: IService = typeof ref === "string"
      ? await api.services[ref].get<IService>()
      : ref;

    // [variables] adds support for templated options via {{•}} syntax
    let { baseURL, body, variables = {}, ...base } = item.base;
    const { authorization, query, headers } = replace(base, variables);

    // [baseURL] render templated string e.g. 'https://...{{•}}...'
    baseURL = baseURL ? render(baseURL, variables) : undefined;

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
    // a Proxy object so we return a new object, which also extension
    // and prevents naming conflicts between other props and methods
    return { client, item };
  };
};
