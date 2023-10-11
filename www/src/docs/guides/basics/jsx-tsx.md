# JSX/TSX

[JSX](https://reactjs.org/docs/introducing-jsx) is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. It is commonly used in libraries and frameworks such as React for building user interfaces. Netzo supports JSX (and TSX) out of the box without the need for an additional transformation step.

Netzo will set up the JSX/TSX transformation for you automatically for all deployments to the following:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxFactory": "h",
    "jsxFragmentFactory": "Fragment",
    "jsxImportSource": "preact"
  }
}
```

This avoids having to set it up manually by adding the `/** @jsx h */` comment and an import of the `h` function in every file.

::: tip Requirements to use JSX/TSX
- **Make sure the file extension is `.tsx` or `.jsx`**. This is required for Deno to recognize the file as a file that contains JSX/TSX.
- **Make sure to register `"preact"`** in the `"imports"` field of `deno.json(c)` or in the `importMap`.

Refer to the [Deno](https://deno.land/manual@v1.27.1/jsx_dom/jsx) or [Deno Deploy](https://deno.com/deploy/docs/using-jsx) documentation for more information.
:::

::: info Custom `compilerOptions` for JSX/TSX is not yet supported
In the future, you will be able to set up JSX/TSX transformation once in the `compilerOptions` of `deno.json` file, or manually by adding a `/** @jsx h */` comment and an import of the `h` function in every file. For now, Netzo will set up JSX/TSX with sensible defaults for you.
:::

The following basic examples demonstrate common use cases of working with JSX/TSX.

## Server side rendering with JSX

A HTTP server that renders a HTML page on the server with JSX (using `preact`).

`CLI` `Netzo`

::: code-group
```tsx [main.tsx]
import { renderToString } from 'https://esm.sh/*preact-render-to-string@6.2.1?deps=preact@10.18.11'

function handler(_req: Request): Response {
  const page = (
    <div>
      <h1>Current time</h1>
      <p>{new Date().toLocaleString()}</p>
    </div>
  )
  const html = renderToString(page)
  return new Response(html, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  })
}

Deno.serve(handler)
```
:::
