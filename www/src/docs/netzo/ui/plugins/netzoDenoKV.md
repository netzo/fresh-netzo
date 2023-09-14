<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/plugins/netzoDenoKV.svg" alt="netzo/ui/plugins/netzoDenoKV" class="mb-5 w-75px">

# `netzoDenoKV` (soon)

Adds routes to serve a flexible RESTful API for the [Deno KV](https://deno.com/deploy/docs/storage) datastore of the project. This API makes it possible to connect other applications to your KV store in any environment that can make HTTP requests.

- **labels:** `routes`, `database`, `netzo`

## Usage

### Fresh

Register the plugin in `fresh.config.ts` and ensure `main.ts` and `dev.ts` are receive the `config` object as shown below.

::: code-group
```ts [fresh.config.ts]
import { netzoDenoKV } from 'netzo/ui/plugins/netzoDenoKV/mod.ts'

await start(manifest, {
  plugins: [netzoDenoKV()]
})
```
<<< src/main.ts
<<< src/dev.ts
:::

::: warning Fresh configuration [must](https://fresh.deno.dev/docs/concepts/ahead-of-time-builds#migrating-existing-projects-with-plugins) be defined in `fresh.config.ts`.
:::

### Hono

Coming soon.

## Configuration

```ts
interface NetzoDenoKVOptions {}
```

## References

- [Deno KV](https://deno.com/kv)

