# HTTP

The following basic examples demonstrate common use cases for simple HTTP servers.

## Respond with text

An HTTP server using the `std/http` module that responds with "Hello World!" string.

`CLI` `Netzo`

::: code-group
```ts [main.ts]
function handler(_req: Request): Response {
  return new Response('Hello World!')
}

Deno.serve(handler)
```
:::

::: warning Deprecated Server APIs
The Service Worker API using `fetch` event and `respondWith` method
```ts
addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(new Response('Hello World!'))
})
```
as well as the `serve()` function from the standard library `std/http`
```ts
import { serve } from 'https://deno.land/std/http/server.ts'
serve((request: Request) => new Response('Hello World!'))
```
have been deprecated in favor of the built-in `Deno.serve()` API.
```ts
Deno.serve((request: Request) => new Response('Hello World!'))
```
:::

## Respond with JSON

An HTTP server using the `std/http` module that responds to requests with JSON.

`CLI` `Netzo`

::: code-group
```ts [main.ts]
function handler(_req: Request): Response {
  const data = { message: 'Hello World!' }
  const body = JSON.stringify(data, null, 2)
  return new Response(body, {
    headers: { 'content-type': 'application/json' },
  })
}

Deno.serve(handler)
```
:::

::: tip Using the `Response.json(body)` short-hand
Instead of manually building and returing a `Response` object, the `return Response.json(body)` short-hand can be used to respond directly with JSON. This will automatically stringify the body and set the `content-type` header to `application/json`.

```ts
function handler(_req: Request): Response {
  const data = { message: 'Hello World!' }
  const body = JSON.stringify(data, null, 2) // [!code --]
  return new Response(body, { // [!code --]
    headers: { 'content-type': 'application/json' }, // [!code --]
  }) // [!code --]
  return Response.json(data) // [!code ++]
}
```
:::

## Get client IP address

An HTTP server that responds to requests with the client's IP address.

`CLI` `Netzo`

::: code-group
```ts [main.ts]
function handler(req: Request, info: Deno.ServeHandlerInfo): Response {
  const addr = connInfo.remoteAddr as Deno.NetAddr
  const ip = addr.hostname
  return new Response(`Your IP address is <b>${ip}</b>`, {
    headers: { 'content-type': 'text/html' },
  })
}

Deno.serve(handler)
```
:::

## Proxying to other servers

An HTTP server that proxies requests to a different server.

`CLI` `Netzo`

::: code-group
```ts [main.ts]
async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url)
  url.protocol = 'https:'
  url.hostname = 'example.com'
  url.port = '443'
  return await fetch(url.href, {
    headers: req.headers,
    method: req.method,
    body: req.body,
  })
}

Deno.serve(handler)
```
:::

## Wildcard Domain

An HTTP server that serves a wildcard domain.

`CLI` `Netzo`

::: code-group
```ts [main.ts]
function handler(req: Request): Response {
  const url = new URL(req.url)
  switch (url.hostname) {
    case 'en.example.com':
      return new Response('english')
    case 'es.example.com':
      return new Response('español')
    default:
      return new Response('default')
  }
}

Deno.serve(handler)
```
:::
