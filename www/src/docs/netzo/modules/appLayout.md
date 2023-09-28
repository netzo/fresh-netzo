<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/modules/appLayout.svg" alt="netzo/modules/appLayout" class="mb-5 w-75px">

# `appLayout`

Adds a global layout route from which all other routes inherit from.

- **labels:** `middleware`, `auth`, `netzo`

## Usage

Register the plugin in `netzo.config.ts` and ensure `main.ts` and `dev.ts` are receive the `config` object as shown below.

::: code-group
```ts [netzo.config.ts]
import { defineNetzoConfig } from 'netzo/config.ts'
import { appLayout } from 'netzo/modules/appLayout/mod.ts'

export default defineNetzoConfig({
  fresh: {
    plugins: [appLayout()]
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
interface AppLayoutOptions {
  title?: string
  description?: string
  favicon?: string
}
```
