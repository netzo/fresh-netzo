<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
const item = en.components.find(({ uid }) => uid === 'link')
</script>

<div class="mb-5 w-75px h-75px"  :class="item.icon" />

# `NLink`

{{ item.description }}

## Usage

```tsx
import { NLink } from 'netzo/ui/components/mod.ts'

export default () => <NLink />
```

## Configuration

```ts
interface NLinkProps { }
```
