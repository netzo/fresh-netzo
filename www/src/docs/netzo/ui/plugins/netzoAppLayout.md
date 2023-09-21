<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/plugins/netzoAppLayout.svg" alt="netzo/ui/plugins/netzoAppLayout" class="mb-5 w-75px">

# `netzoAppLayout`

Adds a global layout route from which all other routes inherit from.

- **labels:** `middleware`, `auth`, `netzo`

## Usage

Register the plugin in `netzo.config.ts` and ensure `main.ts` and `dev.ts` are receive the `config` object as shown below.

::: code-group
```ts [netzo.config.ts]
import { defineNetzoConfig } from 'netzo/config/mod.ts'
import { netzoAppLayout } from 'netzo/ui/plugins/netzoAppLayout/mod.ts'

export default defineNetzoConfig({
  plugins: [netzoAppLayout()]
})
```
<<< src/main.ts
<<< src/dev.ts
:::

::: warning Fresh configuration [must](https://fresh.deno.dev/docs/concepts/ahead-of-time-builds#migrating-existing-projects-with-plugins) be defined in `netzo.config.ts`.
:::

## Configuration

```ts
interface NetzoAppLayoutOptions {
  title?: string
  description?: string
  favicon?: string
}
```
