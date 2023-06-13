/** @jsx h */
import { h } from 'preact'

export type RenderStatus =
  | 'queued' // render is queued waiting to be rendered
  | 'fetching' // assets are being fetched
  | 'rendering' // the asset is being rendered
  | 'saving' // the final asset is being saved to storage
  | 'done' // the asset is ready to be downloaded
  | 'failed' // there was an error rendering the asset
  | undefined

const Loading = ({ text }: { text: string }) => (
  <div role='status' class='h-fit my-4 mx-auto'>
    <svg
      aria-hidden='true'
      class='mx-auto mb-3 w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
      viewBox='0 0 100 101'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
        fill='currentColor'
      />
      <path
        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
        fill='#1D4ED8'
      />
    </svg>
    <span>{text}</span>
  </div>
)

const AlertFailed = () => (
  <div
    class='flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800'
    role='alert'
  >
    <svg
      aria-hidden='true'
      class='flex-shrink-0 inline w-5 h-5 mr-3'
      fill='currentColor'
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fill-rule='evenodd'
        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
        clip-rule='evenodd'
      >
      </path>
    </svg>
    <span>Info</span>
    <div>
      <span class='font-medium'>Error:</span>{' '}
      Something went wrong. Please try again.
    </div>
  </div>
)

export default ({ video }) => {
  switch (video.value.response?.status satisfies RenderStatus) {
    case 'queued':
      return <Loading text='Queued...' />
    case 'fetching':
      return <Loading text='Fetching...' />
    case 'rendering':
      return <Loading text='Rendering...' />
    case 'saving':
      return <Loading text='Saving...' />
    case 'done':
      return (
        <video
          controls
          alt='Car Dealership Video'
          src={video.value.response.url}
          class='w-full h-auto border-0'
        />
      )
    case 'failed':
      return <AlertFailed />
    default:
      return (
        <div
          role='status'
          class='flex items-center justify-center w-full h-56 md:h-96 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700'
        >
          <svg
            class='w-12 h-12 text-gray-200 dark:text-gray-600'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 384 512'
          >
            <path d='M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z' />
          </svg>
          <span class='sr-only'>Loading...</span>
        </div>
      )
  }
}
