<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/plugins/errorPages.svg" alt="netzo/plugins/errorPages" class="mb-5 w-75px">

# `errorPages`

Adds routes to render a custom error page for `404: Not Found` and `500: Server Error`.

- **labels:** `routes`, `error`, `netzo`

## Usage

Register the plugin in `netzo.config.ts` and ensure `main.ts` and `dev.ts` are receive the `config` object as shown below.

Note that the [`unocss`](/docs/netzo/plugins/unocss) plugin must be registered as well for styles to work.

::: code-group
```ts [netzo.config.ts]
import { defineNetzoConfig } from 'netzo/config.ts'
import { errorPages } from 'netzo/plugins/errorPages/mod.ts'
import { unocss } from 'netzo/plugins/unocss/mod.ts'

export default defineNetzoConfig({
  fresh: {
    plugins: [errorPages(), unocss()]
  }
})
```
<<< src/main.ts
<<< src/dev.ts
:::

::: warning Fresh configuration [must](https://fresh.deno.dev/docs/concepts/ahead-of-time-builds#migrating-existing-projects-with-plugins) be defined in `netzo.config.ts`.
:::

## Configuration

```ts
interface ErrorPagesOptions {
  404?: boolean
  500?: boolean
}
```
