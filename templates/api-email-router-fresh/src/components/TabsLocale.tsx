/** @jsx h */
import { h } from 'preact'

interface Props {
  locale: string
}

export default function TabsLocale(props: Props) {
  const getClass = (locale: string) => {
    return locale === props.locale
      ? `inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group`
      : `inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group`
  }
  return (
    <ul class='flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400'>
      <li class='mr-2'>
        <a href='/en' class={getClass('en')} aria-current='page'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 72 72'
            class='w-6 h-6 mr-2'
          >
            <path fill='#1e50a0' d='M5 17h62v38H5z' />
            <path
              fill='#fff'
              d='M40 28.856V32h10.181L67 21.691V17h-7.654L40 28.856z'
            />
            <path
              fill='#d22f27'
              d='M67 17h-3.827L40 31.203V32h3.482L67 17.586V17z'
            />
            <path
              fill='#fff'
              d='M59.347 55H67v-4.692L50.182 40H40v3.143L59.347 55z'
            />
            <path
              fill='#d22f27'
              d='M67 55v-2.347L46.355 40h-4.787l24.474 15H67z'
            />
            <path
              fill='#fff'
              d='M32 43.144V40H21.819L5 50.309V55h7.654L32 43.144z'
            />
            <path
              fill='#d22f27'
              d='M5 55h3.827L32 40.797V40h-3.482L5 54.414V55z'
            />
            <path
              fill='#fff'
              d='M12.653 17H5v4.692L21.818 32H32v-3.143L12.653 17z'
            />
            <path
              fill='#d22f27'
              d='M5 17v2.347L25.646 32h4.786L5.958 17H5z'
            />
            <path fill='#fff' d='M5 31h62v10H5z' />
            <path fill='#fff' d='M31 17h10v38H31z' />
            <path fill='#d22f27' d='M5 33h62v6H5z' />
            <path fill='#d22f27' d='M33 17h6v38h-6z' />
            <path
              fill='none'
              stroke='#000'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M5 17h62v38H5z'
            />
          </svg>
          English
        </a>
      </li>
      <li class='mr-2'>
        <a href='/es' class={getClass('es')} aria-current='page'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 72 72'
            class='w-6 h-6 mr-2'
          >
            <path fill='#f1b31c' d='M5 17h62v38H5z' />
            <path
              fill='#d22f27'
              d='M23 33v7a2.006 2.006 0 0 1-2 2h-4a2.006 2.006 0 0 1-2-2v-7M5 17h62v9H5zm0 29h62v9H5z'
            />
            <path fill='#f1b31c' d='M19 33h4v4h-4z' />
            <circle cx='19' cy='37' r='1.5' fill='#6a462f' />
            <path
              fill='none'
              stroke='#6a462f'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M27 33v9m-16-9v9m4-12a8.568 8.568 0 0 1 4-1m4 1a8.568 8.568 0 0 0-4-1m-4 4h8m0 0v7a2.006 2.006 0 0 1-2 2h-4a2.006 2.006 0 0 1-2-2v-7m-5 9h2m14 0h2'
            />
            <path
              fill='none'
              stroke='#000'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M5 17h62v38H5z'
            />
          </svg>
          Español
        </a>
      </li>
    </ul>
  )
}
