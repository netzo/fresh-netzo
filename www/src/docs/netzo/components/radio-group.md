<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
import { ui } from '~/../lib/components/registry.ts'
import { buildDenoJson } from '~/src/utils.ts'
const item = en.components.find(({ uid }) => uid === 'radio-group')
const entry = ui.find(i => item.uid === i.name)
</script>

<div class="mb-5 w-75px h-75px"  :class="item.icon" />

# `radio-group`

{{ item.description }}

[`Radix UI`](https://www.radix-ui.com/primitives/docs/components/radio-group)
&nbsp;
[`API Reference`](https://www.radix-ui.com/primitives/docs/components/radio-group#api-reference)

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
netzo add component radio-group
```
:::

## Usage

After [installation](#installation) components can be imported and used directly.

```tsx
import {
  RadioGroup,
  RadioGroupItem,
} from 'netzo/components/ui/radio-group.tsx'
```

## Examples

Working examples to copy-paste into projects under `components/ui/`.

### Default

::: code-group
<<< @/../../lib/components/example/radio-group.tsx
:::

### Form

::: code-group
<<< @/../../lib/components/example/radio-group.form.tsx
:::

