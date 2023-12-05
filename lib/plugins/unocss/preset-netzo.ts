import {
  // mergeDeep,
  type Preset,
  type UserConfig,
} from "https://esm.sh/@unocss/core@0.55.2?bundle";
import { presetIcons } from "https://esm.sh/@unocss/preset-icons@0.55.2/browser?bundle";
import { presetTypography } from "https://esm.sh/@unocss/preset-typography@0.55.2?bundle";
import {
  presetUno,
  type Theme,
} from "https://esm.sh/@unocss/preset-uno@0.55.2?bundle";
import { presetShadcn } from "./preset-shadcn/mod.ts";

// @unocss-include

export function presetNetzo(user: UserConfig = {}): Preset<Theme> {
  return {
    ...user,

    name: "unocss-preset-netzo",

    presets: [
      presetShadcn(),
      presetUno(),
      presetTypography(),
      presetIcons({
        collections: {
          mdi: () =>
            import("https://esm.sh/@iconify-json/mdi/icons.json", {
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
      ...(user.presets ?? []),
    ] as UserConfig["presets"],

    preflights: [
      {
        getCSS: ({ theme: _ }) => `
          /* see https://unocss.dev/integrations/runtime#preventing-fouc */
          [un-cloak] {
            display: none !important;
          }

          :root {
            --nui-c-context: 125,125,125;
          }

          html {
            background-color: #ffffff;
          }

          html.dark {
            color-scheme: dark;
            background-color: #151515;
            color: #ffffff;
          }

          ::selection {
            background: #8884;
          }

          /* Color Mode transition */
          ::view-transition-old(root),
          ::view-transition-new(root) {
            animation: none;
            mix-blend-mode: normal;
          }
          ::view-transition-old(root) {
            z-index: 1;
          }
          ::view-transition-new(root) {
            z-index: 2147483646;
          }
          .dark::view-transition-old(root) {
            z-index: 2147483646;
          }
          .dark::view-transition-new(root) {
            z-index: 1;
          }
        `,
      },
      ...(user.preflights ?? []),
    ],
    // NOTE: build step required for transformers (see @unocss/unocss#1673)
    // transformers: [transformerDirectives(), transformerVariantGroup()],
  };
}

export default presetNetzo;
