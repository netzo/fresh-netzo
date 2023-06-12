/** @jsx h */
import { h } from 'preact'

interface Props {
  onSubmit: (e: Event) => Promise<void>
}

export default ({ onSubmit }: Props) => (
  <form method='post' onSubmit={onSubmit}>
    <button
      type='submit'
      class='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
    >
      Submit
    </button>

    <label for='soundtrack'>Soundtrack</label>
    <input
      type='text'
      id='soundtrack'
      name='Soundtrack'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      value='https://shotstack-assets.s3.ap-southeast-2.amazonaws.com/music/unminus/kring.mp3'
    />
  </form>
)
