import { JSX } from 'preact'

export default (props: JSX.HTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    type='button'
    class='flex-1 text-white bg-gray-400 dark:bg-gray-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center'
  >
    Upload to Google Drive
  </button>
)
