import type { Plugin } from '../../deps.ts'

// export interface Options {}

export default (options = {}): Plugin => {
  return {
    name: 'daisyui',
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
