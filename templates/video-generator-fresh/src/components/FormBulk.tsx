/** @jsx h */
import { h } from 'preact'
import ButtonGenerate from './buttons/ButtonGenerate.tsx'

export default ({ url, loading, onSubmit }) => {
  return (
    <form method='post' onSubmit={onSubmit}>
      <p class='mb-3 text-sm text-gray-500 dark:text-gray-400'>
        1. Download the CSV file of the selected template and fill it out (one
        each row will generate one video).
      </p>
      <a
        href={url.value}
        target='_blank'
        class='my-4 flex w-full justify-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 cursor-pointer'
      >
        Download Video Template
      </a>

      <p class='my-3 text-sm text-gray-500 dark:text-gray-400'>
        2. Upload the completed CSV file and click the button below to generate
        videos in bulk.
      </p>

      <div class='flex items-center justify-center w-full'>
        <label
          for='dropzone-file'
          class='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
        >
          <div class='flex flex-col items-center justify-center pt-5 pb-6'>
            <svg
              aria-hidden='true'
              class='w-10 h-10 mb-3 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
              >
              </path>
            </svg>
            <p class='mb-2 text-sm text-gray-500 dark:text-gray-400'>
              <span class='font-semibold'>Click to upload</span>{' '}
              or drag and drop
            </p>
            <p class='text-xs text-gray-500 dark:text-gray-400'>
              CSV
            </p>
          </div>
          <input
            id='dropzone-file'
            type='file'
            accept='.csv'
            class='hidden'
            required
          />
        </label>
      </div>

      <ButtonGenerate disabled loading={loading} />
    </form>
  )
}
