import { createClient } from '../http/mod.ts';
// FIXME: pass in type like so .get<Post[]>() and .get<Post>(), breaking tests
import type { Post, Comment, Album, Photo, User, Todo } from './types.ts';

const baseURL = 'https://jsonplaceholder.typicode.com'

export const jsonplaceholder = createClient({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

export const getPosts = async (): Promise<Post[]> => {
  const api = createClient({ baseURL })
  return await api.posts.get()
}

export const getPost = async (id: number): Promise<Post> => {
  const api = createClient({ baseURL })
  return await api.posts[id].get()
}

export const getComments = async (): Promise<Comment[]> => {
  const api = createClient({ baseURL })
  return await api.comments.get()
}

export const getComment = async (id: number): Promise<Comment> => {
  const api = createClient({ baseURL })
  return await api.comments[id].get()
}

export const getAlbums = async (): Promise<Album[]> => {
  const api = createClient({ baseURL })
  return await api.albums.get()
}

export const getAlbum = async (id: number): Promise<Album> => {
  const api = createClient({ baseURL })
  return await api.albums[id].get()
}

export const getPhotos = async (): Promise<Photo[]> => {
  const api = createClient({ baseURL })
  return await api.photos.get()
}

export const getPhoto = async (id: number): Promise<Photo> => {
  const api = createClient({ baseURL })
  return await api.photos[id].get()
}

export const getTodos = async (): Promise<Todo[]> => {
  const api = createClient({ baseURL })
  return await api.todos.get()
}

export const getTodo = async (id: number): Promise<Todo> => {
  const api = createClient({ baseURL })
  return await api.todos[id].get()
}

export const getUsers = async (): Promise<User[]> => {
  const api = createClient({ baseURL })
  return await api.users.get()
}

export const getUser = async (id: number): Promise<User> => {
  const api = createClient({ baseURL })
  return await api.users[id].get()
}

export default {
  getPosts,
  getPost,
  getComments,
  getComment,
  getAlbums,
  getAlbum,
  getPhotos,
  getPhoto,
  getTodos,
  getTodo,
  getUsers,
  getUser
}
