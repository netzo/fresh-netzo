<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/plugins/netzoAppLayout.svg" alt="netzo/ui/plugins/netzoAppLayout" class="mb-5 w-75px">

# `netzoAppLayout`

Adds a global layout route from which all other routes inherit from.

- **labels:** `middleware`, `auth`, `netzo`

## Usage

```ts
import { netzoAppLayout } from 'netzo/ui/plugins/netzoAppLayout/mod.ts'

await start(manifest, {
  plugins: [netzoAppLayout()]
})
```

## Configuration

```ts
interface NetzoAppLayoutOptions {
  title?: string
  description?: string
  favicon?: string
}
```
