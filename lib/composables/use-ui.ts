import { deepMerge } from "../deps/std/collections/deep_merge.ts";
import { cn } from "../components/utils.ts";

export const useUI = <T = Record<string, unknown>>(ui: Partial<T>, config: Partial<T> = {}): T => {
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
