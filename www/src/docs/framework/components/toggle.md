<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
import { ui } from '~/../lib/components/registry.ts'
import { buildDenoJson } from '~/src/utils.ts'
const item = en.components.find(({ uid }) => uid === 'toggle')
const entry = ui.find(i => item.uid === i.name)
</script>

<div class="mb-5 w-75px h-75px"  :class="item.icon" />

# `toggle`

{{ item.description }}

[`Radix UI`](https://www.radix-ui.com/primitives/docs/components/toggle)
&nbsp;
[`API Reference`](https://www.radix-ui.com/primitives/docs/components/toggle#api-reference)

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
netzo add component toggle
```
:::

## Usage

After [installation](#installation) components can be imported and used directly.

```tsx
import { Toggle, toggleVariants } from 'netzo/components/ui/toggle.tsx'
```

## Examples

Working examples to copy-paste into projects under `components/ui/`.

### Default

::: code-group
<<< @/../../lib/components/example/toggle.tsx
:::

### Disabled

::: code-group
<<< @/../../lib/components/example/toggle.disabled.tsx
:::

### Large

::: code-group
<<< @/../../lib/components/example/toggle.lg.tsx
:::

### Outline

::: code-group
<<< @/../../lib/components/example/toggle.outline.tsx
:::

### Small

::: code-group
<<< @/../../lib/components/example/toggle.sm.tsx
:::

### With Text

::: code-group
<<< @/../../lib/components/example/toggle.with-text.tsx
:::

