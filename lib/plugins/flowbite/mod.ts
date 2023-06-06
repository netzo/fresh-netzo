import { Plugin } from '$fresh/server.ts'
import { PluginRenderContext } from '$fresh/src/server/types.ts'

export type FlowbitePluginOptions = {
  additionalStylesheets?: string[]
  additionalScripts?: string[]
  plugins?: {
    datepicker?: boolean
  }
}

export default function flowbitePlugin(
  options: FlowbitePluginOptions = {},
): Plugin {
  if (!options.additionalScripts) options.additionalScripts = []
  if (!options.additionalStylesheets) options.additionalStylesheets = []
  if (!options.plugins) options.plugins = { datepicker: true }

  if (options.plugins.datepicker) {
    options.additionalScripts.push(
      'https://unpkg.com/flowbite@1.6.3/dist/datepicker.js',
    )
  }

  return {
    name: 'flowbite',
    entrypoints: { 'main': import.meta.resolve('./plugin.ts') },
    render(ctx: PluginRenderContext) {
      ctx.render()
      return {
        scripts: [
          {
            entrypoint: 'main',
            state: options,
          },
        ],
      }
    },
  }
}
