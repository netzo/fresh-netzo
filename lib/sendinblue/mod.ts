import type { INetzoOptions } from "../../types.ts";
import type { ClientBuilder } from '../../_utils/http/mod.ts';
import { createClient } from '../../_utils/http/mod.ts';
// FIXME: pass in type like so .get<Note[]>() and .get<Note>(), breaking tests
import type { Paginated, Company, Deal, Task, Note, Conversation, File } from './types.ts';

export const sendinblue = (options: INetzoOptions) => {
  const baseURL = 'https://api.sendinblue.com/v3'
  const client = createClient({
    baseURL,
    headers: { 'api-key': options.apiKey }
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
    companies: createClientResource<Company>(client, 'companies'),
    deals: createClientResource<Deal>(client, 'deals'),
    tasks: {
      find: (): Promise<Paginated<Task[]>> => client['crm']['tasks'].get(),
      get: (_id: string): Promise<Task> => client['crm']['tasks'][_id].get(),
      post: (data: Task): Promise<Task> => client['crm']['tasks'].post(data),
      put: (_id: string, data: Task): Promise<Task> => client['crm']['tasks'][_id].put(data),
      patch: (_id: string, data: Partial<Task>): Promise<Task> => client['crm']['tasks'][_id].patch(data),
    },
    notes: createClientResource<Note>(client, 'notes'),
    files: createClientResource<File>(client, 'files'),
    conversations: {
      get: (_id: string): Promise<Conversation> => client['conversations'][_id].get(),
      post: (data: Conversation): Promise<Conversation> => client['conversations'].post(data),
      put: (_id: string, data: Conversation): Promise<Conversation> => client['conversations'][_id].put(data),
      patch: (_id: string, data: Partial<Conversation>): Promise<Conversation> => client['conversations'][_id].patch(data),
    }
  } as const
}