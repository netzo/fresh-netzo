import { assertEquals } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import {
  getAlbums,
  getAlbum,
  getComments,
  getComment,
  getPhotos,
  getPhoto,
  getPosts,
  getPost,
  getTodos,
  getTodo,
  getUsers,
  getUser
} from './mod.ts'

Deno.test('jsonplaceholder.getAlbums', async () => {
  const [albums, album] = await Promise.all([getAlbums(), getAlbum(1)])
  assertEquals(albums.length, 100)
  assertEquals(album.id, 1)
})

Deno.test('jsonplaceholder.getComments', async () => {
  const [comments, comment] = await Promise.all([getComments(), getComment(1)])
  assertEquals(comments.length, 500)
  assertEquals(comment.id, 1)
})

Deno.test('jsonplaceholder.getPhotos', async () => {
  const [photos, photo] = await Promise.all([getPhotos(), getPhoto(1)])
  assertEquals(photos.length, 5000)
  assertEquals(photo.id, 1)
})

Deno.test('jsonplaceholder.getPosts', async () => {
  const [posts, post] = await Promise.all([getPosts(), getPost(1)])
  assertEquals(posts.length, 100)
  assertEquals(post.id, 1)
})

Deno.test('jsonplaceholder.getTodos', async () => {
  const [todos, todo] = await Promise.all([getTodos(), getTodo(1)])
  assertEquals(todos.length, 200)
  assertEquals(todo.id, 1)
})

Deno.test('jsonplaceholder.getUsers', async () => {
  const [users, user] = await Promise.all([getUsers(), getUser(1)])
  assertEquals(users.length, 10)
  assertEquals(user.id, 1)
})
