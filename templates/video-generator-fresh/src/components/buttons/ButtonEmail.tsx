/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, JSX } from 'preact'
import { type Signal, useSignal } from '@preact/signals'

interface Props {
  url: Signal<string>
}

export default (props: Props & JSX.HTMLAttributes<HTMLButtonElement>) => {
  const data = useSignal({
    email: '',
    subject: 'Check out this video!',
    message:
      `Hey, I just wanted to share this video with you. I hope you like it! ${props.url.value}`,
  })

  return (
    <>
      <button
        {...props}
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
                    value={data.email}
                    onChange={(e) => (data.email = e.target.value)}
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
                    placeholder='Check out this video!'
                    value={data.subject}
                    onChange={(e) => (data.subject = e.target.value)}
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
                    value={data.message}
                    onChange={(e) => (data.message = e.target.value)}
                  >
                  </textarea>
                </div>
                <a
                  href={`#`}
                  target='_blank'
                  type='button'
                  class='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Send
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
