// unocss might have twMerge alternative soon
// see https://github.com/unocss/unocss/issues/2748
import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
