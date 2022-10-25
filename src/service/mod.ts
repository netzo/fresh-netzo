import { createFetch } from "../fetch/mod.ts";
import { ClientBuilder } from "../fetch/types.ts";
import {
  IRequest,
  IService,
  ServiceClient,
  ServiceRequestClient,
} from "./types.ts";
import replace from "https://esm.sh/object-replace-mustache@1.0.2";
import { deepMerge } from "https://deno.land/std@0.157.0/collections/deep_merge.ts";

const createServiceRequest = (
  ref: IRequest,
): ServiceRequestClient => {
  // [variables] adds support for templated options via {{•}} syntax
  const { variables = {} } = ref;
  const { url, ref: { base }, method, headers, body } = replace(ref, variables);
  const href = base?.baseURL
    ? new URL(url, base.baseURL).href
    : new URL(url).href;

  const request = new Request(href, {
    method: method.toUpperCase(),
    headers,
    // IMPORTANT: Request with GET/HEAD method cannot have body
    ...(body && !["GET", "HEAD"].includes(method.toUpperCase()) && { body }),
  });

  // TODO: reuse existing client (of service) if possible
  // or at least $fetch/useFetch/unfetch client which supports
  // entire service request options (for example hooks, etc.)
  const invoke = async () => {
    const response = await fetch(request);
    return response.json();
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
