<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/plugins/netzoDenoKV.svg" alt="netzo/ui/plugins/netzoDenoKV" class="mb-5 w-75px">

# `netzoDenoKV` (soon)

Adds routes to serve a REST API for the [Deno KV](https://deno.com/deploy/docs/storage) database of the project.

- **labels:** `routes`, `database`, `netzo`

## Usage

```ts
import { netzoDenoKV } from 'netzo/ui/plugins/netzoDenoKV/mod.ts'

await start(manifest, {
  plugins: [netzoDenoKV()]
})
```

## Configuration

```ts
interface NetzoDenoKVOptions {}
```
