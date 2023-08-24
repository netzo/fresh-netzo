<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
const item = en.components.find(({ uid }) => uid === 'loading')
</script>

<div class="mb-5 w-75px h-75px"  :class="item.icon" />

# `NLoading`

{{ item.description }}

## Usage

```tsx
import { NLoading } from 'netzo/ui/components/mod.ts'

export default () => <NLoading />
```

## Configuration

```ts
interface NLoadingProps { }
```
