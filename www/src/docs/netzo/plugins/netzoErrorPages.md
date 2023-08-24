<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/plugins/netzoErrorPages.svg" alt="netzo/plugins/netzoErrorPages" class="mb-5 w-75px">

# `netzoErrorPages`

Adds routes to render a custom error page for `404: Not Found` and `500: Server Error`.

- **labels:** `routes`, `error`, `netzo`

## Usage

::: warning Requires the [`unocss`](/docs/netzo/plugins/unocss) plugin to be registered as well.
:::

```ts
import { netzoErrorPages } from 'netzo/plugins/netzoErrorPages/mod.ts'

await start(manifest, {
  plugins: [netzoErrorPages()]
})
```

## Configuration

```ts
interface NetzoErrorPagesOptions {
  404?: boolean
  500?: boolean
}
```
