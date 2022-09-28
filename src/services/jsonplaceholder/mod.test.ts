import { config } from "https://deno.land/x/dotenv/mod.ts";
import { assertEquals, assertExists } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { Netzo } from '../../../mod.ts'

const { API_KEY } = config()

const netzo = Netzo({ apiKey: API_KEY })

const jsonplaceholder = netzo.services.jsonplaceholder()

Deno.test('jsonplaceholder', () => {
  assertExists(netzo)
  assertExists(netzo.services.jsonplaceholder)
  assertExists(jsonplaceholder)
})

Deno.test('jsonplaceholder.albums', async () => {
  const albums = await jsonplaceholder.albums.get()
  assertEquals(Array.isArray(albums), true)

  if (albums.length) {
    const album = await jsonplaceholder.albums[albums[0].id].get()
    assertEquals(album.id, albums[0].id)
  }
})

Deno.test('jsonplaceholder.comments', async () => {
  const comments = await jsonplaceholder.comments.get()
  assertEquals(Array.isArray(comments), true)

  if (comments.length) {
    const comment = await jsonplaceholder.comments[comments[0].id].get()
    assertEquals(comment.id, comments[0].id)
  }
})

Deno.test('jsonplaceholder.photos', async () => {
  const photos = await jsonplaceholder.photos.get()
  assertEquals(Array.isArray(photos), true)

  if (photos.length) {
    const photo = await jsonplaceholder.photos[photos[0].id].get()
    assertEquals(photo.id, photos[0].id)
  }
})

Deno.test('jsonplaceholder.posts', async () => {
  const posts = await jsonplaceholder.posts.get()
  assertEquals(Array.isArray(posts), true)

  if (posts.length) {
    const post = await jsonplaceholder.posts[posts[0].id].get()
    assertEquals(post.id, posts[0].id)
  }
})

Deno.test('jsonplaceholder.todos', async () => {
  const todos = await jsonplaceholder.todos.get()
  assertEquals(Array.isArray(todos), true)

  if (todos.length) {
    const todo = await jsonplaceholder.todos[todos[0].id].get()
    assertEquals(todo.id, todos[0].id)
  }
})

Deno.test('jsonplaceholder.users', async () => {
  const users = await jsonplaceholder.users.get()
  assertEquals(Array.isArray(users), true)

  if (users.length) {
    const user = await jsonplaceholder.users[users[0].id].get()
    assertEquals(user.id, users[0].id)
  }
})