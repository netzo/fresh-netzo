import type {
  Preset,
  VariantContext,
  VariantObject,
} from "https://esm.sh/@unocss/core@0.55.2?bundle";
import type {
  PresetMiniOptions,
  Theme,
} from "https://esm.sh/@unocss/preset-mini@0.55.2?bundle";
import {
  h,
  variantGetParameter,
} from "https://esm.sh/@unocss/preset-mini@0.55.2/utils?bundle";
import { generateCSSVars } from "./generate.ts";

export type PresetShadcnOptions = PresetMiniOptions;

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

const handleMatchNumber = (v: string, defaultVal = "0") =>
  h.bracket.cssvar.global.auto.fraction.number(v || defaultVal)?.replace(
    "%",
    "",
  );
const handleMatchRem = (v: string, defaultVal = "full") =>
  h.bracket.cssvar.global.auto.fraction.rem(v || defaultVal);

export function presetShadcn(
  options: PresetShadcnOptions = {},
): Preset<Theme> {
  const { color = "zinc", radius = 0.5 } = options

  return {
    name: "unocss-preset-shadcn",
    preflights: [
      {
        getCSS: () => `
          @keyframes shadcn-down { from{ height: 0 } to { height: var(--radix-accordion-content-height)} }
          @keyframes shadcn-up { from{ height: var(--radix-accordion-content-height)} to { height: 0 } }
          @keyframes shadcn-enter { from{ opacity: var(--un-enter-opacity, 1); transform: translate3d(var(--un-enter-translate-x, 0), var(--un-enter-translate-y, 0), 0) scale3d(var(--un-enter-scale, 1), var(--un-enter-scale, 1), var(--un-enter-scale, 1)) rotate(var(--un-enter-rotate, 0)) } }
          @keyframes shadcn-exit { to{ opacity: var(--un-exit-opacity, 1); transform: translate3d(var(--un-exit-translate-x, 0), var(--un-exit-translate-y, 0), 0) scale3d(var(--un-exit-scale, 1), var(--un-exit-scale, 1), var(--un-exit-scale, 1)) rotate(var(--un-exit-rotate, 0)) } }

          ${generateCSSVars(color, radius)}

          * {
            border-color: hsl(var(--border));
          }

          body {
            color: hsl(var(--foreground));
            background: hsl(var(--background));
          }

          /* WORKAROUND: force inject theme CSS variables from presetShadcn
          since unocsss wont't inject them automatically for dynamic components */
          .bg-border {
            background-color: hsl(var(--border));
          }
          .text-border {
            color: hsl(var(--border-foreground));
          }
          .bg-input {
            background-color: hsl(var(--input));
          }
          .text-input {
            color: hsl(var(--input-foreground));
          }
          .bg-ring {
            background-color: hsl(var(--ring));
          }
          .text-ring {
            color: hsl(var(--ring-foreground));
          }
          .bg-background {
            background-color: hsl(var(--background));
          }
          .text-background {
            color: hsl(var(--background-foreground));
          }
          .bg-foreground {
            background-color: hsl(var(--foreground));
          }
          .text-foreground {
            color: hsl(var(--foreground-foreground));
          }
          .bg-primary {
            background-color: hsl(var(--primary));
          }
          .text-primary {
            color: hsl(var(--primary-foreground));
          }
          .bg-primary-foreground {
            background-color: hsl(var(--primary-foreground));
          }
          .text-primary-foreground {
            color: hsl(var(--primary-foreground));
          }
          .bg-secondary {
            background-color: hsl(var(--secondary));
          }
          .text-secondary {
            color: hsl(var(--secondary-foreground));
          }
          .bg-destructive {
            background-color: hsl(var(--destructive));
          }
          .text-destructive {
            color: hsl(var(--destructive-foreground));
          }
          .bg-muted {
            background-color: hsl(var(--muted));
          }
          .text-muted {
            color: hsl(var(--muted-foreground));
          }
          .bg-accent {
            background-color: hsl(var(--accent));
          }
          .text-accent {
            color: hsl(var(--accent-foreground));
          }
          .bg-popover {
            background-color: hsl(var(--popover));
          }
          .text-popover {
            color: hsl(var(--popover-foreground));
          }
          .bg-card {
            background-color: hsl(var(--card));
          }
          .text-card {
            color: hsl(var(--card-foreground));
          }
        `,
      },
    ],
    variants: [variantGroupDataAttribute.match],
    rules: [
      [
        "accordion-down",
        {
          animation: "shadcn-down 0.2s ease-out",
        },
      ],
      [
        "accordion-up",
        {
          animation: "shadcn-up 0.2s ease-out",
        },
      ],
      [
        "animate-in",
        {
          "animation-name": "shadcn-enter",
          "animation-duration": "var(--un-animate-duration)",
          "--un-animate-duration": "150ms",
          "--un-enter-opacity": "initial",
          "--un-enter-scale": "initial",
          "--un-enter-rotate": "initial",
          "--un-enter-translate-x": "initial",
          "--un-enter-translate-y": "initial",
        },
      ],
      [
        "animate-out",
        {
          "animation-name": "shadcn-exit",
          "animation-duration": "var(--un-animate-duration)",
          "--un-animate-duration": "150ms",
          "--un-exit-opacity": "initial",
          "--un-exit-scale": "initial",
          "--un-exit-rotate": "initial",
          "--un-exit-translate-x": "initial",
          "--un-exit-translate-y": "initial",
        },
      ],
      [
        /^fade-in-?(.+)?$/,
        ([, d]) => ({
          "--un-enter-opacity": `${Number(handleMatchNumber(d) || 0) / 100}`,
        }),
      ],
      [
        /^fade-out-?(.+)?$/,
        ([, d]) => ({
          "--un-exit-opacity": `${Number(handleMatchNumber(d) || 0) / 100}`,
        }),
      ],
      [
        /^zoom-in-?(.+)?$/,
        ([, d]) => ({
          "--un-enter-scale": `${Number(handleMatchNumber(d) || 0) / 100}`,
        }),
      ],
      [
        /^zoom-out-?(.+)?$/,
        ([, d]) => ({
          "--un-out-scale": `${Number(handleMatchNumber(d) || 0) / 100}`,
        }),
      ],
      [
        /^spin-in-?(.+)?$/,
        ([, d]) => ({
          "--un-enter-rotate": `${Number(handleMatchNumber(d) || 0)}deg`,
        }),
      ],
      [
        /^spin-out-?(.+)?$/,
        ([, d]) => ({
          "--un-exit-rotate": `${Number(handleMatchNumber(d) || 0)}deg`,
        }),
      ],
      [
        /^slide-in-from-top-?(.+)?$/,
        ([, d]) => ({ "--un-enter-translate-y": `-${handleMatchRem(d)}` }),
      ],
      [
        /^slide-in-from-bottom-?(.+)?$/,
        ([, d]) => ({ "--un-enter-translate-y": handleMatchRem(d) }),
      ],
      [
        /^slide-in-from-left-?(.+)?$/,
        ([, d]) => ({ "--un-enter-translate-x": `-${handleMatchRem(d)}` }),
      ],
      [
        /^slide-in-from-right-?(.+)?$/,
        ([, d]) => ({ "--un-enter-translate-x": handleMatchRem(d) }),
      ],
      [
        /^slide-out-to-top-?(.+)?$/,
        ([, d]) => ({ "--un-exit-translate-y": `-${handleMatchRem(d)}` }),
      ],
      [
        /^slide-out-to-bottom-?(.+)?$/,
        ([, d]) => ({ "--un-exit-translate-y": handleMatchRem(d) }),
      ],
      [
        /^slide-out-to-left-?(.+)?$/,
        ([, d]) => ({ "--un-exit-translate-x": `-${handleMatchRem(d)}` }),
      ],
      [
        /^slide-out-to-right-?(.+)?$/,
        ([, d]) => ({ "--un-exit-translate-x": handleMatchRem(d) }),
      ],
    ],
    theme: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
    },
  };
}

export default presetShadcn;
