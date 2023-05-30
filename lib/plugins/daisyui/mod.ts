import type { Plugin } from '../../deps.ts'

export interface Options { }

export default function unocss(options: Options = {}): Plugin {
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
