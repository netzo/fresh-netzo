import { injectScript, injectStylesheet } from '../utils.ts'
import { FlowbitePluginOptions } from './mod.ts'

export default function main(state: FlowbitePluginOptions) {
  injectScript('https://unpkg.com/flowbite@1.6.5/dist/flowbite.js')
  ;(state?.additionalScripts ?? []).forEach((script) => injectScript(script))
  ;(state?.additionalStylesheets ?? []).forEach((stylesheet) =>
    injectStylesheet(stylesheet)
  )
}
