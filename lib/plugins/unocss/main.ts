import type { Options } from './mod.ts'
import { injectScript } from '../utils.ts'

const CDN = 'https://cdn.jsdelivr.net/npm'

export default function main(options: Options = 'uno') {
  if (typeof options === 'string') {
    injectScript(`${CDN}/@unocss/runtime/${options}.global.js`)
  } else if (typeof options === 'object') window.__unocss = options
}
