<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/modules/errorPages.svg" alt="netzo/modules/errorPages" class="mb-5 w-75px">

# `errorPages`

Adds routes to render a custom error page for `404: Not Found` and `500: Server Error`.

- **labels:** `routes`, `error`, `netzo`

## Usage

Register the module in `netzo.config.ts` and ensure `main.ts` and `dev.ts` are receive the `config` object as shown below.

::: warning Requires the [`unocss`](/docs/netzo/modules/unocss) module to be registered as well.
:::

::: code-group
```ts [netzo.config.ts]
import { defineNetzoConfig } from 'netzo/config.ts'

export default defineNetzoConfig({
  modules: {
    errorPages: {},
    unocss: {}
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
import type { NetzoModule } from 'netzo/config.ts'

interface ErrorPagesOptions extends NetzoModule {
  404?: boolean
  500?: boolean
}
```
