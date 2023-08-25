# Core Concepts

## Workers

**[Workers](https://workers.js.org/) are the new standard for writing HTTP servers in JavaScript.** In essence, Workers are scripts that register an HTTP server to listen to HTTP Requests and respond with HTTP Responses. To do so, the script should call `Deno.listen` or equivalent (e.g. `std/serve`). Workers can be used to serve both frontends, backends and workflows.

::: tip The convention is to name the entrypoint file of a Worker `main.(ts|tsx|js|jsx)`.
:::

## Modules

**Modules are code bundles that can be imported into other projects.** Netzo hosts all project files automatically, so you can import them into other projects directly via `https://api.netzo.io/projects/{_id}/{...path}`.

::: tip The convention is to name the entrypoint file of a module `mod.(ts|tsx|js|jsx)`.
:::
