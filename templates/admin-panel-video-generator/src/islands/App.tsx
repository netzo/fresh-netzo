import { computed, signal } from '@preact/signals'
import Mustache from 'mustache'
import Video, { RenderStatus } from './Video.tsx'
import TemplateSelect from '../components/TemplateSelect.tsx'
import FormCarDealership from '../components/templates/car-dealership/Form.tsx'
import FormRealEstate from '../components/templates/real-estate/Form.tsx'
import FormBulk from '../components/FormBulk.tsx'
import templateCarDealership from '../components/templates/car-dealership/template.ts'
import templateRealEstate from '../components/templates/real-estate/template.ts'

const templatesEnum = {
  'Car Dealership': templateCarDealership,
  'Real Estate': templateRealEstate,
}

const template = signal<keyof typeof templatesEnum>('Car Dealership')

const result = signal({})

const video = signal({})

const status = signal<RenderStatus>('idle')

const loading = computed(() =>
  ['queued', 'fetching', 'rendering', 'saving'].includes(status.value)
)

const url = signal('')

const urlCsv = computed(() => {
  switch (template.value) {
    case 'Car Dealership':
      return `/car-dealership.template.csv`
    case 'Real Estate':
      return `/real-estate.template.csv`
  }
})

export default () => {
  const editApi = 'https://api.shotstack.io/edit/stage'
  // console.log(Deno.env.get('SHOTSTOCK_API_KEY_STAGING'))

  const onSubmit = async (event: Event) => {
    event.preventDefault()
    if (!loading.value) status.value = 'queued' // set before awaiting fetch
    const formData = new FormData(event.target as HTMLFormElement)
    const formJson = Object.fromEntries(formData.entries())
    const body = Mustache.render(
      JSON.stringify(templatesEnum[template.value]),
      formJson,
    )
    try {
      const responseResult = await fetch(`${editApi}/render`, {
        method: 'POST',
        headers: {
          'x-api-key': 'wdpxe25PMD9SGR9qh85T35JJB5xqBImV4q27xWyd',
          'accept': 'application/json',
          'content-type': 'application/json',
        },
        body,
      })
      result.value = await responseResult.json()
      pollStatus(result.value.response.id)
      return result.value
    } catch (error) {
      console.error('Failed to send form:', error)
    }
  }

  // @ts-ignore: no explicit any
  async function pollStatus(id: string) {
    try {
      const response = await fetch(`${editApi}/render/${id}`, {
        method: 'GET',
        headers: {
          'x-api-key': 'wdpxe25PMD9SGR9qh85T35JJB5xqBImV4q27xWyd',
          'accept': 'application/json',
        },
      })
      const jsonData = await response.json()

      video.value = jsonData
      status.value = jsonData.response.status
      console.log('status:', status.value, jsonData)

      if (['done', 'failed'].includes(status.value)) {
        url.value = jsonData.response?.url
        video.value = jsonData
        return jsonData
      } else {
        // wait for some time before making the next request
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return pollStatus(id) // recursive call
      }
    } catch (error) {
      console.error('Error polling endpoint:', error)
      throw error
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
              id='single-tab'
              data-tabs-target='#single'
              type='button'
              role='tab'
              aria-controls='single'
              aria-selected='false'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                class='w-5 h-5 mr-2 text-blue-600 dark:text-blue-500'
              >
                <path d='M17 7h5v10h-5v2a1 1 0 0 0 1 1h2v2h-2.5c-.55 0-1.5-.45-1.5-1c0 .55-.95 1-1.5 1H12v-2h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2V2h2.5c.55 0 1.5.45 1.5 1c0-.55.95-1 1.5-1H20v2h-2a1 1 0 0 0-1 1v2M2 7h11v2H4v6h9v2H2V7m18 8V9h-3v6h3Z' />
              </svg>
              Single (web form)
            </button>
          </li>
          <li class='mr-2' role='presentation'>
            <button
              class='inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              id='multiple-tab'
              data-tabs-target='#multiple'
              type='button'
              role='tab'
              aria-controls='multiple'
              aria-selected='false'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                class='w-5 h-5 mr-2 text-blue-600 dark:text-blue-500'
              >
                <path d='M19 11V9h-8V5H9v4H5v2h4v8h2v-8h8m0-8c.5 0 1 .2 1.39.61C20.8 4 21 4.5 21 5v14c0 .5-.2 1-.61 1.39c-.39.41-.89.61-1.39.61H5c-.5 0-1-.2-1.39-.61C3.2 20 3 19.5 3 19V5c0-.5.2-1 .61-1.39C4 3.2 4.5 3 5 3h14Z' />
              </svg>
              Multiple (in bulk)
            </button>
          </li>
        </ul>
      </div>
      <div id='myTabContent'>
        <div
          class='hidden p-4'
          id='single'
          role='tabpanel'
          aria-labelledby='single-tab'
        >
          <div class='grid grid-cols-1 md:grid-cols-2 gap-10 p-2 h-full'>
            <>
              {template.value === 'Car Dealership' && (
                <FormCarDealership
                  status={status}
                  loading={loading}
                  onSubmit={onSubmit}
                />
              )}
              {template.value === 'Real Estate' && (
                <FormRealEstate
                  status={status}
                  loading={loading}
                  onSubmit={onSubmit}
                />
              )}
            </>
            <div class='h-max pa-6 block'>
              <Video status={status} url={url} />
            </div>
          </div>
        </div>
        <div
          class='hidden p-4'
          id='multiple'
          role='tabpanel'
          aria-labelledby='multiple-tab'
        >
          <div class='grid grid-cols-1 md:grid-cols-2 gap-10 p-2 h-full'>
            <FormBulk
              url={urlCsv}
              loading={loading}
              onSubmit={(e) => console.log(e)}
            />
            <div class='h-max pa-6 block'>
              <Video status={status} url={url} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
