<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/plugins/netzoAuth.svg" alt="netzo/ui/plugins/netzoAuth" class="mb-5 w-75px">

# `netzoAuth`

Adds a middleware to protect routes with authentication based on access control settings set for the project in Netzo.

- **labels:** `middleware`, `auth`, `netzo`

## Usage

Register the plugin in `fresh.config.ts` and ensure `main.ts` and `dev.ts` are receive the `config` object as shown below.

::: code-group
```ts [fresh.config.ts]
import { netzoAuth } from 'netzo/ui/plugins/netzoAuth/mod.ts'

await start(manifest, {
  plugins: [netzoAuth({ visibility: 'private' })]
})
```
<<< src/main.ts
<<< src/dev.ts
:::

::: warning Fresh configuration [must](https://fresh.deno.dev/docs/concepts/ahead-of-time-builds#migrating-existing-projects-with-plugins) be defined in `fresh.config.ts`.
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
