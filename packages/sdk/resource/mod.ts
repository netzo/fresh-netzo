import { createClientHttp } from './http/mod.ts'
import { ClientBuilder } from './http/types.ts'
import { IResource, ResourceClient } from './types.ts'
import { auth } from '../utils/auth/mod.ts'

export const createGetResource = (api: ClientBuilder) => {
  return async (id: string): Promise<ResourceClient> => {
    const item: IResource = await api.resources[id].get<IResource>()

    const { baseURL, body, authorization, query, headers } = item.base

    switch (item.type) {
      case 'http':
      default: {
        const client = createClientHttp({
          baseURL,
          query,
          headers,
          body,
          // query,
          async onRequest(ctx) {
            // [authorization] inject handlers for base.authorization in hooks
            await auth(authorization, ctx)
          },
          // async onRequestError(ctx) {},
          // async onResponse(ctx) {},
          // async onResponseError(ctx) {},
        })
        // NOTE: cannot return client directly like "return client"
        // nor use spread operator like "return { ...client, {...})" nor
        // "return Object.assign(client, {...})" somehow since client is
        // a Proxy object so we return an object wrapper which also allows
        // returning additional properties/methods in ResourceClient interface
        return { client, item }
      }
    }
  }
}
