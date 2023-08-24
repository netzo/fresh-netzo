<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
const item = en.components.find(({ uid }) => uid === 'inputtext')
</script>

<div class="mb-5 w-75px h-75px"  :class="item.icon" />

# `NInputText`

{{ item.description }}

## Usage

```tsx
import { NInputText } from 'netzo/ui/components/mod.ts'

export default () => <NInputText />
```

## Configuration

```ts
interface NInputTextProps { }
```
