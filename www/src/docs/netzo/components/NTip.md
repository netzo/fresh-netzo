<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
const item = en.components.find(({ uid }) => uid === 'tip')
</script>

<div class="mb-5 w-75px h-75px"  :class="item.icon" />

# `NTip`

{{ item.description }}

## Usage

```tsx
import { NTip } from 'netzo/components/mod.ts'

export default () => <NTip />
```

## Configuration

```ts
interface NTipProps { }
```
