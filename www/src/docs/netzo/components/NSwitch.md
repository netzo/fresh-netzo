<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
const item = en.components.find(({ uid }) => uid === 'switch')
</script>

<div class="mb-5 w-75px h-75px"  :class="item.icon" />

# `NSwitch`

{{ item.description }}

## Usage

```tsx
import { NSwitch } from 'netzo/components/mod.ts'

export default () => <NSwitch />
```

## Configuration

```ts
interface NSwitchProps { }
```
