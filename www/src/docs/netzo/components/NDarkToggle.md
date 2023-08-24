<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
const item = en.components.find(({ uid }) => uid === 'darktoggle')
</script>

<div class="mb-5 w-75px h-75px"  :class="item.icon" />

# `NDarkToggle`

{{ item.description }}

## Usage

```tsx
import { NDarkToggle } from 'netzo/ui/components/mod.ts'

export default () => <NDarkToggle />
```

## Configuration

```ts
interface NDarkToggleProps { }
```
