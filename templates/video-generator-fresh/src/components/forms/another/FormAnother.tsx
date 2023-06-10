/** @jsx h */
import { h } from 'preact'

interface FormProps {
  onSubmit: (e: Event) => Promise<any>
}

export default ({ onSubmit }: FormProps) => {
  return (
    <form class='flex flex-col' onSubmit={onSubmit}>
      <fieldset class='flex flex-col'>
      </fieldset>
    </form>
  )
}
