# Import/Export

Netzo supports importing modules directly from URLs. This is done by using the `import` keyword and specifying the URL of the imported file.

- `import` to bring stuff from other modules
- `export` to expose stuff for importing in other modules

## Importing Code

::: warning Pinning module versions
The following examples omit the version specifier. This is not recommended for production use. You should always pin the version of the module you are importing to avoid breaking changes.
:::

### Deno modules

[deno.land](https://deno.land) is the official Deno module registry. You can import standard library modules directly from `https://deno.land/std` and third-party modules from `https://deno.land/x`.

`CLI` `Netzo`

```ts
import { serve } from 'https://deno.land/std/http/server.ts'
import { netzo } from 'https://deno.land/x/netzo/apis/netzo/mod.ts'
```

### Node.js modules

Deno supports importing bulit-in Node.js modules via the `node:` specifier syntax.

`CLI` `Netzo`

```ts
import process from 'node:process'
import { createServer } from 'node:http'
```

### NPM packages

Deno supports importing [NPM](https://www.npmjs.com) packages via the `npm:` specifier syntax (since version 1.28).

`CLI`

```ts
import chalk from 'npm:chalk' // ❌ works only locally (Deno CLI)
```

You can also use a CDN service like [esm.sh](https://esm.sh), [jspm.io](https://jspm.io) and [skypack.dev](https://skypack.dev) to import npm packages which is already supported in Netzo.

`CLI` `Netzo`

```ts
import chalk from 'https://esm.sh/chalk' // ✅ works also in Netzo
```

## Importing JSON

Deno supports importing JSON files as a native feature. This is done by using the `assert` keyword and specifying the type of the imported file.

```ts
import data from './data.json' assert { type: 'json' }
```
