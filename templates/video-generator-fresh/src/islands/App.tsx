/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from 'preact'
import { signal } from '@preact/signals'
import TemplateSelect from '../components/TemplateSelect.tsx'
import FormCarSales from '../components/forms/car-sales/FormCarSales.tsx'
import FormAnother from '../components/forms/another/FormAnother.tsx'
import templatesJson from '../data/template.ts'

const templates = Object.keys(templatesJson)

const template = signal<keyof typeof templatesJson>('car-sales')

const result = signal({})

export default () => {
  const onSubmit = async (data = {}) => {
    console.log({ data })
    try {
      const response = await fetch('https://shotstock.com/api/endpoint', {
        method: 'POST',
        body: JSON.stringify(data),
      })

      result.value = await response.json()
      console.log({ result: result.value })
      return result.value
    } catch (error) {
      console.error('Failed to send form:', error)
    }
  }

  return (
    <form class='px-10' onSubmit={onSubmit}>
      <TemplateSelect template={template} templates={templates} />
      <div class='grid grid-cols-1 md:grid-cols-2 gap-10 p-6 h-full overflow-y-auto'>
        <>
          {template.value === 'car-sales' && (
            <FormCarSales onSubmit={onSubmit} />
          )}
          {template.value === 'another' && <FormAnother onSubmit={onSubmit} />}
        </>
        <div class='pa-6'>
          RESULT: {JSON.stringify(result.value, null, 2)}
        </div>
      </div>
    </form>
  )
}
