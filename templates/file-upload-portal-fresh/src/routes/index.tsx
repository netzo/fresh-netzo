/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from 'preact'
import { asset, Head } from '$fresh/runtime.ts'
import { Handlers } from '$fresh/server.ts'
import { signal } from '@preact/signals'
import Form from '../islands/Form.tsx'

const meta = {
  title: 'File Upload Portal',
  description:
    'A file upload tool to ease data processing and syncing from files.',
}

// see https://creatomate.com/blog/the-best-video-generation-apis

export const handler: Handlers = {
  GET: async (_req, ctx) => {
    return await ctx.render()
  },
  POST: async (req, _ctx) => {
    const form = await req.formData()
    const email = form.get('email')?.toString()
    const files = form.get('files')?.toString()
    console.log({ email, files })
    // redirect to home page
    const headers = new Headers()
    headers.set('Location', '/')
    return new Response(undefined, { status: 303, headers }) // 303: See Other
  },
}

const isLoading = signal(false)

export default () => {
  return (
    <>
      <Head>
        <title>{`${meta.title} | Netzo`}</title>
        <meta name='description' content={meta.description} />
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
        <link rel='stylesheet' href={asset('/main.css')} />
      </Head>

      <body class='flex flex-col'>
        <header className='flex justify-between items-center py-6'>
          <span className='flex items-center'>
            <img src={asset('/logo.svg')} className='block h-8' />
            <div className='ml-4'>
              <h1>{meta.title}</h1>
              <p>{meta.description}</p>
            </div>
          </span>
          <a href='https://netzo.io' target='_blank'>
            <img src={asset('/built-with-netzo.svg')} className='block h-8' />
          </a>
        </header>

        <main class='flex-1'>
          <Form />
        </main>
      </body>
    </>
  )
}
