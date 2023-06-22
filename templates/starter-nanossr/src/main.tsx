/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { ssr, tw } from 'https://crux.land/nanossr@0.0.1'

const Hello = (props) => (
  <div class={tw`bg-white flex h-screen`}>
    <h1 class={tw`text-5xl text-gray-900 m-auto mt-20`}>
      Hello {props.name}!
    </h1>
  </div>
)

console.log('Listening on http://localhost:8080')
serve((req: Request) => {
  const url = new URL(req.url)
  const name = url.searchParams.get('name') ?? 'world'
  return ssr(() => <Hello name={name} />)
})
