import { Head } from 'fresh/runtime.ts'
import { PageProps } from 'fresh/server.ts'
import App from '../islands/App.tsx'

const meta = {
  title: 'DEPT Revenue Management',
  description: 'An internal tool to track and analyze product revenue trends.',
}

export default (props: PageProps) => {
  return (
    <>
      <Head>
        <title>{`${meta.title} | Netzo`}</title>
        <meta name='description' content={meta.description} />
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
      </Head>

      <body class='flex flex-col text-bg-white dark:bg-gray-900 dark:text-white'>
        <header class='flex justify-between items-center py-6 px-10'>
          <div>
            <h1 class='text-2xl mb-1 font-semibold dark:text-white'>
              {meta.title}
            </h1>
            <p class='text-sm dark:text-gray-300'>{meta.description}</p>
          </div>
          <a href='https://netzo.io' target='_blank'>
            <img
              src='https://netzo.io/images/built-with-netzo-light.svg'
              class='h-10'
            />
          </a>
        </header>

        <main class='flex-1 h-full'>
          <App />
        </main>
      </body>
    </>
  )
}
