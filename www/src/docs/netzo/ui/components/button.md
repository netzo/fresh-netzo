<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
import { ui } from '~/../lib/ui/components/registry.ts'
import { buildDenoJson } from '~/src/utils.ts'
const item = en.components.find(({ uid }) => uid === 'button')
const entry = ui.find(i => item.uid === i.name)
</script>

<div class="mb-5 w-75px h-75px"  :class="item.icon" />

# `button`

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
netzo add component button
```
:::

## Usage

After [installation](#installation) components can be imported and used directly.

```tsx
import { Button, buttonVariants } from "netzo/ui/components/ui/button.tsx";
```

## Examples

Working examples to copy-paste into projects under `components/ui/`.

### Default

::: code-group
<<< @/../../lib/ui/components/example/button.tsx
:::

### As Child

::: code-group
<<< @/../../lib/ui/components/example/button.as-child.tsx
:::

### Destructive

::: code-group
<<< @/../../lib/ui/components/example/button.destructive.tsx
:::

### Ghost

::: code-group
<<< @/../../lib/ui/components/example/button.ghost.tsx
:::

### Icon

::: code-group
<<< @/../../lib/ui/components/example/button.icon.tsx
:::

### Link

::: code-group
<<< @/../../lib/ui/components/example/button.link.tsx
:::

### Loading

::: code-group
<<< @/../../lib/ui/components/example/button.loading.tsx
:::

### Outline

::: code-group
<<< @/../../lib/ui/components/example/button.outline.tsx
:::

### Secondary

::: code-group
<<< @/../../lib/ui/components/example/button.secondary.tsx
:::

### With Icon

::: code-group
<<< @/../../lib/ui/components/example/button.with-icon.tsx
:::
