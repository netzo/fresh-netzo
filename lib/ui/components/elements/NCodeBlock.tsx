import { JSX } from 'preact'
import { computed } from '../../../deps.ts'
import { n } from '../../utils/mod.ts'

export interface NCodeBlockProps extends JSX.HTMLAttributes<HTMLPreElement> {
  code: string
  lang?: string
  lines?: boolean
  transformRendered?: (code: string) => string
}

export function NCodeBlock(props: NCodeBlockProps) {
  const ui = (extra?: string) => ({
    ...props,
    class: n([
      'n-code-block',
      props.lines ? 'n-code-block-lines' : '',
      props.class,
      extra,
    ]),
  })

  const rendered = computed(() => {
    const result = devToolsClient.value?.devtools.renderCodeHighlight(
      props.code,
      props.lang as string,
    ) || { code: props.code, supported: false }
    if (result.supported && props.transformRendered) {
      result.code = props.transformRendered(result.code)
    }
    return result
  })

  return (
    <>
      {props.lang && rendered.value.supported
        ? <pre {...ui()} innerHTML={rendered.value.code} />
        : (
          <pre {...ui()}>
            <pre class="shiki">
              <code>
                {props.code.split('\n').map((line, idx) => (
                    <span class="line" key={idx}>{line}</span>
                ))}
              </code>
            </pre>
          </pre>
        )}
    </>
  )
}
