/** @jsx h */
/** @jsxFrag Fragment */
import { h } from 'preact'
import { asset, Head } from '$fresh/runtime.ts'
import { AppProps } from '$fresh/src/server/types.ts'

const meta = {
  title: 'File Upload Portal',
  description:
    'A file upload tool to ease data processing and syncing from files.',
}

export default ({ Component }: AppProps) => {
  return (
    <html data-custom='data'>
      <Head>
        <title>{`${meta.title} | Netzo`}</title>
        <meta name='description' content={meta.description} />
        <link rel='stylesheet' href={asset('/main.css')} />
      </Head>

      <body>
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

        <main>
          <Component />
        </main>

        <footer className='flex justify-center py-3'>
          <a href='https://netzo.io' target='_blank'>
            <img src={asset('/built-with-netzo.svg')} className='h-8' />
          </a>
        </footer>
      </body>
    </html>
  )
}
