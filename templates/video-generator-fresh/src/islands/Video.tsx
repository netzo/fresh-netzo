/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from 'preact'
import { type Signal, useComputed } from '@preact/signals'
import ProgressSpinner from '../components/ProgressSpinner.tsx'
import ButtonEmail from '../components/buttons/ButtonEmail.tsx'
import ButtonUpload from '../components/buttons/ButtonUpload.tsx'

export type RenderStatus =
  | 'idle' // the asset is ready to be rendered
  | 'loading' // the asset is being loaded
  // form api:
  | 'queued' // render is queued waiting to be rendered
  | 'fetching' // assets are being fetched
  | 'rendering' // the asset is being rendered
  | 'saving' // the final asset is being saved to storage
  | 'done' // the asset is ready to be downloaded
  | 'failed' // there was an error rendering the asset

interface Props {
  status: Signal<RenderStatus>
  url: Signal<string>
}

export default (props: Props) => {
  const disabled = useComputed(() => !['done'].includes(props.status.value))

  const placeholder = useComputed(() => {
    switch (props.status.value) {
      case 'queued':
        return (
          <div
            role='status'
            class='animate-pulse flex items-center justify-center w-full h-56 md:h-96 bg-gray-300 rounded-lg dark:bg-gray-700'
          >
            <ProgressSpinner text='Queued...' />
          </div>
        )
      case 'fetching':
        return (
          <div
            role='status'
            class='animate-pulse flex items-center justify-center w-full h-56 md:h-96 bg-gray-300 rounded-lg dark:bg-gray-700'
          >
            <ProgressSpinner text='Fetching...' />
          </div>
        )
      case 'rendering':
        return (
          <div
            role='status'
            class='animate-pulse flex items-center justify-center w-full h-56 md:h-96 bg-gray-300 rounded-lg dark:bg-gray-700'
          >
            <ProgressSpinner text='Rendering...' />
          </div>
        )
      case 'saving':
        return (
          <div
            role='status'
            class='animate-pulse flex items-center justify-center w-full h-56 md:h-96 bg-gray-300 rounded-lg dark:bg-gray-700'
          >
            <ProgressSpinner text='Saving...' />
          </div>
        )
      case 'done':
        return (
          <video
            controls
            alt='Car Dealership Video'
            src={props.url.value}
            class='w-full h-auto border-0'
          />
        )
      case 'failed':
        return (
          <>
            <AlertFailed />
            <div
              role='status'
              class='animate-pulse flex items-center justify-center w-full h-56 md:h-96 bg-gray-300 rounded-lg dark:bg-gray-700'
            >
              <PlayIcon />
            </div>
          </>
        )
      default:
        return (
          <div
            role='status'
            class='flex items-center justify-center w-full h-56 md:h-96 bg-gray-300 rounded-lg dark:bg-gray-700'
          >
            <PlayIcon />
          </div>
        )
    }
  })

  return (
    <>
      {placeholder.value}
      <div class='flex space-x-3 my-4'>
        <ButtonEmail disabled={disabled.value} url={props.url} />

        <ButtonUpload disabled={disabled.value} />
      </div>
    </>
  )
}

function PlayIcon() {
  return (
    <svg
      class='w-12 h-12 text-gray-200 dark:text-gray-600'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      fill='currentColor'
      viewBox='0 0 384 512'
    >
      <path d='M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z' />
    </svg>
  )
}

function AlertFailed() {
  return (
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
}
