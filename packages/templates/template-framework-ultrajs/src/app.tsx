import useAsset from 'https://deno.land/x/ultra@v2.1.7/hooks/use-asset.js'
import hydrate from 'https://deno.land/x/ultra@v2.1.7/hydrate.js'
import React from 'https://esm.sh/react@18.2.0'
import { useState } from 'https://esm.sh/react@18.2.0'

export default function App() {
  const [count, setCount] = useState(0)
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <title>lite</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body>
        <main>
          <h1>
            Ultra Lite
          </h1>
          <button onClick={() => setCount(count + 1)}>
            the count is {count}
          </button>
        </main>
      </body>
    </html>
  )
}

typeof (document) !== 'undefined' && hydrate(document, <App />)
