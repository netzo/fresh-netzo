import { createClient } from "../client/mod.ts";
import { ClientBuilder } from "../client/types.ts";
import { IService, ServiceClient } from "./types.ts";
import { type FetchOptions } from "https://esm.sh/ofetch@1.0.0";
import replace from "https://esm.sh/object-replace-mustache@1.0.2";
import { render } from "https://deno.land/x/mustache_ts@v0.4.1.1/mustache.ts";
import { importFromStringByName } from "./utils.ts";

export const createService = (api: ClientBuilder) => {
  return async (ref: string | IService): Promise<ServiceClient> => {
    const item: IService = typeof ref === "string"
      ? await api.services[ref].get<IService>()
      : ref;

    // [variables] adds support for templated options via {{•}} syntax
    const { variables = {}, ...base } = item.base;
    const { headers, body, params } = replace<FetchOptions>(base, variables);
    // object-replace-mustache does not render templated
    // strings with prefix or suffix e.g. 'https://...{{•}}...'
    // so we need to render strings individually with mustache
    const baseURL = base?.baseURL ? render(base.baseURL, variables) : undefined;

    const hooks = await importFromStringByName(base?.hooks);
    // TODO: [authorization] inject handlers for base.authorization in hooks

    const client = createClient({
      baseURL,
      headers,
      body,
      params,
      // query,
      async onRequest(ctx) {
        await hooks?.onRequest?.(ctx);
      },
      async onRequestError(ctx) {
        await hooks?.onRequestError?.(ctx);
      },
      async onResponse(ctx) {
        await hooks?.onResponse?.(ctx);
      },
      async onResponseError(ctx) {
        await hooks?.onResponseError?.(ctx);
      },
    });

    return { client, item }; // see NOTE bellow
  };
};

// NOTE: cannot return client directly like "return client"
// nor use spread operator like "return { ...client, {...})" nor
// "return Object.assign(client, {...})" somehow since client is
// a Proxy object so we return a new object, which also extension
// and prevents naming conflicts between other props and methods
