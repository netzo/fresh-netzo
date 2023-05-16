import { setup, tw } from 'https://esm.sh/twind@0.16.16'
import { getStyleTag, virtualSheet } from 'https://esm.sh/twind@0.16.16/sheets'

const sheet = virtualSheet()

setup({
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['Times', 'serif'],
    },
  },
  sheet,
})

interface SSROptions {
  title: string
  renderBody: () => string
}

function ssr({ title, renderBody }: SSROptions) {
  // 1. reset sheet for new rendering
  sheet.reset()
  // 2. render app (note render function must be called here)
  const body = renderBody()
  // 3. create style tag with generated CSS
  const styleTag = getStyleTag(sheet)

  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${title}</title>
        ${styleTag}
      </head>
      <body>
        ${body}
      </body>
    </html>`
}

export { ssr, tw }
