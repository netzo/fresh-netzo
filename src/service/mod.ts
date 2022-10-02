import { Client } from "../../types.ts";
import {
  http,
  // see,
  // websocket
} from "../http/mod.ts";
import { ClientBuilder } from "../http/types.ts";
import {
  ItemService,
  ItemServiceRequest,
  Service,
  ServiceRequest,
  ServiceRequests,
} from "./types.ts";
import replace from "https://esm.sh/object-replace-mustache@1.0.2";
import { merge } from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

const getClient = (item: ItemService): Client => {
  switch (item.type) {
    case "http":
      return http(item.client);
    // case 'sse':
    //   return sse(item.client)
    // case 'websocket':
    //   return websocket(item.client)
    default:
      throw new Error(`Unknown service type: ${item.type}`);
  }
};

const createServiceRequest = (item: ItemServiceRequest): ServiceRequest => {
  // TODO: reuse existing client (of service) if possible
  // or at least $fetch/useFetch/unfetch client which supports
  // entire service request options (for example hooks, etc.)
  const invoke = async () => {
    // [variables] adds support for templated options via {{•}} syntax
    const { variables = {} } = item;
    const { url, baseURL, method, headers, body } = replace(item, variables);
    const href = new URL(url, baseURL).href; // ensures url is absolute and valid
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

    const requests = item.requests.reduce(
      (previousValue, currentValue, index) => {
        // [inheritance] merges service.client (of service) with client (of service request)
        const serviceRequest = createServiceRequest(
          merge(item.client, currentValue),
        );
        return {
          ...previousValue,
          [index]: serviceRequest, // access entire service request by index
          [currentValue.name]: serviceRequest.invoke, // alias to invoke by name
        };
      },
      {} as ServiceRequests,
    );

    return { client, requests, item }; // see NOTE bellow
  };
};

// NOTE: cannot return client directly like "return client"
// nor use spread operator like "return { ...client, {...})" nor
// "return Object.assign(client, {...})" somehow since client is
// a Proxy object so we return a new object, which also extension
// and prevents naming conflicts between other props and methods
