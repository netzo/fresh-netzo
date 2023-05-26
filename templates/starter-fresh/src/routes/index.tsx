/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from 'preact'
import Counter from '../islands/Counter.tsx'

export default function Home() {
  return (
    <div class='text-red text-xl'>
      <img
        src='/logo.svg'
        width='128'
        height='128'
        alt='the fresh logo: a sliced lemon dripping with juice'
      />
      <p>
        Welcome to Fresh. Try to update this message in the ./routes/index.tsx
        file, and refresh.
      </p>
      <Counter start={3} />
    </div>
  )
}
