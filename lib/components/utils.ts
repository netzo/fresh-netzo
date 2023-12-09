// unocss might have twMerge alternative soon
// see https://github.com/unocss/unocss/issues/2748
import { twMerge } from "netzo/deps/tailwind-merge.ts";
import { type ClassValue, clsx } from "netzo/deps/clsx.ts";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
