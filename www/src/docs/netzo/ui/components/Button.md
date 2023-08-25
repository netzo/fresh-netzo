<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import CodeImports from '@theme/components/CodeImports.vue'
import en from '~/locales/en.js'
import { registry } from '~/../lib/ui/components/registry.ts'
const item = en.components.find(({ uid }) => uid === 'button')
const component = registry.find(i => i.name === 'button' && i.type === 'components:ui')
</script>

<div class="mb-5 w-75px h-75px"  :class="item.icon" />

# `Button`

{{ item.description }}

## Installation

<!-- <CodeImports v-bind="{ component }"></CodeImports> -->

::: details Add required imports in `deno.json`
<<< @/../../lib/ui/components/example/config/button.imports.json
:::

## Usage

::: code-group
<<< @/../../lib/ui/components/example/button.tsx
:::

## Examples

### Button with icon

::: code-group
<<< @/../../lib/ui/components/example/button.with-icon.tsx
:::
