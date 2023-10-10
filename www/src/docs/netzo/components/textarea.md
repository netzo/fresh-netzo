<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
import { ui } from '~/../lib/components/registry.ts'
import { buildDenoJson } from '~/src/utils.ts'
const item = en.components.find(({ uid }) => uid === 'textarea')
const entry = ui.find(i => item.uid === i.name)
</script>

<div class="mb-5 w-75px h-75px"  :class="item.icon" />

# `textarea`

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
netzo add component textarea
```
:::

## Usage

After [installation](#installation) components can be imported and used directly.

```tsx
import { Textarea } from 'netzo/components/ui/textarea.tsx'
```

## Examples

Working examples to copy-paste into projects under `components/ui/`.

### Default

::: code-group
<<< @/../../lib/components/example/textarea.tsx
:::

### Disabled

::: code-group
<<< @/../../lib/components/example/textarea.disabled.tsx
:::

### Form

::: code-group
<<< @/../../lib/components/example/textarea.form.tsx
:::

### With Button

::: code-group
<<< @/../../lib/components/example/textarea.with-button.tsx
:::

### With Label

::: code-group
<<< @/../../lib/components/example/textarea.with-label.tsx
:::

### With Text

::: code-group
<<< @/../../lib/components/example/textarea.with-text.tsx
:::

