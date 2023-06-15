/** @jsx h */
import { h, JSX } from 'preact'

interface Props {
  variant: 'primary' | 'secondary'
  text: string
}

const classList = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white',
  secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
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
