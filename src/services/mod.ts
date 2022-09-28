import { ClientHTTP, http } from "../http/mod.ts";

interface Data {
  _id: string;
  _type: 'service';
  name: string;
}

export const services = (api: ClientHTTP) => {
  return async (_id: string) => {
    const item = await api.services[String(_id)].get()
    const client = http(item.client)
    // cannot spread client since it's a Proxy so use Object.assign
    return Object.assign(client, {
      save: (data: Data) => api.services[_id].patch<Data>(data)
    })
  }
}

// export const services = (api: ClientHTTP) => {
//   return new Proxy(http, {
//     /** Select an existing service by ID to instantiate it. */
//     get: async (target, _id) => {
//       const item = await api.services[String(_id)].get()
//       const service = http(item.client)
//       console.log({ item })
//       return {
//         ...service,
//         save: (data: Data) => service.patch<Data>(data)
//       }
//     },
//     /** Creating a new service by ID to instantiate it. */
//     apply: (target, thisArg, args) => {
//       const service = target(args[0]) // http(clientInit)
//       return {
//         ...service,
//         save: (data: Data) => service.patch<Data>(data)
//       }
//     }
//   })
// }