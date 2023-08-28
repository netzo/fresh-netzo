<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/plugins/htmx.svg" alt="netzo/ui/plugins/htmx" class="mb-5 w-75px">

# `htmx` (soon)

[HTMX](https://htmx.org) is a javascript library that allows you to access AJAX, WebSockets and Server Sent Events directly in HTML, using attributes, so you can build modern user interfaces with the simplicity and power of hypertext.

- **labels:** `html`, `javascript`, `hypertext`

## Usage

```ts
import { htmx } from 'netzo/ui/plugins/htmx/mod.ts'

await start(manifest, {
  plugins: [htmx()]
})
```

## Configuration

```ts
interface HtmxOptions {}
```

## References

- [HTMX](https://htmx.org/)
