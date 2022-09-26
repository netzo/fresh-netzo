import type { INetzoOptions } from "../../types.ts";
import type { ClientBuilder } from '../../_utils/http/mod.ts';
import { createClient } from '../../_utils/http/mod.ts';
// FIXME: pass in type like so .get<Workflow[]>() and .get<Workflow>(), breaking tests
import type { Paginated, Service, Worker, Workflow } from './types.ts';

export const netzo = (options: INetzoOptions) => {
  const baseURL = 'https://api.netzo.io'
  const client = createClient({
    baseURL,
    headers: { 'x-api-key': options.apiKey }
  })

  const createClientResource = <T>(client: ClientBuilder, resource: string) => {
    return {
      find: (): Promise<Paginated<T[]>> => client[resource].get(),
      get: (_id: string): Promise<T> => client[resource][_id].get(),
      post: (data: T): Promise<T> => client[resource].post(data),
      put: (_id: string, data: T): Promise<T> => client[resource][_id].put(data),
      patch: (_id: string, data: Partial<T>): Promise<T> => client[resource][_id].patch(data),
    }
  }

  return {
    services: createClientResource<Service>(client, 'services'),
    workers: createClientResource<Worker>(client, 'workers'),
    workflows: createClientResource<Workflow>(client, 'workflows'),
  } as const
}
