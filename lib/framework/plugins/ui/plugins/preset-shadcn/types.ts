import type { DeepPartial } from "https://esm.sh/v135/@unocss/core@0.58.0?target=esnext";
import type { Theme as ShadcnTheme, ThemeCSSVarsVariant } from "./themes.ts";

export type ShadcnThemeColor = ShadcnTheme["name"];

export type ColorOptions =
  | ShadcnThemeColor
  | ThemeCSSVarsVariant
  | {
    base: ShadcnThemeColor;
    color: DeepPartial<ThemeCSSVarsVariant>;
  };

export type PresetShadcnOptions = {
  /**
   * @default 'blue'
   */
  color?: ColorOptions;
  /**
   * @default 0.5
   */
  radius?: number;
};
