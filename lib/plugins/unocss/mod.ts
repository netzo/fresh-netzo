import type { Plugin } from '../../deps.ts'

declare global {
  interface Window {
    __unocss: Record<string, unknown>
  }
}

// see https://unocss.dev/integrations/runtime#builds
export type Options =
  | 'uno'
  | 'core'
  | 'attributify'
  | 'mini'
  | Record<string, unknown>

export default (options: Options = 'uno'): Plugin => {
  return {
    name: 'unocss',
    entrypoints: { 'main': import.meta.resolve('./main.ts') },
    render(ctx) {
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
