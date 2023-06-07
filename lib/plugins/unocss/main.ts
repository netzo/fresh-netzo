import type { Options } from './mod.ts'
import { injectScript } from '../utils.ts'

export default function main(options: Options = 'uno') {
  if (typeof options === 'string') {
    injectScript(
      `https://cdn.jsdelivr.net/npm/@unocss/runtime/${options}.global.js`,
    )
  } else if (typeof options === 'object') window.__unocss = options
}
