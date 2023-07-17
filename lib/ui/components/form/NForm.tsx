import { JSX } from 'preact'

export interface NFormProps extends JSX.HTMLAttributes<HTMLFormElement> {
  onSubmit?: (e: Event) => void
  children?: preact.ComponentChildren
}

export function NForm(props: NFormProps) {
  return (
    <form
      class='n-form n-form-base'
      onSubmit={props.onSubmit}
    >
      {props.children}
    </form>
  )
}
