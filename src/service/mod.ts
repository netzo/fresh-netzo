import { createFetch } from "../fetch/mod.ts";
import { ClientBuilder } from "../fetch/types.ts";
import {
  IRequest,
  IService,
  ServiceClient,
  ServiceRequestClient,
} from "./types.ts";
import { $fetch } from "https://esm.sh/ohmyfetch@0.4.18";
import replace from "https://esm.sh/object-replace-mustache@1.0.2";
import { deepMerge } from "https://deno.land/std@0.157.0/collections/deep_merge.ts";
import { esImportStringByName } from "./utils.ts";

const createServiceRequest = (
  ref: IRequest,
): ServiceRequestClient => {
  // [variables] adds support for templated options via {{•}} syntax
  const { variables = {} } = ref;
  const { url, ref: { base }, method, headers, body, hooks } = replace(
    ref,
    variables,
  );
  const href = base?.baseURL
    ? new URL(url, base.baseURL).href
    : new URL(url).href;

  const request = new Request(href, {
    method: method.toUpperCase(),
    headers,
    body: ["GET", "HEAD"].includes(method) ? undefined : body,
  });

  const invoke = async () => {
    const response = await $fetch.raw(request, {
      method,
      headers,
      body: ["GET", "HEAD"].includes(method) ? undefined : body,
      async onRequest(ctx) {
        await (await esImportStringByName(base?.hooks?.onRequest))?.(ctx);
        await (await esImportStringByName(hooks?.onRequest))?.(ctx);
      },
      async onRequestError(ctx) {
        await (await esImportStringByName(base?.hooks?.onRequestError))?.(ctx);
        await (await esImportStringByName(hooks?.onRequestError))?.(ctx);
      },
      async onResponse(ctx) {
        await (await esImportStringByName(base?.hooks?.onResponse))?.(ctx);
        await (await esImportStringByName(hooks?.onResponse))?.(ctx);
      },
      async onResponseError(ctx) {
        await (await esImportStringByName(base?.hooks?.onResponseError))?.(ctx);
        await (await esImportStringByName(hooks?.onResponseError))?.(ctx);
      },
    });
    return response._data;
  };

  return { request, invoke, ref };
};

export const createService = (api: ClientBuilder) => {
  return async (_id: string): Promise<ServiceClient> => {
    const ref = await api.services[_id].get<IService>();
    const client = createFetch(ref.base);

    const requests: ServiceClient["requests"] = ref.requests
      // [associate] injects inherited properties into 'ref' property
      .map((request) => deepMerge<IRequest>(request, { ref }))
      // [inheritance] deep-merges ref.base to request itself
      .reduce((previousValue, request, index) => {
        const mergedRequest = deepMerge<IRequest>(
          request.ref.base as Partial<IRequest>,
          request,
        );
        const serviceRequest = createServiceRequest(mergedRequest);
        return {
          ...previousValue,
          [index]: serviceRequest, // access entire service request by index
          [request.name]: serviceRequest.invoke, // alias to invoke by name
        };
      }, {});

    return { client, requests, ref }; // see NOTE bellow
  };
};

// NOTE: cannot return client directly like "return client"
// nor use spread operator like "return { ...client, {...})" nor
// "return Object.assign(client, {...})" somehow since client is
// a Proxy object so we return a new object, which also extension
// and prevents naming conflicts between other props and methods
