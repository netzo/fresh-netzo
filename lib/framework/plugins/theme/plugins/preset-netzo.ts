import {
  // mergeDeep,
  type PresetOrFactory,
} from "https://esm.sh/v135/@unocss/core@0.58.0?target=esnext";
import { presetIcons } from "https://esm.sh/v135/@unocss/preset-icons@0.58.0/browser?target=esnext";
import { presetTypography } from "https://esm.sh/v135/@unocss/preset-typography@0.58.0?target=esnext";
import {
  presetUno,
  type PresetUnoOptions,
  type Theme,
} from "https://esm.sh/v135/@unocss/preset-uno@0.58.0?target=esnext";
import { presetShadcn } from "./preset-shadcn/mod.ts";
import type { PresetShadcnOptions } from "./preset-shadcn/types.ts";

// @unocss-include

export type PresetNetzoOptions = PresetUnoOptions & {
  /**
   * @default 'zinc'
   */
  color?: PresetShadcnOptions["color"];
  /**
   * @default 0.5
   */
  radius?: PresetShadcnOptions["radius"];
};

export function presetNetzo(
  options: PresetNetzoOptions = {},
): PresetOrFactory<Theme> | PresetOrFactory<Theme>[] {
  return {
    ...options,

    name: "unocss-preset-netzo",

    presets: [
      presetShadcn({
        color: options?.color,
        radius: options?.radius,
      }),
      presetUno(),
      presetTypography(),
      presetIcons({
        collections: {
          mdi: () =>
            import("https://esm.sh/v135/@iconify-json/mdi/icons.json", {
              assert: { type: "json" },
            }).then((i) => i.default),
          logos: () =>
            import("https://esm.sh/v135/@iconify-json/logos/icons.json", {
              assert: { type: "json" },
            }).then((i) => i.default),
          "simple-icons": () =>
            import("https://esm.sh/v135/@iconify-json/simple-icons/icons.json", {
              assert: { type: "json" },
            }).then((i) => i.default),
        },
        prefix: ["i-", ""],
        scale: 1.2,
        extraProperties: {
          "display": "inline-block",
          "vertical-align": "middle",
        },
      }),
    ],
    // NOTE: build step required for transformers (see @unocss/unocss#1673)
    // transformers: [transformerDirectives(), transformerVariantGroup()],
  };
}

export default presetNetzo;
