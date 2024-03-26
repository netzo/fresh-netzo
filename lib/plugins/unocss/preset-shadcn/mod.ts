// from https://github.com/hyoban/unocss-preset-shadcn
import { sheetVariants } from "../../../components/sheet.tsx";
import type {
  Preset,
  VariantContext,
  VariantObject,
} from "../../../deps/@unocss/core.ts";
import type {
  Theme
} from "../../../deps/@unocss/preset-mini/mod.ts";
import {
  h,
  variantGetParameter,
} from "../../../deps/@unocss/preset-mini/utils.ts";
import { generateCSSVars } from "./generate.ts";
import { PresetShadcnOptions } from "./types.ts";

// WORKAROUND: `bg-opacity-90` instead of `bg-primary/90`, `bg-opacity-80`
// instead of `bg-secondary/80` and `bg-opacity/90` instead of `bg-destructive/90`

const variantGroupDataAttribute: VariantObject = {
  name: "group-data",
  match(matcher, ctx: VariantContext<Theme>) {
    const variant = variantGetParameter(
      "group-data-",
      matcher,
      ctx.generator.config.separators,
    );
    if (variant) {
      const [match, rest] = variant;
      const dataAttribute = h.bracket(match) ?? ctx.theme.data?.[match] ?? "";
      if (dataAttribute) {
        return {
          matcher: `group-[[data-${dataAttribute}]]:${rest}`,
        };
      }
    }
  },
};


export function presetShadcn(options: PresetShadcnOptions = {}): Preset<Theme> {
  // IMPORTANT: note that functions are dropped for CSR mode due to by
  // esbuild serialization so we use non-function syntax where possible
  return {
    name: "unocss-preset-shadcn",

    preflights: [
      {
        getCSS: () => `
          @keyframes shadcn-down { from{ height: 0 } to { height: var(--radix-accordion-content-height)} }
          @keyframes shadcn-up { from{ height: var(--radix-accordion-content-height)} to { height: 0 } }
          @keyframes shadcn-collapsible-down { from{ height: 0 } to { height: var(--radix-collapsible-content-height)} }
          @keyframes shadcn-collapsible-up { from{ height: var(--radix-collapsible-content-height)} to { height: 0 } }

          ${generateCSSVars(options)}

          * {
            border-color: hsl(var(--border));
          }

          body {
            color: hsl(var(--foreground));
            background: hsl(var(--background));
          }
        `,
      },
    ],

    // WORKAROUND: force include dynamically injected classes (e.g. when opening sheet)
    // by certain shadcn-ui components like sheet, dialog and popover so that unocss
    // can generate the correct CSS at AoT/SSR without needing to enable CSR mode bundle
    safelist: [
      ...new Set([
        ...sheetVariants({ side: "top" }).split(" "),
        ...sheetVariants({ side: "right" }).split(" "),
        ...sheetVariants({ side: "bottom" }).split(" "),
        ...sheetVariants({ side: "left" }).split(" "),
      ]),
    ],

    variants: [variantGroupDataAttribute.match],

    rules: [
      [
        'animate-accordion-down',
        {
          animation: 'shadcn-down 0.2s ease-out',
        },
      ],
      [
        'animate-accordion-up',
        {
          animation: 'shadcn-up 0.2s ease-out',
        },
      ],
      [
        'animate-collapsible-down',
        {
          animation: 'shadcn-collapsible-down 0.2s ease-out',
        },
      ],
      [
        'animate-collapsible-up',
        {
          animation: 'shadcn-collapsible-up 0.2s ease-out',
        },
      ],
    ],

   theme: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
    },
    // NOTE: build step required for transformers (see @unocss/unocss#1673)
    // transformers: [transformerDirectives(), transformerVariantGroup()],
  };
}

export default presetShadcn;
