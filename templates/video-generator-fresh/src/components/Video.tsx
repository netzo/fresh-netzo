/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from 'preact'
import type { Signal } from '@preact/signals'
import AlertFailed from './AlertFailed.tsx'
import ProgressSpinner from './ProgressSpinner.tsx'
import ButtonEmail from './buttons/ButtonEmail.tsx'
import ButtonDownload from './buttons/ButtonDownload.tsx'
import ButtonUpload from './buttons/ButtonUpload.tsx'

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

export default ({ status, url }: Props) => {
  const getIcon = ({ status, url }: Props) => {
    switch (status.value) {
      case 'queued':
        return <ProgressSpinner text='Queued...' />
      case 'fetching':
        return <ProgressSpinner text='Fetching...' />
      case 'rendering':
        return <ProgressSpinner text='Rendering...' />
      case 'saving':
        return <ProgressSpinner text='Saving...' />
      case 'done':
        return (
          <video
            controls
            alt='Car Dealership Video'
            src={url.value}
            class='w-full h-auto border-0'
          />
        )
      default:
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
  }

  return (
    <>
      {status.value === 'failed' && <AlertFailed />}
      <div
        role='status'
        class='flex items-center justify-center w-full h-56 md:h-96 bg-gray-300 rounded-lg dark:bg-gray-700'
      >
        {getIcon({ status, url })}
      </div>

      <div class='flex space-x-3 my-4'>
        <ButtonDownload />

        <ButtonEmail url={url} />

        <ButtonUpload />
      </div>
    </>
  )
}
