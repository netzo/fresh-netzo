// unocss might have twMerge alternative soon
// see https://github.com/unocss/unocss/issues/2748
import { twMerge } from "../deps/tailwind-merge.ts";
import { type ClassValue, clsx } from "../deps/clsx.ts";
import { createTwc } from "../deps/react-twc.ts";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const twx = createTwc({ compose: cn });
