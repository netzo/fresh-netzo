# Projects

**Projects are serverless applications deployed to Web URLs.** Projects in Netzo are programmed using [Deno](https://deno.com/), a simple, modern and secure runtime for JavaScript and TypeScript. In essence, a project consist of collections of static files that are automatically hosted by netzo. Each Project is deployed to its own unique URL and ran globally at the network edge when an HTTP Request is made to its URL. The `netzo` module can be used within projects to make coding projects even simpler.

![Projects](/docs/images/projects/projects-overview.webp)

::: tip Listen to HTTP requests
Note that to make a project invokable at its edge URL, its entrypoint must register an HTTP server to listen to and respond to incoming HTTP requests. Otherwise, a project can still be used as a [module](#modules) to export code meant to be imported imported by other projects via their URL.
:::

## Creating Projects

1. Head over to the Projects page within a Workspace and click the Create button.

2. Give a unique name for the project and select a starting template. We'll select the basic TypeScript example for now.

3. Add the necessary environment variables in the drawer to the right.

## Project URLs

Projects can be invoked via HTTP requests to any of:

- **Production URL:** `https://{uid}.deno.dev`
- **Preview URL:** `https://{uid}-{deploymentId}.deno.dev`

::: warning Project UID
The project `uid` MUST be globally unique, between 3-42 characters and contain only lowercase letters `a-z`, numbers `1-9` and hyphens `-`. You can change it in Project > Settings > General.
:::

### CORS Headers

To be able to invoke a Project from the browser, you'll need to enable CORS. By default, CORS headers will be set to `*` unless you specify otherwise in the `Response` headers.

| **Header** | **Description** | **Default** |
|---|---|:-:|
| `access-control-allow-origin` | a space-separated list of origins allowed to access the resource | `*` |
| `access-control-allow-methods` | a comma-separated list of HTTP methods allowed to access the resource | `*` |
| `access-control-allow-headers` | a comma-separated list of HTTP headers allowed to access the resource | `*` |

::: warning
If overwriting the default of `*` for `access-control-allow-origin`, include `"https://app.netzo.io"` as allowed origin to be able to invoke the project from within Netzo, otherwise the request will be blocked by the browser automatically due to CORS.
:::

For example, to allow all origins, methods and headers for the Project:

```typescript
Deno.serve((req: Request): Response => new Response("Hello World!"));
```

To allow only a specific origin, method or header you can overwrite the defaults of `*` individually or all at once as follows:

```typescript
Deno.serve((req: Request): Response => new Response("Hello World!", {
  headers: {
    "access-control-allow-origin": "https://app.netzo.io",
    "access-control-allow-methods": "GET, POST",
    "access-control-allow-headers": "x-foo, x-bar"
  }
}));
```

## Modules

**Modules are reusable code bundles distributed via URLs.** Netzo makes it easy to author and deploy Modules on the click of a button. Modules can be `private` or `public`, in which case they can be imported by third-party scripts (without authentication).

- `import` allows you to include and use local or remote modules in your code.
- `export` allows you to expose code to be imported by other modules.

::: warning Module resolution
Deno adopts browser-like module resolution, meaning that file names must be specified in full. File extensions are are used to serve file contents with the appropriate `Content-Type` header. If no `Content-Type` header is present, it will be resolved based on its extension. For example, a file named `foo.ts` will be served with `Content-Type: application/typescript`.
:::

::: warning No special treatment for `index.(ts|js)`
Deno encourages using `mod.(ts|js)` as the module entry point, as there is no special handling for `index.(ts|js)` paths. This is to avoid the common practice of importing files by ommiting the `index.(ts|js)` filename (common in Node.js), which goes against web URL semantics.
:::

<!--
### Exports

All exports in a file (code exposed using `export` keyword) will be made available for others to import (using `import` keyword) under a URL with a common structure.

### Imports

There are two types of exports, and thus, two types of imports.

1. **Default:** allow exporting and importing an entire module
2. **Named:** allow exporting and importing single components within a module

Similarly, there are two ways of importing these default and/or named exports.

1. **Static imports:** allow exporting and importing modules at load time
2. **Dynamic imports:** allow exporting and importing modules at run time (soon)

#### Static Imports

The standard import syntax is static and will always result in all code in the imported module being evaluated at load time.

```typescript
// for default exports (with an alias)
import someModule from 'https://...'
someModule.someFunction()

// for named exports (any optionally with an alias)
import { someFunction, someOtherFunction as myFunction } from 'https://...'
someFunction()
myFunction()

// importing all named exports into a single object (with an alias)
import * as namedExports from 'https://...'
namedExports.someFunction()
```

  #### Dynamic Imports (soon)

In situations where you wish to load a module conditionally or on demand, you can use a dynamic import instead.

```typescript
// for default exports (with an alias, required since default is reserved keyword)
const { default: someModule } = await import('https://...')
someModule.someFunction()

// for named exports (any optionally with an alias)
const { someFunction, someOtherFunction: myFunction } = await import('https://...')
someFunction()
myFunction()
```

::: tip The above makes use of [ES destructuring assignment syntax](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), used to unpack values from arrays, or properties from objects into distinct variables, in this case from the dynamically imported module.
::: -->

#### Import Maps

Import maps allows control over what URLs get fetched by `import` statements and `import()` expressions. They can be thought of as shortcuts to map short and memorable aliases to (longer) import URLs. There are 2 ways of declaring an import map:

1. Set inline in the `"imports"` property of `deno.json(c)` (**recommended**)

::: code-group

```json [config.json]
{
  "imports": {
    "@/": "./",
    "netzo/": "https://deno.land/x/netzo/"
  }
}
```

:::

2. Set the URL of an `import_map.json` to the `"importMap"` property of `deno.json(c)`

::: code-group

```json [config.json]
{
  "importMap": "./import_map.json"
}
```

```json [import_map.json]
{
  "imports": {
    "@/": "./",
    "netzo/": "https://deno.land/x/netzo/"
  }
}
```

:::

### Hosting

Netzo will automatically host all your modules under `https://api.netzo.io/deployments/{id}/{...path}` with `path` being a valid file path including etension (e.g. `components/Table.tsx`). Files will be served with their corresponding `Content-Type` header by Netzo, for example `text/html` for `.html` files.

::: tip Module best practices
For simpler modules it is recommended to have a single `mod.(ts|js)` file at the module entry point. When modularizing a larger module, it adviced to keep the `mod.(ts|js)` entry point as lean as possible (using only `import`/`export` statements), keeping business logic in other files.
:::

### Publishing

Modules can also be published to the Deno ecosystem via the official [https://deno.land/x](https://deno.land/x) hosting service. It caches releases of open source modules and serves them at one easy to remember domain. Navigate to [their official docs](https://deno.land/manual@v1.20.4/publishing) to learn more.

<!-- ### Versioning

Netzo uses [SemVer](https://semver.org/) syntax to version module deployments. In this way, any previous deployment made in Netzo is hosted forever under the same URL, preventing programs which depend on it from breaking when the module is updated.

We recommend starting your package version at 1.0.0 and incrementing as follows:

|Code status|Stage|Rule|Example version|
|--- |--- |--- |--- |
|First release|New product|Start with 1.0.0|1.0.0|
|Backward compatible bug fixes|Patch release|Increment the third digit|1.0.1|
|Backward compatible new features|Minor release|Increment the middle digit and reset last digit to zero|1.1.0|
|Changes that break backward compatibility|Major release|Increment the first digit and reset middle and last digits to zero|2.0.0| -->

## Runtime Environment

### Runtime APIs

The following Web and Deno APIs are supported on the runtime.

<!-- see https://developers.cloudflare.com/projects/runtime-apis/ -->
- addEventListener
- Cache
- Durable Objects
- Encoding
- Fetch
- FetchEvent
- Headers
- HTMLRewriter
- KV
- Request
- Response
- ScheduledEvent
- Streams
- Web Crypto
- Web standards
- WebSockets
- eval()
- new Function()

::: info
To learn more, you can always head over to the Deno [documentation](https://deno.com/deploy/docs)
:::


### (Virtual) Filesystem

Projects have access to a **read-only virtual filesystem** that is scoped to the Project's files and mounted at `file:///src/`. Reading outside of the project root is not allowed.

Netzo supports a limited set of the file system APIs available in Deno. These file system APIs can access static files from your deployments.

The APIs that are available are:

- `Deno.cwd` returns the current working directory of your deployment.
- `Deno.readDir` allows listing the contents of a directory.
- `Deno.readFile` allows reading a file into memory.
- `Deno.readTextFile` allows reading a file into memory (decoded as UTF-8 string).
- `Deno.open` allows opening a file, returning a file handle
- `Deno.stat` reads a file system entry's metadata.
- `Deno.lstat` reads a file system entry's metadata (without following symlinks).
- `Deno.realPath` reads a file system entry's metadata (without following symlinks).
- `Deno.readLink` returns the target path for a symlink.

::: warning Absolute file paths must be passed as a `URL` object
On unix `"file:///..."` is treated as a relative path, therefore absolute file paths must be passed as a `URL` object `new URL("file:///...")` instead of a string `"file:///..."`.
:::

For example, a file `example.txt` at the project root can be read in multiple ways:

```typescript
await Deno.readTextFile("example.txt");
await Deno.readTextFile("./example.txt");
await Deno.readTextFile("/src/example.txt");
await Deno.readTextFile("file:///src/example.txt"); // ❌ throws error
await Deno.readTextFile(new URL("file:///src/example.txt"));
```

Refer to the [Deno documentation](https://deno.com/deploy/docs/runtime-fs) for more information.

::: tip Import Assertions for JSON modules
Note that `.json` files can be imported via import assertions with the `assert` keyword:

```typescript
import data from "./data.json" assert { type: "json" };
```

This is equivalent to reading the file and parsing it as JSON:

```typescript
const data = JSON.parse(await Deno.readTextFile("./data.json"));
```
:::

## Regions

Netzo deploys projects globally to the edge. Each new Request is served from the closest region to the client making the request. The following regions are available:

- 1. Taiwan: `asia-east1`
- 2. Hong Kong: `asia-east2`
- 3. Tokyo: `asia-northeast1`
- 4. Osaka: `asia-northeast2`
- 5. Seoul: `asia-northeast3`
- 6. Mumbai: `asia-south1`
- 7. Delhi: `asia-south2`
- 8. Singapore: `asia-southeast1`
- 9. Jakarta: `asia-southeast2`
- 10. Sydney: `australia-southeast1`
- 11. Melbourne: `australia-southeast2`
- 12. Warsaw: `europe-central2`
- 13. Finland: `europe-north1`
- 14. Belgium: `europe-west1`
- 15. London: `europe-west2`
- 16. Frankfurt: `europe-west3`
- 17. Netherlands: `europe-west4`
- 18. Zurich: `europe-west6`
- 19. Milan: `europe-west8`
- 20. Paris: `europe-west9`
- 21. Tel Aviv: `me-west1`
- 22. Madrid: `europe-southwest1`
- 23. Montréal: `northamerica-northeast1`
- 24. Toronto: `northamerica-northeast2`
- 25. São Paulo: `southamerica-east1`
- 26. Chile: `southamerica-west1`
- 27. Iowa: `us-central1`
- 28. South Carolina: `us-east1`
- 29. North Virginia: `us-east4`
- 30. Ohio: `us-east5`
- 31. Texas: `us-south1`
- 32. Oregon: `us-west1`
- 33. California: `us-west2`
- 34. Utah: `us-west3`
- 35. Nevada: `us-west4`

This list will be updated as new regions are added.
