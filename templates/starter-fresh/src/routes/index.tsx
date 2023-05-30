/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from 'preact'
import { Head } from '$fresh/runtime.ts'
import Counter from '../islands/Counter.tsx'

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div className='p-4 mx-auto max-w-screen-md'>
        <img
          src='/logo.svg'
          className='w-32 h-32'
          alt='the fresh logo: a sliced lemon dripping with juice'
        />
        <p className='my-6'>
          Welcome to `fresh`. Try updating this message in the
          ./routes/index.tsx file, and refresh.
        </p>
        <Counter start={3} />
      </div>
    </>
  )
}
