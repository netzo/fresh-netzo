import { injectScript, injectStylesheet } from '../utils.ts'
import { FlowbitePluginOptions } from './mod.ts'

export default function main(state: FlowbitePluginOptions = {}) {
  injectScript('https://unpkg.com/flowbite@1.6.5/dist/flowbite.js')
  const { additionalScripts = [], additionalStylesheets = [] } = state
  additionalScripts.forEach((script) => injectScript(script))
  additionalStylesheets.forEach((stylesheet) => injectStylesheet(stylesheet))
}
