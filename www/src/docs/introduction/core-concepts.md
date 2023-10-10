# Core Concepts

**Netzo provides a collection of building blocks for tailor-made for the [Deno fresh](https://fresh.deno.dev/) framework (**recommended**).** The goal is to provide everything related to UI when building custom frontends. This includes [components](/docs/netzo/components), [composables](/docs/netzo/composables), [modules](/docs/netzo/modules) and unocss-powered themes including colors, icons and typography.

- Headless components
- Built with Radix UI and UnoCSS
- Dark mode support
- Keyboard shortcuts
- Icons via CSS
- Fully typed

::: tip [Templates](/docs/templates/apps) in Netzo are built using `netzo/ui` and forking them is a great way to get started.
:::

## Motivation

The styles should be separate from implementation. One of the drawback of packaging components into a component library is that the style is coupled with the implementation.

[`netzo/components`](/docs/netzo/components) separates [(unstyled) components](#components) from [styles](#styles). The components are built using headless (unstyled) primitives from [`radix-ui`](https://www.radix-ui.com/) and can be styled however you would like, though we recommend [`unocss`](https://unocss.dev/). To ease styling, the UnoCSS `presetNetzo` can be used for beautiful and consistent defaults which you can still easily customize however you want.

<!-- ## Getting Started

Coming soon...

### Installation

Coming soon... -->

## Styles

You can choose to theme components however you would like. However, we strongly recommend using UnoCSS together with the [netzo theme](#theming) provided by `presetNetzo`.

Powered by [UnoCSS](https://github.com/antfu/unocss), you can use Tailwind/Windi CSS utilities to quickly customize the look and feel of components. The `presetNetzo` includes component class names with beautiful and consistent defaults which you can still easily customize.

::: warning Requires the [`unocss`](/docs/netzo/modules/unocss) module to be registered as well.
:::

### Theming

The netzo theme is based on the UnoCSS `presetNetzo`. You can find all the default values and available entries in [`netzo/modules/unocss/preset-netzo.ts`](https://github.com/netzo/netzo/blob/main/lib/unocss/preset-netzo.ts). Note that the [`UserConfig`](https://unocss.dev/config) object can be passed additional properties to extend the netzo theme globally.

::: code-group
```ts [netzo.config.ts]
import { defineNetzoConfig } from 'netzo/config.ts'
import { presetNetzo } from 'netzo/modules/unocss/preset-netzo.ts'

export default defineNetzoConfig({
  modules: {
    unocss: {
      presets: [presetNetzo()]
      // ...additional configuration
    }
  }
})
```
<<< ../netzo/modules/src/main.ts
<<< ../netzo/modules/src/dev.ts
:::

::: details Custom theme
To use a custom theme you can pass a custom [`UserConfig`](https://unocss.dev/config) object to the `unocss` module instead. This will lose all the benefits of the `presetNetzo`. Instead, it is recommended to extend the `presetNetzo` with your own customizations.
:::

### Usage

The `presetNetzo` introduces extends the Tailwind/Windi CSS utility classes. For example, you can use the `m-1` class to apply a margin of `1px` to an element:

```tsx
<div class="m-1">Hello</div>
```

`m-1` will be detected and the following CSS will be generated:

```css
.m-1 { margin: 1px; }
```

## Credits

- [`shadcn/ui`](https://ui.shadcn.com/)
- [`radix-ui`](https://www.radix-ui.com/)
- [`unocss`](https://unocss.dev/)
- [`@tanstack/react-table`](https://tanstack.com/table/v8)
- [`vueuse`](https://vueuse.org/)
- [`cmdk`](https://cmdk.paco.me/)
