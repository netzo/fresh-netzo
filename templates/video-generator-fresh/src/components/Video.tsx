/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from 'preact'

export type RenderStatus =
  | 'queued' // render is queued waiting to be rendered
  | 'fetching' // assets are being fetched
  | 'rendering' // the asset is being rendered
  | 'saving' // the final asset is being saved to storage
  | 'done' // the asset is ready to be downloaded
  | 'failed' // there was an error rendering the asset
  | undefined

interface Props {
  video: Record<string, unknown>
}

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

export default ({ video }: Props) => {
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
        <>
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

          <div class='flex space-x-3 my-8'>
            <button
              type='button'
              disabled
              class='flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            >
              Download
            </button>

            <button
              data-modal-target='authentication-modal'
              data-modal-toggle='authentication-modal'
              type='button'
              class='flex-1 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800'
            >
              Send via Email
            </button>
            <div
              id='authentication-modal'
              tabIndex={-1}
              aria-hidden='true'
              class='fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full'
            >
              <div class='relative w-full max-w-md max-h-full'>
                <div class='relative bg-white rounded-lg shadow dark:bg-gray-700'>
                  <button
                    type='button'
                    class='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
                    data-modal-hide='authentication-modal'
                  >
                    <svg
                      aria-hidden='true'
                      class='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fill-rule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clip-rule='evenodd'
                      >
                      </path>
                    </svg>
                    <span class='sr-only'>Close modal</span>
                  </button>
                  <div class='px-6 py-6 lg:px-8 text-left'>
                    <h3 class='mb-4 text-xl font-medium text-gray-900 dark:text-white'>
                      Send via email
                    </h3>
                    <form class='space-y-4' action='#'>
                      <div>
                        <label
                          for='email'
                          class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                          Email
                        </label>
                        <input
                          type='email'
                          name='email'
                          id='email'
                          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                          placeholder='name@company.com'
                          autofocus
                          required
                        />
                      </div>
                      <div>
                        <label
                          for='subject'
                          class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                          Subject
                        </label>
                        <input
                          type='subject'
                          name='subject'
                          id='subject'
                          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                          placeholder='New Video Idea'
                        />
                      </div>
                      <div>
                        <label
                          for='message'
                          class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                          Message
                        </label>
                        <textarea
                          id='message'
                          rows={4}
                          class='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          placeholder='Write a friendly message here...'
                          value={`Hey, I just wanted to share this video with you. I hope you like it! ${video.value?.response?.url}`}
                        >
                        </textarea>
                      </div>
                      <button
                        type='button'
                        class='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                      >
                        Send
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <button
              type='button'
              disabled
              class='flex-1 text-white bg-gray-400 dark:bg-gray-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center'
            >
              Upload to Google Drive
            </button>
          </div>
        </>
      )
  }
}
