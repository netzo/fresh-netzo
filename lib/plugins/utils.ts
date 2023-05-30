export function injectStylesheet(source: string) {
  const stylesheet = document.createElement('link')
  stylesheet.rel = 'stylesheet'
  stylesheet.type = 'text/css'
  stylesheet.href = source
  document.head.appendChild(stylesheet)
}

export function injectScript(source: string, async = false, defer = false) {
  const script = document.createElement('script')
  script.src = source
  script.async = async
  script.defer = defer
  document.head.appendChild(script)
}