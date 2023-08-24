<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
</script>

# `netzo/components`

> [`https://deno.land/x/netzo/components`](https://deno.land/x/netzo/components)

::: tip The `netzo/components` module is still a work in progress.
:::

**The `netzo/components` module is a collection of UI components written in [Preact](https://preactjs.com/) (TSX) and built with [Radix UI](https://www.radix-ui.com/) and [UnoCSS](https://unocss.dev/).** This is not a component library. It is a collection of re-usable components that you can copy and paste into your apps.

Pick the components you need. Copy and paste the code into your project and customize to your needs. The code is yours. Use this as a reference to customize the components to your needs. Most components and documentation takes heavy inspiration from [shadcn/ui](https://ui.shadcn.com/).

::: details Why a collection of components to copy/paste instead of a library?
This approach gives you full ownership and control over the code, allowing you to decide how the components are built and styled. Start with some sensible defaults, then customize the components to your needs.
:::

The styles of your components should be separate from their implementation. One of the drawback of packaging components into a component library is that the style is coupled with the implementation.

`netzo/components` separates [(unstyled) components](#components) from [styles](#styles). The components are built using headless (unstyled) primitives from `radix-ui` and can be styled however you would like, though we recommend `unocss`. To ease styling, the UnoCSS `netzoPreset` can be used for beautiful and consistent defaults which you can still easily customize however you want.

## Components

Collection of headless components that you can copy/paste into your project

### Data

<SectionDocsCards :items="en.components.filter(c => c.category === 'data')">
  <template #image="{ icon, src, title }">
    <div
      class="mt-5 ml-4 w-14 h-14"
      :class="icon"
    />
  </template>
</SectionDocsCards>

### Elements

<SectionDocsCards :items="en.components.filter(c => c.category === 'elements')">
  <template #image="{ icon, src, title }">
    <div
      class="mt-5 ml-4 w-14 h-14"
      :class="icon"
    />
  </template>
</SectionDocsCards>

### Form

<SectionDocsCards :items="en.components.filter(c => c.category === 'form')">
  <template #image="{ icon, src, title }">
    <div
      class="mt-5 ml-4 w-14 h-14"
      :class="icon"
    />
  </template>
</SectionDocsCards>

### Layout

<SectionDocsCards :items="en.components.filter(c => c.category === 'layout')">
  <template #image="{ icon, src, title }">
    <div
      class="mt-5 ml-4 w-14 h-14"
      :class="icon"
    />
  </template>
</SectionDocsCards>

### Overlay

<SectionDocsCards :items="en.components.filter(c => c.category === 'overlay')">
  <template #image="{ icon, src, title }">
    <div
      class="mt-5 ml-4 w-14 h-14"
      :class="icon"
    />
  </template>
</SectionDocsCards>

## Styles

You can choose to theme components however you would like. However, we strongly recommend using UnoCSS together with the [netzo theme](#theming) provided by `netzoPreset`.

Powered by [UnoCSS](https://github.com/antfu/unocss), you can use Tailwind/Windi CSS utilities to quickly customize the look and feel of components. The `netzoPreset` includes component class names with beautiful and consistent defaults which you can still easily customize.

::: warning Requires the [`unocss`](/docs/netzo/plugins/unocss) plugin to be registered as well.
:::

### Theming

The netzo theme is based on the UnoCSS `netzoPreset`. You can find all the default values and available entries in [`netzo/unocss/preset-netzo.ts`](https://github.com/netzo/netzo/blob/main/lib/unocss/preset-netzo.ts). Note that the [`UserConfig`](https://unocss.dev/config) object can be passed additional properties to extend the netzo theme globally.

::: code-group
```ts [main.ts]
import { unocss } from 'netzo/plugins/unocss/mod.ts'
import { presetNetzo } from 'netzo/unocss/preset-netzo.ts'

await start(manifest, {
  plugins: [
    unocss({
      presets: [presetNetzo()]
      // ...additional configuration
    })
  ]
})
```
:::

::: details Custom theme
To use a custom theme you can pass a custom [`UserConfig`](https://unocss.dev/config) object to the `unocss` plugin instead. This will lose all the benefits of the `netzoPreset`. Instead, it is recommended to extend the `netzoPreset` with your own customizations.
:::

### Usage

The `netzoPreset` introduces the `n` attribute for every component to customize the styles and variations. For example, to make a `red` button:

```tsx
<NButton n="red" />
```

to make it larger, add the size specifier (`sm`, `md`, `lg` or `xl`) the `n` attribute:

```tsx
<NButton n="red xl" />
```

You can apply the same specifiers to any other component, for example:

```tsx
<NCheckbox n="red xl" />
```

Apply it to parent components could make a local theme scope and both children components will inherit the theme:

```tsx
<NCard n="green-500">
  <NCheckbox>i accept the terms & conditions</NCheckbox>
  <NButton>Submit</NButton>
</NCard>
```

## Demo

<iframe src='https://netzo.deno.dev' class="w-full h-80vh border-none"></iframe>

## Credits

- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [UnoCSS](https://unocss.dev/)
