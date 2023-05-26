/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from 'preact'
import { asset, Head } from '$fresh/runtime.ts'
import { Flex, Text, Title } from '@tremor/react'
import Shell from '../islands/Shell.tsx'

// Dashboard Settings
const title = 'Sales Dashboard'
const description =
  'A sales dashboard to track performance of sales teams in real-time, and provides a variety of metrics to help make informed decisions.'

export default () => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className='p-6'>
        <Flex justifyContent='justify-between' spaceX='space-x-2'>
          <Flex justifyContent='justify-start'>
            <svg className='mr-6' width='64' height='64' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M18 15h-2v2h2m0-6h-2v2h2m2 6h-8v-2h2v-2h-2v-2h2v-2h-2V9h8M10 7H8V5h2m0 6H8V9h2m0 6H8v-2h2m0 6H8v-2h2M6 7H4V5h2m0 6H4V9h2m0 6H4v-2h2m0 6H4v-2h2m6-10V3H2v18h20V7H12Z'
              >
              </path>
            </svg>
            <div>
              <Title>{title}</Title>
              <Text marginTop='mt-2'>{description}</Text>
            </div>
          </Flex>
          <a href='https://netzo.io' target='_blank'>
            <img src={asset('/logo.svg')} className='h-8' />
          </a>
        </Flex>

        <Shell />
      </main>
    </>
  )
}
