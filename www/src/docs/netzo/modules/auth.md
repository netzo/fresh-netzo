<script setup lang="ts">
import ChipSimple from '@theme/components/ChipSimple.vue'
</script>

<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/modules/auth.svg" alt="netzo/modules/auth" class="mb-5 w-75px">

# `auth` <ChipSimple chip="soon" />

Adds a middleware to protect routes with authentication based on access control settings set for the project in Netzo.

- **labels:** `middleware`, `auth`, `netzo`

## Usage

Register the module in `netzo.config.ts` and ensure `main.ts` and `dev.ts` are receive the `config` object as shown below.

::: code-group
```ts [netzo.config.ts]
import { defineNetzoConfig } from 'netzo/config.ts'

export default defineNetzoConfig({
  modules: {
    auth: { visibility: 'private' }
  }
})
```
<<< ../modules/src/main.ts
<<< ../modules/src/dev.ts
:::

::: warning Fresh configuration [must](https://fresh.deno.dev/docs/concepts/ahead-of-time-builds#migrating-existing-projects-with-plugins) be defined in `netzo.config.ts`.
:::

## Configuration

```ts
import type { NetzoModule } from 'netzo/config.ts'

interface AuthOptions extends NetzoModule {
  visibility: 'private' | 'protected' | 'public'
  tokens: string[] // only for "protected" visibility
}
```
