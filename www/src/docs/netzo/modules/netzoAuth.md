<script setup lang="ts">
import ChipSimple from '@theme/components/ChipSimple.vue'
</script>

<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/modules/netzoAuth.svg" alt="netzo/modules/netzoAuth" class="mb-5 w-75px">

# `netzoAuth` <ChipSimple chip="soon" />

Adds a middleware to protect routes with authentication based on access control settings set for the project in Netzo.

- **labels:** `middleware`, `auth`, `netzo`

## Usage

Register the plugin in `netzo.config.ts` and ensure `main.ts` and `dev.ts` are receive the `config` object as shown below.

::: code-group
```ts [netzo.config.ts]
import { defineNetzoConfig } from 'netzo/config.ts'
import { netzoAuth } from 'netzo/modules/netzoAuth/mod.ts'

export default defineNetzoConfig({
  fresh: {
    plugins: [netzoAuth({ visibility: 'private' })]
  }
})
```
<<< ../ui/plugins/src/main.ts
<<< ../ui/plugins/src/dev.ts
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
