import { getHighlighter, Highlighter, Lang, signal } from '../../deps.ts'

export const shiki = signal<Highlighter>()

let promise: Promise<any> | null = null

export function renderCodeHighlight(code: string, lang: Lang) {
  const mode = 'dark' // useColorMode()

  if (!promise && !shiki.value) {
    // Only loading when needed
    promise = getHighlighter({
      themes: [
        'vitesse-dark',
        'vitesse-light',
      ],
      langs: [
        'css',
        'javascript',
        'typescript',
        'html',
        'vue',
        'vue-html',
        'bash',
        'diff',
      ],
    }).then((i) => {
      shiki.value = i
    })
  }

  const supported = shiki.value?.getLoadedLanguages().includes(lang)
  if (!supported) {
    return {
      code,
      supported,
    }
  }

  return {
    code: shiki.value!.codeToHtml(code, {
      lang,
      theme: mode.value === 'dark' ? 'vitesse-dark' : 'vitesse-light',
    }),
    supported: true,
  }
}
