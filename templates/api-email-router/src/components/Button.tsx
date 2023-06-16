/** @jsx h */
import { h, JSX } from 'preact'

interface Props {
  variant: 'primary' | 'secondary'
  text: string
}

const classList = {
  primary:
    'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800',
  secondary:
    'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700',
}

export default function Button(
  props: JSX.HTMLAttributes<HTMLButtonElement> & Props,
) {
  return (
    <button {...props} class={classList[props.variant]}>
      {props.text}
    </button>
  )
}
