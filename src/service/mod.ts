import { Client } from "../../types.ts";
import {
  http,
  // see,
  // websocket
} from "../http/mod.ts";
import { ClientBuilder } from "../http/types.ts";
import { ItemService, ItemServiceRequest, ServiceRequest } from "./types.ts";

const getClient = (item: ItemService): Client => {
  switch (item.type) {
    case 'http':
      return http(item.client)
    // case 'sse':
    //   return sse(item.client)
    // case 'websocket':
    //   return websocket(item.client)
    default:
      throw new Error(`Unknown service type: ${item.type}`)
  }
}

const createServiceRequests = ({ api, _id, item }: any) => {
  return (requestItem: ItemServiceRequest, index: number) => {
    // TODO: reuse existing client (of service) if possible
    // or at least $fetch/useFetch/unfetch client which supports
    // entire service request options (for example hooks, etc.)
    const createInvoke = (item: ItemServiceRequest) => {
      const { url, method, headers, body } = item
      return async () => {
        const response = await fetch(url, {
          method,
          headers,
          // IMPORTANT: Request with GET/HEAD method cannot have body
          ...(!['GET', 'HEAD'].includes(method) && { body }),
        })
        return response.json()
      }
    }
    const proxy = new Proxy((() => { }), {
      /** Select existing by name: "service.requests('getAllTodos')" */
      get: (_target, _id): ServiceRequest => {
        return { invoke: createInvoke(item), item }
      },
      /** Creating a new service by passing in options */
      apply: (_target, _thisArg, args): ServiceRequest => {
        return { invoke: createInvoke(item), item }
      }
    })
    return [item.name, proxy]
  }
}

export const createService = (api: ClientBuilder) => {
  return async (_id: string) => {
    const item = await api.services[_id].get()
    const client = getClient(item)

    const requests = Object.fromEntries(
      item.requests.map(createServiceRequests({ api, _id, item }))
    )

    return { client, requests, item } // see NOTE bellow
  }
}

// NOTE: cannot return client directly like "return client"
// nor use spread operator like "return { ...client, {...})" nor
// "return Object.assign(client, {...})" somehow since client is
// a Proxy object so we return a new object, which also extension
// and prevents naming conflicts between other props and methods