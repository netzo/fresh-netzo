// from https://github.com/endigma/unocss-preset-radix
import { genCSS, generateColors, generateHues, newPalette } from "./unocss.radix.utils.ts";
import type { RadixColors } from "./unocss.radix.utils.ts";
import type { Preset } from "https://esm.sh/@unocss/core@0.53.4?bundle";

export * from "./unocss.radix.utils.ts";

export type ColorAliases = Record<string, RadixColors>;

export interface PresetRadixOptions {
  palette: readonly RadixColors[];
  /**
   * The prefix of the generated css variables
   * @default --un-preset-radix
   */
  prefix?: string;

  /**
   * Customize the selector used to apply the dark versions of the color palette
   * @default ".dark-theme"
   */
  darkSelector?: string;

  /**
   * Customize the selector used to apply the light versions of the color palette
   * @default ":root, .light-theme"
   */
  lightSelector?: string;

  /** Add color aliases */
  aliases?: ColorAliases;

  /**
   * Extend instead of override the default theme
   * @default false
   */
  extend?: boolean;
}

export function generateAliases(
  colors: ReturnType<typeof generateColors>,
  aliases: ColorAliases
) {
  return Object.entries(aliases).reduce((o, [alias, target]) => {
    o[alias] = colors[target];
    o[`${alias}A`] = colors[`${target}A`];
    return o;
  }, {} as Record<string, Record<number, string>>);
}

function minify(css: string) {
  return css.replace(/\n/g, "").replace(/\s+/g, "").trim();
}

export function presetRadix(options: PresetRadixOptions): Preset {
  const {
    prefix = "--un-preset-radix-",
    darkSelector = ".dark-theme",
    lightSelector = ":root, .light-theme",
    palette: selectedColors,
    aliases: selectedAliases = {},
    extend = false,
  } = options;

  const palette = newPalette(...selectedColors);
  const colors = generateColors(palette, prefix);
  const hues = generateHues(prefix);
  const aliases = generateAliases(colors, selectedAliases);

  return {
    name: "unocss-preset-radix",
    rules: [
      [
        /^hue-(.+)$/,
        ([, color]) => {
          let target: string = "";

          if (selectedColors.includes(color as RadixColors)) {
            target = color;
          } else if (color in selectedAliases) {
            target = selectedAliases[color];
          }

          if (target) {
            let css = `.hue-${color} {`;

            for (let shade = 1; shade <= 12; shade++) {
              css += `${prefix}hue${shade}: var(${prefix}${target}${shade});`;
              css += `${prefix}hue${shade}A: var(${prefix}${target}${shade}A);`;
            }

            css += "}";

            return minify(css);
          }

          return "";
        },
      ],
    ],
    extendTheme(theme: Record<string, Object>) {
      theme.colors = {
        ...colors,
        ...aliases,
        ...hues,

        white: "#ffffff",
        black: "#000000",
        transparent: "transparent",
        current: "currentColor",
        inherit: "inherit",

        ...(extend ? theme.colors : []),
      };
    },
    preflights: [
      {
        getCSS: () => genCSS(palette, darkSelector, lightSelector, prefix),
      },
    ],
  };
}