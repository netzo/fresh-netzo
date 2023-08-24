<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
const item = en.components.find(({ uid }) => uid === 'checkbox')
</script>

<div class="mb-5 w-75px h-75px"  :class="item.icon" />

# `NCheckbox`

{{ item.description }}

## Usage

```tsx
import { NCheckbox } from 'netzo/components/mod.ts'

export default () => <NCheckbox />
```

## Configuration

```ts
interface NCheckboxProps { }
```
