<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
const item = en.components.find(({ uid }) => uid === 'radio')
</script>

<div class="mb-5 w-75px h-75px"  :class="item.icon" />

# `NRadio`

{{ item.description }}

## Usage

```tsx
import { NRadio } from 'netzo/components/mod.ts'

export default () => <NRadio />
```

## Configuration

```ts
interface NRadioProps { }
```
