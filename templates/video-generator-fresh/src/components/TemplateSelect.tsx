/** @jsx h */
import { h } from 'preact'
import { Signal } from '@preact/signals'

interface TemplateSelectProps {
  template: Signal<string>
  templates: string[]
}

export default ({ template, templates }: TemplateSelectProps) => {
  const onChange = (e: Event) => {
    const { value } = e.target as HTMLSelectElement
    template.value = value
  }

  return (
    <div>
      <label
        htmlFor='template'
        class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        Select a Template:
      </label>
      <select
        name='template'
        id='template'
        class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        onChange={onChange}
      >
        {templates.map((template) => (
          <option key={template} value={template}>{template}</option>
        ))}
      </select>
    </div>
  )
}
