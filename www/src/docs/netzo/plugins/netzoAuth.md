<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/plugins/netzoAuth.svg" alt="netzo/ui/plugins/netzoAuth" class="mb-5 w-75px">

# `netzoAuth`

Adds a middleware to protect routes with authentication based on access control settings set for the project in Netzo.

- **labels:** `middleware`, `auth`, `netzo`

## Usage

```ts
import { netzoAuth } from 'netzo/ui/plugins/netzoAuth/mod.ts'

await start(manifest, {
  plugins: [netzoAuth({ visibility: 'private' })]
})
```

## Configuration

```ts
type NetzoAuthOptions = {
  visibility: 'private'
} | {
  visibility: 'protected'
  tokens: string[]
} | {
  visibility: 'public'
}
```
