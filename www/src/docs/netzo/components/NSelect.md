<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
const item = en.components.find(({ uid }) => uid === 'select')
</script>

<div class="mb-5 w-75px h-75px"  :class="item.icon" />

# `NSelect`

{{ item.description }}

## Usage

```tsx
import { NSelect } from 'netzo/ui/components/mod.ts'

export default () => <NSelect />
```

## Configuration

```ts
interface NSelectProps { }
```
