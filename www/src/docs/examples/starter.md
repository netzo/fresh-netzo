# Starter

The previous [`minimal`](/docs/examples/minimal) example but with additional (optional) files recommended for going from prototype to production.

## 📄 `main.tsx`

The `main.tsx` file is the entrypoint of your project. It is the only file that is required to be present and the one that actually gets executed (e.g. `deno run -A --unstable main.tsx`). The project's module graph will be built dynamically from this file and all its dependencies.

Note that we can import directly from `sift/` since we have registered it as a dependency in the `"imports"` field of the [`deno.json(c)`](#⚙%EF%B8%8F-deno-json-c) file.

```tsx
import { json, jsx, serve } from 'sift/mod.ts'

function App() {
  return <div>
    <h1>Hello World!</h1>
  </div>
}

function NotFound() {
  return <div>
    <h1>Page not found</h1>
  </div>
}

serve({
  '/': () => jsx(<App />), // server-side render a page using JSX/TSX
  '/api': () => json({ message: 'Hello World!' }), // return JSON
  '404': () => jsx(<NotFound />, { status: 404 }), // return a 404 page
})
```

## ⚙️ `deno.json(c)`

::: warning `deno.json(c)` support coming soon for deployments
While the `deno.jsonc` or `deno.json` file can be used for local development, it is not yet used for deployments to Netzo. For example, you can set the `"importMap"` field for local development, but you have to do this in the UI as well for remote deployments.
:::

A `deno.jsonc` or `deno.json`  file used to configure the Deno runtime for local development and deployments (soon). It is a good practice to include a `deno.json(c)` file at the root of the project. See the Deno Manual for more information on the [Deno Configuration File](https://deno.land/manual/getting_started/configuration).

```json
{
  "imports": {
    "@/": "./",
    "netzo/": "https://deno.land/x/netzo@v0.2.40/",
    "preact": "https://esm.sh/preact@10.17.1",
    "preact/": "https://esm.sh/preact@10.17.1/"
  }
}
```

## 📑 `readme.md`

The `readme.md` is used to provide general information about a project like title, description, documentation and references. It is a good practice to include a `readme.md` file at the root of the project.

The structure of this file is up to you. Here is sample template:

```md
# Project Title

Simple overview of use/purpose.

## Description

An in-depth paragraph about your project and overview of use.

## References

- [Reference 1](https://example.com)
```
