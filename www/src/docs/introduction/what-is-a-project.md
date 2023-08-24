# What is a Project?

**[Projects](/docs/platform/projects) are serverless applications deployed to Web URLs.** Projects in Netzo are programmed using [Deno](https://deno.com/), a simple, modern and secure runtime for JavaScript and TypeScript. In essence, a project consist of collections of static files that are automatically hosted by netzo. Each Project is deployed to its own unique URL and ran globally at the network edge when an HTTP Request is made to its URL. The `netzo` module can be used within projects to make coding projects even simpler.

The following illustrates what can be achieved in just a few lines of TSX code:

![Projects](/docs/images/introduction/workers-explained.webp)

## Project Deployment URLs

A project can be executed by sending an HTTP request to any of:

- **Production URL:** `https://{uid}.deno.dev`
- **Preview URL:** `https://{uid}-{deploymentId}.deno.dev`

## Common Files

Although the only requirement for a project is a `main.tsx` file, some other common files include:

### Entrypoint
  - this `entrypoint` file is the only file that is required to be present in your project
  - it is a common practice to name the entrypoint file `main.(ts|tsx|js|jsx)`
  - make sure to select this file as `entrypoint` in the project configuration

### Deno Configuration File
  - this file is optional but recommended
  - the filename must be `deno.json(c)` and be at the root of the project
  - the file must be a valid [Deno configuration file](https://deno.land/manual/getting_started/configuration_file)

### README
  - this file is optional but will be shown in the project overview page if present
  - the filename must be `readme.md` or `README.md` and be at the root of the project
  - the file must be written in [Markdown](https://www.markdownguide.org/cheat-sheet/) syntax

## Frameworks

If you are building a more complex application, you might want to use a web framework. Netzo supports multiple Deno and Node.js web frameworks that make building applications even easier.

Node.js native frameworks are frameworks that are built for Node.js, but can also be used in Deno. These include popular web frameworks such as [Express](https://expressjs.com/) and [Koa](https://koajs.com/), which usually have a Deno equivalent (e.g. [Oak](https://oakserver.github.io/oak/) instead of [Koa](https://koajs.com/)).

**We recommend using the following Deno native frameworks when building projects in Netzo.**

### Fresh

> Recommended for the frontend, e.g. to create a dashboard, web app or webpage

[Fresh](https://freshie.now.sh/) is the most popular web framework for Deno. It is a lightweight framework that is easy to use and has a very small learning curve. **It is the framework we recommend for most projects in Netzo.** Fresh is based on [Preact](https://preactjs.com/), but you can also import and reuse compatible [React](https://react.dev/) components and libraries via services like [esm.sh](https://esm.sh).

Fresh is an opinionated and lightweight framework purposely built for the serverless edge that is easy to use and has a very small learning curve. Netzo builds on top of Fresh to make building projects even easier by providing `netzo`, a module exporting tools and utilities that make building projects even easier.

Fresh provides the following features out of the box:

- **layouts**: use layouts via the `routes/_app.tsx` file
- **routing**: file-based routing via the `routes/` directory
- **static files**: serve static files via the `static/` directory
- **middleware**: use middleware via `routes/**/_middleware.tsx` files
- **backend handlers**: colocate backend handlers alongside frontend routes

### Hono

> Recommended for the backend, e.g. to create (REST) APIs

[Hono](https://hono.dev/) is a small, simple, and ultrafast web application framework similar to Express, without a frontend. It works on any JavaScript runtime and uses Deno's native HTTP server . It is specifically built to run on CDN Edges and allows you to construct larger applications when combined with middleware.

Hono provides the following features out of the box:

- **middleware**: use middleware via `app.use()`
- **routing**: use routing via `app.use()`, `app.get()`, `app.post()`, etc.
- **helpers**: built-in utilities for common tasks
