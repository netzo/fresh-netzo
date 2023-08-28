<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/plugins/netzoDenoKV.svg" alt="netzo/ui/plugins/netzoDenoKV" class="mb-5 w-75px">

# `netzoDenoKV` (soon)

Adds routes to serve a REST API for the [Deno KV](https://deno.com/deploy/docs/storage) database of the project.

- **labels:** `routes`, `database`, `netzo`

## Usage

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

## Configuration

```ts
interface NetzoDenoKVOptions {}
```
