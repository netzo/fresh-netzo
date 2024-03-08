import type { DeepPartial } from "../../../deps/@unocss/core.ts";
import type { Theme as ShadcnTheme, ThemeCSSVarsVariant } from "./themes.ts";

export { ShadcnTheme, ThemeCSSVarsVariant };

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
   * @default 0.0
   */
  radius?: number;
};
