import { deepMerge } from "../deps/std/collections/deep_merge.ts";
// unocss might have twMerge alternative soon
// see https://github.com/unocss/unocss/issues/2748
import { type ClassValue, clsx } from "../deps/clsx.ts";
import { createTwc } from "../deps/react-twc.ts";
import { twMerge } from "../deps/tailwind-merge.ts";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const twx = createTwc({ compose: cn });

/* Internal utility used by netzo for components */
export const useUI = <T = Record<string, unknown>>(
  ui: Partial<T>,
  config: Partial<T> = {},
): T => {
  const keys = [...new Set([...Object.keys(ui), ...Object.keys(config)])];
  return keys.reduce((acc, key) => {
    const {
      class: configClass,
      className: configClassName,
      ...configRest
    } = (config as any)?.[key] ?? {};
    const {
      class: uiClass,
      className: uiClassName,
      ...uiRest
    } = (ui as any)?.[key] ?? {};
    const className = cn(configClass, configClassName, uiClass, uiClassName);
    return {
      ...acc,
      [key]: { ...deepMerge(configRest, uiRest), className },
    };
  }, {} as T) as T;
};
