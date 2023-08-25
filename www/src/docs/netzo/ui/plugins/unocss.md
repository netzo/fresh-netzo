<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/plugins/unocss.svg" alt="netzo/ui/plugins/unocss" class="mb-5 w-75px">

# `unocss`

[UnoCSS](https://unocss.dev) is an instant, on-demand atomic CSS engine. It generates atomic CSS classes on the fly based on the classes and attributes used in your project.

- **labels:** `css`, `components`, `unocss`

## Usage

```ts
import { unocss } from 'netzo/ui/plugins/unocss/mod.ts'

await start(manifest, {
  plugins: [unocss()]
})
```

## Configuration

This plugin accepts the original UnoCSS [`UserConfig`](https://unocss.dev/config) object.

```ts
interface UnocssOptions extends UserConfig {
  // see https://unocss.dev/config
}
```

## References

- [UnoCSS](https://unocss.dev/)
