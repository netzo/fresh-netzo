<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
const item = en.components.find(({ uid }) => uid === 'chip')
</script>

<div class="mb-5 w-75px h-75px"  :class="item.icon" />

# `NChip`

{{ item.description }}

## Usage

```tsx
import { NChip } from 'netzo/components/mod.ts'

export default () => <NChip />
```

## Configuration

```ts
interface NChipProps { }
```
