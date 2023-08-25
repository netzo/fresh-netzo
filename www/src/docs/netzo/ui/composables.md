# `netzo/ui/composables`

> [`https://deno.land/x/netzo/ui/composables`](https://deno.land/x/netzo/ui/composables)

**The `netzo/ui/composables` module exports a set of composable functions that encapsulate common stateful logic for reuse.** These include utilities for common functionality like pagination, search and selection for rendering a reactive table. Composables are simply functions (closures) that return an object of utilites (variables and functions) for a common purpose. All composables from this module are built using [`@preact/signals`](https://preactjs.com/guide/v10/signals/) for state and reactivity.

<!-- NOTE: categories inspired by vueuse (see https://vueuse.org/functions.html) -->

## State

### `usePagination`

The `usePagination` composable returns utilities for paginating a list of items.

```ts
import { usePagination } from 'https://deno.land/x/netzo/ui/composables/state/usePagination.ts'
const items = [
  { name: 'John', lastName: 'Doe', age: 25 },
  { name: 'Jane', lastName: 'Jones', age: 30 },
  { name: 'Jack', lastName: 'Smith', age: 35 },
  { name: 'Jill', lastName: 'Williams', age: 40 },
]
const { page, itemsPerPage, pageCount, paginatedItems } = usePagination(items)
```

### `useSearch`

The `useSearch` composable returns utilities for searching a list of items.

```ts
import { useSearch } from 'https://deno.land/x/netzo/ui/composables/state/useSearch.ts'
const items = [
  { name: 'John', lastName: 'Doe', age: 25 },
  { name: 'Jane', lastName: 'Jones', age: 30 },
  { name: 'Jack', lastName: 'Smith', age: 35 },
  { name: 'Jill', lastName: 'Williams', age: 40 },
]
const { search, filteredItems } = useSearch(items, ['name'])
```

### `useSelection`

The `useSelection` composable returns utilities for selecting items from a list.

```ts
import { useSelection } from 'https://deno.land/x/netzo/ui/composables/state/useSelection.ts'
const items = [
  { name: 'John', lastName: 'Doe', age: 25 },
  { name: 'Jane', lastName: 'Jones', age: 30 },
  { name: 'Jack', lastName: 'Smith', age: 35 },
  { name: 'Jill', lastName: 'Williams', age: 40 },
]
const { selected, selectedAll, selectedCount, selectedAllCount } = useSelection(items)
```

<!-- ## Elements -->

## Browser

### `useTheme`

The `useTheme` composable returns utilities for getting/setting the browser theme (`light` or `dark`).

```ts
import { useTheme } from 'https://deno.land/x/netzo/ui/composables/browser/useTheme.ts'
const { theme, isLight, isDark } = useTheme(items)
console.log(theme.value) // 'light' or 'dark'
console.log(isLight.value) // true or false
console.log(isDark.value) // false or true
```

<!-- ## Sensors

## Network

## Animation

## Component

## Watch

## Reactivity

## Array

## Time

## Utilities

## Head

## Math -->
