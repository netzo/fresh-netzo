<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
import { ui } from '~/../lib/components/registry.ts'
import { buildDenoJson } from '~/src/utils.ts'
const item = en.components.find(({ uid }) => uid === 'badge')
const entry = ui.find(i => item.uid === i.name)
</script>

<div class="mb-5 w-75px h-75px"  :class="item.icon" />

# `badge`

{{ item.description }}

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
netzo add component badge
```
:::

## Usage

After [installation](#installation) components can be imported and used directly.

```tsx
import { Badge, badgeVariants } from 'netzo/components/ui/badge.tsx'
```

## Examples

Working examples to copy-paste into projects under `components/ui/`.

### Default

::: code-group
<<< @/../../lib/components/example/badge.tsx
:::

### Destructive

::: code-group
<<< @/../../lib/components/example/badge.destructive.tsx
:::

### Outline

::: code-group
<<< @/../../lib/components/example/badge.outline.tsx
:::

### Secondary

::: code-group
<<< @/../../lib/components/example/badge.secondary.tsx
:::
