import { ClientHTTP, http, ClientOptionsHTTP } from "../http/mod.ts";

interface Data {
  _id: string;
  _type: 'service';
  name: string;
}

export const _services = (api: ClientHTTP) => {
  return new Proxy(http, {
    /**
     * Select an existing service by ID to instantiate it.
     * @example const service = await netzo.service[SERVICE_ID]
     * @return {object} - A service instance
     */
    get: async (target, _id) => {
      const item = await api.services[String(_id)].get()
      const service = http(item.client)
      return {
        ...service,
        save: (data: Data) => service.patch<Data>(data)
      }
    },
    /**
     * Creating a new service by ID to instantiate it.
     * @example const service = await netzo.service[SERVICE_ID]
     * @return {object} - A service instance
     */
    apply: (target, thisArg, args) => {
      const serviceOptions = args[0] as ClientOptionsHTTP
      const service = target(serviceOptions) // target is _http
      return {
        ...service,
        save: (data: Data) => service.patch<Data>(data)
      }
    }
  })
}