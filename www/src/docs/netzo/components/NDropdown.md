<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
const item = en.components.find(({ uid }) => uid === 'dropdown')
</script>

<div class="mb-5 w-75px h-75px"  :class="item.icon" />

# `NDropdown`

{{ item.description }}

## Usage

```tsx
import { NDropdown } from 'netzo/components/mod.ts'

export default () => <NDropdown />
```

## Configuration

```ts
interface NDropdownProps { }
```
