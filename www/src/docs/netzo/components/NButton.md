<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
const item = en.components.find(({ uid }) => uid === 'button')
</script>

<div class="mb-5 w-75px h-75px"  :class="item.icon" />

# `NButton`

{{ item.description }}

## Usage

```tsx
import { NButton } from 'netzo/ui/components/mod.ts'

export default () => <NButton />
```

## Configuration

```ts
interface NButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  prependIcon?: string
  appendIcon?: string
  loading?: boolean
  onClick?: (e: MouseEvent) => void
}
```

## Examples

### Default

::: code-group
<<< @/../../lib/components/example/button.tsx
:::

### Button with icon

::: code-group
<<< @/../../lib/components/example/button.with-icon.tsx
:::
