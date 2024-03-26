import type { DeepPartial } from "../../../deps/@unocss/core.ts";

import type { Theme as ShadcnTheme, ThemeCSSVarsVariant } from "./themes.ts";

export type ShadcnThemeColor = ShadcnTheme["name"];

type ArrayOrSingle<T> = T | T[];

export type ColorOptions =
  | ShadcnThemeColor
  | ThemeCSSVarsVariant
  | {
    base: ShadcnThemeColor;
    color: DeepPartial<ThemeCSSVarsVariant>;
  };

export type ThemeOptions = {
  /**
   * @default 'zinc'
   */
  color?: ColorOptions;
  /**
   * @default 0.5
   */
  radius?: number;
};

export type PresetShadcnOptions = ArrayOrSingle<ThemeOptions>;
