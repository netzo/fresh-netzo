import { createFetch } from "../fetch/mod.ts";
import { ClientBuilder } from "../fetch/types.ts";
import {
  ServiceClient,
  ServiceItem,
  ServiceRequestClient,
  ServiceRequestItem,
} from "./types.ts";
import replace from "https://esm.sh/object-replace-mustache@1.0.2";
import { deepMerge } from "https://deno.land/std@0.157.0/collections/deep_merge.ts";

const createServiceRequest = (
  item: ServiceRequestItem,
): ServiceRequestClient => {
  // [variables] adds support for templated options via {{•}} syntax
  const { variables = {} } = item;
  const { url, baseURL, method, headers, body } = replace(item, variables);
  const href = new URL(url, baseURL).href; // ensures url is absolute and valid

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

  return { request, invoke, item };
};

export const createService = (api: ClientBuilder) => {
  return async (_id: string): Promise<ServiceClient> => {
    const item = await api.services[_id].get<ServiceItem>();
    const client = createFetch(item.client); // all 'item.type's use fetch client

    const requests: ServiceClient["requests"] = item.requests.reduce(
      (previousValue, currentValue, index) => {
        // [inheritance] deep-merges service.client with service.requests[index].client
        const serviceRequestItem = deepMerge<ServiceRequestItem>(
          item.client,
          currentValue,
        );
        const serviceRequest = createServiceRequest(serviceRequestItem);
        return {
          ...previousValue,
          [index]: serviceRequest, // access entire service request by index
          [currentValue.name]: serviceRequest.invoke, // alias to invoke by name
        };
      },
      {},
    );

    return { client, requests, item }; // see NOTE bellow
  };
};

// NOTE: cannot return client directly like "return client"
// nor use spread operator like "return { ...client, {...})" nor
// "return Object.assign(client, {...})" somehow since client is
// a Proxy object so we return a new object, which also extension
// and prevents naming conflicts between other props and methods
