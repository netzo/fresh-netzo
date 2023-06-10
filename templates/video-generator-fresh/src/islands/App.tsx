/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from 'preact'
import { signal } from '@preact/signals'
import TemplateSelect from '../components/TemplateSelect.tsx'
import FormCarDealership from '../components/forms/car-dealership/Form.tsx'
import FormRealEstate from '../components/forms/real-estate/Form.tsx'
import templateCarDealership from '../components/forms/car-dealership/template.ts'
import templateRealEstate from '../components/forms/real-estate/template.ts'

const templatesEnum = {
  'Car Dealership': templateCarDealership,
  'Real Estate': templateRealEstate,
}

const template = signal<keyof typeof templatesEnum>('Car Dealership')

const result = signal({})

export default () => {
  const onSubmit = async (event: Event) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())
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
    <>
      <div class='px-10 mb-6'>
        <TemplateSelect
          template={template}
          templates={Object.keys(templatesEnum)}
        />
      </div>

      <div class='px-10 mb-4 border-b border-gray-200 dark:border-gray-700'>
        <ul
          class='flex flex-wrap -mb-px text-sm font-medium text-center'
          id='myTab'
          data-tabs-toggle='#myTabContent'
          role='tablist'
        >
          <li class='mr-2' role='presentation'>
            <button
              class='inline-flex p-4 border-b-2 rounded-t-lg'
              id='webform-tab'
              data-tabs-target='#webform'
              type='button'
              role='tab'
              aria-controls='webform'
              aria-selected='false'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                class='w-5 h-5 mr-2 text-blue-600 dark:text-blue-500'
              >
                <path d='M17 7h5v10h-5v2a1 1 0 0 0 1 1h2v2h-2.5c-.55 0-1.5-.45-1.5-1c0 .55-.95 1-1.5 1H12v-2h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2V2h2.5c.55 0 1.5.45 1.5 1c0-.55.95-1 1.5-1H20v2h-2a1 1 0 0 0-1 1v2M2 7h11v2H4v6h9v2H2V7m18 8V9h-3v6h3Z' />
              </svg>
              WebForm
            </button>
          </li>
          <li class='mr-2' role='presentation'>
            <button
              class='inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              id='csv-upload-tab'
              data-tabs-target='#csv-upload'
              type='button'
              role='tab'
              aria-controls='csv-upload'
              aria-selected='false'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                class='w-5 h-5 mr-2 text-blue-600 dark:text-blue-500'
              >
                <path d='M19 11V9h-8V5H9v4H5v2h4v8h2v-8h8m0-8c.5 0 1 .2 1.39.61C20.8 4 21 4.5 21 5v14c0 .5-.2 1-.61 1.39c-.39.41-.89.61-1.39.61H5c-.5 0-1-.2-1.39-.61C3.2 20 3 19.5 3 19V5c0-.5.2-1 .61-1.39C4 3.2 4.5 3 5 3h14Z' />
              </svg>
              CSV Upload
            </button>
          </li>
        </ul>
      </div>
      <div id='myTabContent'>
        <div
          class='hidden p-4'
          id='webform'
          role='tabpanel'
          aria-labelledby='webform-tab'
        >
          <form onSubmit={onSubmit}>
            <div class='grid grid-cols-1 md:grid-cols-2 gap-10 p-2 h-full overflow-y-auto'>
              <>
                {template.value === 'Car Dealership' && (
                  <FormCarDealership onSubmit={onSubmit} />
                )}
                {template.value === 'Real Estate' && (
                  <FormRealEstate onSubmit={onSubmit} />
                )}
              </>
              <div class='pa-6'>
                RESULT: {JSON.stringify(result.value, null, 2)}
              </div>
            </div>
          </form>
        </div>
        <div
          class='hidden p-4'
          id='csv-upload'
          role='tabpanel'
          aria-labelledby='csv-upload-tab'
        >
          <p class='text-sm text-gray-500 dark:text-gray-400'>
            Work in progress...
          </p>
        </div>
      </div>
    </>
  )
}
