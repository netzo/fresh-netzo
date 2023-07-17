import { JSX } from 'preact'
import { IS_BROWSER } from 'fresh/runtime.ts'

interface NMarkdownProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  markdown: string
}

export function NMarkdown(props: NMarkdownProps) {
  const renderMarkdown = (markdown: string) => {
    return markdown
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br />')
  }

  return props.markdown && IS_BROWSER
    ? <span class='n-markdown'>{renderMarkdown(props.markdown)}</span>
    : <span class='n-markdown' />
}
