# Routing

Netzo provides a routing module that allows you to specify how requests are handled by your application.

### Routing Syntax

The routing syntax allows for specifying:

- Simple routes such as `/home`
- Path parameters such as `"blog/:slug"` which are made available as the third argument of the handler function
- Capturing all routes using the wildcard `"*"`

Additionally, one can specify a custom `404` handler for requests that don't match any routes, this will override the default "Not found" handler.

:::tip Order of Routes
It is important to note that when utilizing the serve function, routes are processed in a sequential manner and only one function will be executed per request.
:::

### Route Handlers

Route handlers are functions that are called when a request is made to a particular route. These functions are responsible for processing the request and generating a response. They are defined in the form of `Request => Response` or `Request => Promise<Response>`.

When using the `Deno.serve` function, at least one handler is required to handle incoming requests. Handlers receive a `Request` object as the first argument and a `ServeHandlerInfo` object as a second argument. The handler must return a `Response` object, or a Promise resolving to a `Response` object:

```ts
(request: Request, info: Deno.ServeHandlerInfo) => Response | Promise<Response>
```

### Examples

Here is an example of a simple router using `sift`:

```ts
import { serve, jsx, json, serveStatic } from 'https://deno.land/x/sift@0.6.0/mod.ts'

serve({
  '/': () => new Response ('Hello World!'),
  '/ui': ()  => jsx(<App />),
  '/api': () => json({ message: 'Hello World!' }, { status: 200 }),
  '/public': serveStatic('public/index.html', { baseURL: import.meta.url }),
})
```

The `serve` function takes an object with key-value pairs where the key is the URL path and the value is a callback function that will be executed when a request is made to that path.

The code above shows how to handle 3 different routes:

- The root URL `"/"`: when a client makes a request to this route, the server will respond with "Hello World!" as plain text.
- The UI endpoint `"/ui"`: when a client makes a request to this route, the server will serve a JSX App.
- The API endpoint `"/api"`: when a client makes a request to this route, the server will respond with a JSON object `{ message: "Hello World!"}` and a status code of 200.
- The `"/public"` endpoint:  when a client makes a request to this route, the server will serve the public/index.html file as the response.

In addition, the code also imports the json and serveStatic functions from the `https://deno.land/x/sift@0.6.0/mod.ts` module that are used to send json responses and serve static files respectively.

