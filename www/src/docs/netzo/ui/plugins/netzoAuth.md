<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/plugins/netzoAuth.svg" alt="netzo/ui/plugins/netzoAuth" class="mb-5 w-75px">

# `netzoAuth`

Adds a middleware to protect routes with authentication based on access control settings set for the project in Netzo.

- **labels:** `middleware`, `auth`, `netzo`

## Usage

Register the plugin in `netzo.config.ts` and ensure `main.ts` and `dev.ts` are receive the `config` object as shown below.

::: code-group
```ts [netzo.config.ts]
import { defineNetzoConfig } from 'netzo/config/mod.ts'
import { netzoAuth } from 'netzo/ui/plugins/netzoAuth/mod.ts'

export default defineNetzoConfig({
  fresh: {
    plugins: [netzoAuth({ visibility: 'private' })]
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
type NetzoAuthOptions = {
  visibility: 'private'
} | {
  visibility: 'protected'
  tokens: string[]
} | {
  visibility: 'public'
}
```
