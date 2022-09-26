import type { INetzoOptions } from "../../types.ts";
import type { ClientBuilder } from '../../_utils/http/mod.ts';
import { createClient } from '../../_utils/http/mod.ts';
// FIXME: pass in type like so .get<Post[]>() and .get<Post>(), breaking tests
import type { Album, Comment, Photo, Post, User, Todo } from './types.ts';

export const jsonplaceholder = (_options: INetzoOptions) => {
  const baseURL = 'https://jsonplaceholder.typicode.com'
  const client = createClient({ baseURL })

  const createClientResource = <T>(client: ClientBuilder, resource: string) => {
    return {
      find: (): Promise<T[]> => client[resource].get(),
      get: (_id: number): Promise<T> => client[resource][_id].get(),
      post: (data: T): Promise<T> => client[resource].post(data),
      put: (_id: number, data: T): Promise<T> => client[resource][_id].put(data),
      patch: (_id: number, data: Partial<T>): Promise<T> => client[resource][_id].patch(data),
    }
  }

  return {
    albums: createClientResource<Album>(client, 'albums'),
    comments: createClientResource<Comment>(client, 'comments'),
    photos: createClientResource<Photo>(client, 'photos'),
    posts: createClientResource<Post>(client, 'posts'),
    todos: createClientResource<Todo>(client, 'todos'),
    users: createClientResource<User>(client, 'users')
  } as const
}