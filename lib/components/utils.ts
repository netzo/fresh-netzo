// unocss might have twMerge alternative soon
// see https://github.com/unocss/unocss/issues/2748
import { type ClassValue, clsx } from "../deps/clsx.ts";
import { createTwc } from "../deps/react-twc.ts";
import { twMerge } from "../deps/tailwind-merge.ts";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const twx = createTwc({ compose: cn });
