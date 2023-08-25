<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
import { ui } from '~/../lib/ui/components/registry.ts'
import { buildDenoJson } from '~/src/utils.ts'
const item = en.components.find(({ uid }) => uid === 'switch')
const entry = ui.find(i => item.uid === i.name)
</script>

<div class="mb-5 w-75px h-75px"  :class="item.icon" />

# `switch`

{{ item.description }}

[`Radix UI`](https://www.radix-ui.com/primitives/docs/components/switch)
&nbsp;
[`API Reference`](https://www.radix-ui.com/primitives/docs/components/switch#api-reference)

## Installation

::: tabs
== Manual
Add required imports in `deno.json`
```json-vue
{{ buildDenoJson(entry) }}
```
== CLI (soon)
Run the following command in your terminal.
```sh
netzo add component switch
```
:::

## Usage

After [installation](#installation) components can be imported and used directly.

```tsx
import { Switch } from "netzo/ui/components/ui/switch.tsx";
```

## Examples

Working examples to copy-paste into projects under `components/ui/`.

### Default

::: code-group
<<< @/../../lib/ui/components/example/switch.tsx
:::

### Form

::: code-group
<<< @/../../lib/ui/components/example/switch.form.tsx
:::

### Theme

::: code-group
<<< @/../../lib/ui/components/example/switch.theme.tsx
:::
