<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
const item = en.components.find(({ uid }) => uid === 'icontitle')
</script>

<div class="mb-5 w-75px h-75px"  :class="item.icon" />

# `NIconTitle`

{{ item.description }}

## Usage

```tsx
import { NIconTitle } from 'netzo/ui/components/mod.ts'

export default () => <NIconTitle />
```

## Configuration

```ts
interface NIconTitleProps { }
```
