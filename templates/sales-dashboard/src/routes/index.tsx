import { Head } from '$fresh/runtime.ts'
import { PageProps } from '$fresh/server.ts'
import Shell from '../islands/Shell.tsx'

const meta = {
  title: 'Sales Dashboard',
  description:
    'A sales dashboard to track performance of sales teams in real-time, and provides a variety of metrics to help make informed decisions.',
}

export default (props: PageProps) => {
  return (
    <>
      <Head>
        <title>{`${meta.title} | Netzo`}</title>
        <meta name='description' content={meta.description} />
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
      </Head>

      <body class='flex flex-col'>
        <header class='flex justify-between items-center py-6 px-10'>
          <div>
            <h1 class='text-2xl mb-1 font-semibold'>
              {meta.title}
            </h1>
            <p class='text-sm'>{meta.description}</p>
          </div>
          <a href='https://netzo.io' target='_blank'>
            <img
              src='https://netzo.io/images/built-with-netzo-light.svg'
              class='h-10'
            />
          </a>
        </header>

        <main class='flex-1 px-10'>
          <Shell />
        </main>
      </body>
    </>
  )
}
