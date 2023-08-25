# HTML

The following basic examples demonstrate common use cases of working with HTML.

## Handling `<form>` submissions

A HTTP server that serves a HTML `<form>` and handles the form submission via a `POST` request.

`CLI` `Netzo`

::: code-group
```ts [main.ts]
const html = `
<form method="POST" action="/">
  <input type="text" name="name" placeholder="Your name">
  <button type="submit">Submit</button>
</form>
`

async function handler(req: Request): Promise<Response> {
  switch (req.method) {
    case 'GET': {
      return new Response(html, {
        headers: { 'content-type': 'text/html; charset=utf-8' },
      })
    }

    case 'POST': {
      const body = await req.formData()
      const name = body.get('name') || 'anonymous'
      return new Response(`Hello ${name}!`)
    }

    default:
      return new Response('Invalid method', { status: 405 })
  }
}

Deno.serve(handler)
```
:::
