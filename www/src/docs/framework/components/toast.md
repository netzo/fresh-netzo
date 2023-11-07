<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
import { ui } from '~/../lib/components/registry.ts'
import { buildDenoJson } from '~/src/utils.ts'
const item = en.components.find(({ uid }) => uid === 'toast')
const entry = ui.find(i => item.uid === i.name)
</script>

<div class="mb-5 w-75px h-75px"  :class="item.icon" />

# `toast`

{{ item.description }}

[`Radix UI`](https://www.radix-ui.com/primitives/docs/components/toast)
&nbsp;
[`API Reference`](https://www.radix-ui.com/primitives/docs/components/toast#api-reference)

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
netzo add component toast
```
:::

## Usage

After [installation](#installation) components can be imported and used directly.

```tsx
import {
  Toast,
  ToastAction,
  type ToastActionElement,
  ToastClose,
  ToastDescription,
  type ToastProps,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from 'netzo/components/ui/toast.tsx'
```

## Examples

Working examples to copy-paste into projects under `components/ui/`.

### Default

::: code-group
<<< @/../../lib/components/example/toast.tsx
:::

### Destructive

::: code-group
<<< @/../../lib/components/example/toast.destructive.tsx
:::

### Simple

::: code-group
<<< @/../../lib/components/example/toast.simple.tsx
:::

### With Action

::: code-group
<<< @/../../lib/components/example/toast.with-action.tsx
:::

### With Title

::: code-group
<<< @/../../lib/components/example/toast.with-title.tsx
:::
