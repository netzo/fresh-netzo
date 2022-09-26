import { config } from "https://deno.land/x/dotenv/mod.ts";
import { assertEquals } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { Netzo } from '../../mod.ts'

const netzo = Netzo({ apiKey: config().API_KEY })

Deno.test('jsonplaceholder.albums', async () => {
  const [albums, album] = await Promise.all([
    netzo.jsonplaceholder.albums.find(),
    netzo.jsonplaceholder.albums.get(1)
  ])
  assertEquals(albums.length, 100)
  assertEquals(album.id, 1)
})

Deno.test('jsonplaceholder.comments', async () => {
  const [comments, comment] = await Promise.all([
    netzo.jsonplaceholder.comments.find(),
    netzo.jsonplaceholder.comments.get(1)
  ])
  assertEquals(comments.length, 500)
  assertEquals(comment.id, 1)
})

Deno.test('jsonplaceholder.photos', async () => {
  const [photos, photo] = await Promise.all([
    netzo.jsonplaceholder.photos.find(),
    netzo.jsonplaceholder.photos.get(1)
  ])
  assertEquals(photos.length, 5000)
  assertEquals(photo.id, 1)
})

Deno.test('jsonplaceholder.posts', async () => {
  const [posts, post] = await Promise.all([
    netzo.jsonplaceholder.posts.find(),
    netzo.jsonplaceholder.posts.get(1)
  ])
  assertEquals(posts.length, 100)
  assertEquals(post.id, 1)
})

Deno.test('jsonplaceholder.todos', async () => {
  const [todos, todo] = await Promise.all([
    netzo.jsonplaceholder.todos.find(),
    netzo.jsonplaceholder.todos.get(1)
  ])
  assertEquals(todos.length, 200)
  assertEquals(todo.id, 1)
})

Deno.test('jsonplaceholder.users', async () => {
  const [users, user] = await Promise.all([
    netzo.jsonplaceholder.users.find(),
    netzo.jsonplaceholder.users.get(1)
  ])
  assertEquals(users.length, 10)
  assertEquals(user.id, 1)
})
