<script setup lang="ts">
import ChipSimple from '@theme/components/ChipSimple.vue'
</script>

<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/plugins/portals.svg" alt="netzo/auth" class="mb-5 w-75px">

# `portals` <ChipSimple chip="soon" />

Adds a middleware to protect routes with authentication based on access control settings set for the project in Netzo.

- **labels:** `middleware`, `auth`, `netzo`

## Usage

Register the module in `netzo.config.ts` and ensure `main.ts` and `dev.ts` are receive the `config` object as shown below.

::: code-group
```ts [netzo.config.ts]
import { defineNetzoConfig } from 'netzo/config/mod.ts'
import { portals } from 'netzo/plugins/portals/mod.ts'

export default defineNetzoConfig({
  plugins: [
    portals({ /* ... */ })
  ]
})
```
<<< ./plugins/src/main.ts
<<< ./plugins/src/dev.ts
:::

::: warning Fresh configuration [must](https://fresh.deno.dev/docs/concepts/ahead-of-time-builds#migrating-existing-projects-with-plugins) be defined in `netzo.config.ts`.
:::

## Configuration

```ts
interface AuthOptions {
  // email: EmailClientConfig;
  oauth2: OAuth2ClientConfig
}
```
