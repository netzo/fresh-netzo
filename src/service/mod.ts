import { createFetch } from "../fetch/mod.ts";
import { ClientBuilder } from "../fetch/types.ts";
import {
  ItemService,
  ItemServiceRequest,
  Service,
  ServiceRequest,
  ServiceRequests,
} from "./types.ts";
import replace from "https://esm.sh/object-replace-mustache@1.0.2";
import { deepMerge } from "https://deno.land/std@0.157.0/collections/deep_merge.ts";

const getClient = (item: ItemService): ClientBuilder => {
  switch (item.type) {
    case "http":
    case "graphql":
    case "worker":
    case "openapi":
      return createFetch(item.client); // all types use fetch client
    default:
      throw new Error(`Unknown service type: ${item.type}`);
  }
};

const createServiceRequest = (item: ItemServiceRequest): ServiceRequest => {
  // [variables] adds support for templated options via {{•}} syntax
  const { variables = {} } = item;
  const { url, baseURL, method, headers, body } = replace(item, variables);
  const href = new URL(url, baseURL).href; // ensures url is absolute and valid

  // TODO: reuse existing client (of service) if possible
  // or at least $fetch/useFetch/unfetch client which supports
  // entire service request options (for example hooks, etc.)
  const invoke = async () => {
    const response = await fetch(href, {
      method: method.toUpperCase(),
      headers,
      // IMPORTANT: Request with GET/HEAD method cannot have body
      ...(body && !["GET", "HEAD"].includes(method.toUpperCase()) && { body }),
    });
    return response.json();
  };
  return { invoke, item };
};

export const createService = (api: ClientBuilder) => {
  return async (_id: string): Promise<Service> => {
    const item = await api.services[_id].get<ItemService>();
    const client = getClient(item);

    const requests: ServiceRequests = item.requests.reduce(
      (previousValue, currentValue, index) => {
        // [inheritance] deep-merges service.client with service.requests[index].client
        const itemServiceRequest = deepMerge(
          item.client,
          currentValue,
        ) as ItemServiceRequest;
        const serviceRequest = createServiceRequest(itemServiceRequest);
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
