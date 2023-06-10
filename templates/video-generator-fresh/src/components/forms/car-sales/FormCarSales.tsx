/** @jsx h */
import { h } from 'preact'
import { signal } from '@preact/signals'
import replace from 'object-replace-mustache'

interface FormProps {
  onSubmit: (e: Event) => Promise<any>
}

const LEGEND = 'mb-4 text-xl font-bold text-gray-900 dark:text-white'
const LABEL = 'block mb-2 text-sm font-medium text-gray-900 dark:text-white'
const INPUT_TEXT =
  'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
const TEXTAREA =
  'block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
const BADGE_INACTIVE =
  'bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 cursor-pointer'
const BADGE_ACTIVE =
  'bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 cursor-pointer'

const template = {
  'timeline': {
    'soundtrack': {
      'src':
        'https://shotstack-assets.s3.ap-southeast-2.amazonaws.com/music/unminus/kring.mp3',
      'effect': 'fadeOut',
    },
    'background': '#000000',
    'cache': false,
    'tracks': [
      {
        'clips': [
          {
            'asset': {
              'type': 'html',
              'html': '<p data-html-type="text">{{Vehicle_Year}}</p>',
              'css':
                'p { color: #ffffff; font-size: 100px; font-family: Montserrat ExtraBold; text-align: left; }',
              'width': 844,
              'height': 180,
            },
            'start': 0,
            'length': 4,
            'fit': 'none',
            'scale': 1,
            'offset': {
              'x': -0.239,
              'y': -0.139,
            },
            'position': 'center',
            'transition': {
              'in': 'slideUp',
              'out': 'slideDown',
            },
          },
        ],
      },
      {
        'clips': [
          {
            'asset': {
              'type': 'html',
              'html': '<p data-html-type="text">{{Vehicle_Make}}</p>',
              'css':
                'p { color: #ffffff; font-size: 80px; font-family: Montserrat ExtraBold; text-align: left }',
              'width': 1031,
              'height': 114,
            },
            'fit': 'none',
            'scale': 1,
            'offset': {
              'x': -0.191,
              'y': -0.218,
            },
            'position': 'center',
            'transition': {
              'in': 'slideUp',
              'out': 'slideDown',
            },
            'start': 0.5,
            'length': 3.5,
          },
        ],
      },
      {
        'clips': [
          {
            'asset': {
              'type': 'html',
              'html': '<p data-html-type="text">{{Vehicle_Model}}</p>',
              'css':
                'p { color: #ffffff; font-size: 80px; font-family: Montserrat SemiBold; text-align: left; }',
              'width': 1019,
              'height': 77,
            },
            'fit': 'none',
            'scale': 1,
            'offset': {
              'x': -0.191,
              'y': -0.294,
            },
            'position': 'center',
            'start': 1,
            'length': 3,
            'transition': {
              'out': 'slideDown',
              'in': 'slideUp',
            },
          },
          {
            'asset': {
              'type': 'html',
              'html': '<p data-html-type="text">{{Vehicle_Description}}</p>',
              'css':
                'p { color: #ffffff; font-size: 40px; font-family: Montserrat SemiBold; text-align: left; }',
              'width': 1648,
              'height': 90,
            },
            'fit': 'none',
            'scale': 1,
            'offset': {
              'x': -0.024,
              'y': -0.365,
            },
            'position': 'center',
            'transition': {
              'out': 'slideDown',
              'in': 'slideUp',
            },
            'start': 1.2,
            'length': 2.8,
          },
        ],
      },
      {
        'clips': [
          {
            'asset': {
              'type': 'image',
              'src': '{{First_image}}',
            },
            'start': 0,
            'length': 5,
            'effect': 'zoomIn',
            'transition': {
              'in': 'fade',
              'out': 'fade',
            },
            'offset': {
              'x': 0.002,
              'y': -0.024,
            },
            'position': 'center',
            'fit': 'crop',
            'opacity': 0.4,
          },
        ],
      },
      {
        'clips': [
          {
            'asset': {
              'type': 'html',
              'html': '<p data-html-type="text">{{Vehicle_Engine_Type}}</p>',
              'css':
                'p { color: #ffffff; font-size: 40px; font-family: Montserrat SemiBold; text-align: left }',
              'width': 620,
              'height': 72,
            },
            'length': 5,
            'start': 5,
            'transition': {
              'out': 'slideDown',
              'in': 'slideUp',
            },
            'fit': 'none',
            'scale': 1,
            'offset': {
              'x': -0.266,
              'y': -0.032,
            },
            'position': 'center',
          },
          {
            'asset': {
              'type': 'html',
              'html': '<p data-html-type="text">{{Vehicle_kms}}</p>',
              'css':
                'p { color: #ffffff; font-size: 70px; font-family: Montserrat ExtraBold; text-align: left; }',
              'width': 600,
              'height': 109,
            },
            'length': 5,
            'start': 5,
            'transition': {
              'out': 'slideDown',
              'in': 'slideUp',
            },
            'fit': 'none',
            'scale': 1,
            'offset': {
              'x': -0.276,
              'y': 0.027,
            },
            'position': 'center',
          },
        ],
      },
      {
        'clips': [
          {
            'asset': {
              'type': 'image',
              'src':
                'https://drive.google.com/uc?export=download&id=1ngVkdeoD7RDvk3FA5cIU07l1_V84xS5t',
            },
            'length': 5,
            'start': 5,
            'offset': {
              'x': -0.49,
              'y': -0.004,
            },
            'position': 'center',
            'scale': 0.07,
            'transition': {
              'in': 'carouselDown',
              'out': 'slideDown',
            },
          },
        ],
      },
      {
        'clips': [
          {
            'asset': {
              'type': 'image',
              'src': '{{First_image}}',
            },
            'start': 5.7,
            'length': 4.3,
            'offset': {
              'x': 0.2,
              'y': 0,
            },
            'position': 'center',
            'scale': 0.479,
            'transition': {
              'in': 'slideLeft',
              'out': 'slideRight',
            },
            'fit': 'crop',
          },
        ],
      },
      {
        'clips': [
          {
            'asset': {
              'type': 'image',
              'src': '{{Second_image}}',
            },
            'position': 'center',
            'offset': {
              'x': 0,
              'y': 0,
            },
            'transition': {
              'in': 'fade',
              'out': 'fade',
            },
            'start': 4,
            'length': 6,
            'scale': 1,
            'opacity': 0.4,
            'fit': 'crop',
          },
        ],
      },
      {
        'clips': [
          {
            'asset': {
              'type': 'image',
              'src': '{{Third_image}}',
            },
            'effect': 'zoomIn',
            'offset': {
              'x': 0,
              'y': 0,
            },
            'position': 'center',
            'fit': 'crop',
            'scale': 1,
            'transition': {
              'in': 'fade',
              'out': 'fade',
            },
            'start': 9,
            'length': 3,
          },
        ],
      },
      {
        'clips': [
          {
            'asset': {
              'type': 'image',
              'src':
                'https://drive.google.com/uc?export=download&id=1ngVkdeoD7RDvk3FA5cIU07l1_V84xS5t',
            },
            'length': 5.5,
            'start': 11.5,
            'offset': {
              'x': -0.492,
              'y': -0.007,
            },
            'position': 'center',
            'transition': {
              'in': 'carouselDown',
              'out': 'slideDown',
            },
            'scale': 0.07,
          },
        ],
      },
      {
        'clips': [
          {
            'asset': {
              'type': 'image',
              'src': '{{First_Image}}',
            },
            'start': 11,
            'length': 7,
            'effect': 'zoomIn',
            'offset': {
              'x': 0,
              'y': 0,
            },
            'position': 'center',
            'transition': {
              'in': 'fade',
              'out': 'fade',
            },
            'fit': 'crop',
            'scale': 1,
          },
        ],
      },
      {
        'clips': [
          {
            'asset': {
              'type': 'image',
              'src': '{{Second_Image}}',
            },
            'start': 17,
            'length': 4,
            'effect': 'zoomIn',
            'offset': {
              'x': 0,
              'y': 0,
            },
            'position': 'center',
            'transition': {
              'in': 'fade',
              'out': 'fade',
            },
          },
        ],
      },
      {
        'clips': [
          {
            'asset': {
              'type': 'image',
              'src': '{{Third_Image}}',
            },
            'start': 20,
            'length': 6,
            'effect': 'zoomIn',
            'offset': {
              'x': 0,
              'y': 0,
            },
            'position': 'center',
            'transition': {
              'in': 'fade',
              'out': 'fade',
            },
          },
        ],
      },
      {
        'clips': [
          {
            'asset': {
              'type': 'html',
              'html': '<p data-html-type="text">{{Vehicle_Price}}</p>',
              'css':
                'p { color: #ffffff; font-size: 120px; font-family: Montserrat ExtraBold; text-align: center; }',
              'width': 1311,
              'height': 180,
            },
            'start': 28,
            'length': 3,
            'transition': {
              'out': 'slideUp',
              'in': 'slideDown',
            },
            'fit': 'none',
            'scale': 1,
            'offset': {
              'x': -0.029,
              'y': -0.005,
            },
            'position': 'center',
          },
          {
            'asset': {
              'type': 'html',
              'html':
                '<p data-html-type="text">{{Vehicle_Price_Disclaimer}}</p>',
              'css':
                'p { color: #ffffff; font-size: 36px; font-family: Montserrat SemiBold; text-align: left; }',
              'width': 883,
              'height': 93,
            },
            'transition': {
              'out': 'slideUp',
              'in': 'slideDown',
            },
            'start': 28,
            'length': 3,
            'fit': 'none',
            'scale': 1,
            'offset': {
              'x': 0.223,
              'y': -0.134,
            },
            'position': 'center',
          },
          {
            'asset': {
              'type': 'html',
              'html': '<p data-html-type="text">{{Vehicle_Price_Method}}</p>',
              'css':
                'p { color: #ffffff; font-size: 50px; font-family: Montserrat ExtraBold; text-align: left; }',
              'width': 672,
              'height': 107,
            },
            'start': 28,
            'length': 3,
            'fit': 'none',
            'scale': 1,
            'offset': {
              'x': 0.164,
              'y': -0.087,
            },
            'position': 'center',
            'transition': {
              'in': 'slideDown',
              'out': 'slideUp',
            },
          },
        ],
      },
      {
        'clips': [
          {
            'asset': {
              'type': 'image',
              'src': '{{dealer_logo}}',
            },
            'start': 30.8,
            'length': 5.2,
            'fit': 'none',
            'offset': {
              'x': 0,
              'y': 0,
            },
            'transition': {
              'in': 'slideUp',
            },
            'position': 'center',
            'scale': 0.5,
          },
          {
            'asset': {
              'type': 'html',
              'html': '<p data-html-type="text">{{Dealer_website}}</p>',
              'css':
                'p { color: #ffffff; font-size: 50px; font-family: Montserrat SemiBold; text-align: center; }',
              'width': 1025,
              'height': 167,
            },
            'length': 5,
            'offset': {
              'x': 0.006,
              'y': -0.178,
            },
            'start': 31,
            'transition': {
              'in': 'slideUp',
            },
            'fit': 'none',
            'scale': 1,
            'position': 'center',
          },
        ],
      },
      {
        'clips': [
          {
            'asset': {
              'type': 'image',
              'src': '{{First_Image}}',
            },
            'start': 25,
            'length': 8,
            'effect': 'zoomIn',
            'transition': {
              'out': 'fade',
            },
            'offset': {
              'x': 0,
              'y': 0,
            },
            'position': 'center',
            'fit': 'crop',
            'scale': 1,
            'opacity': 0.4,
          },
        ],
      },
    ],
  },
  'output': {
    'format': 'mp4',
    'size': {
      'width': 1920,
      'height': 1080,
    },
  },
}

const availableParameters = [
  { name: 'vehicleYear', allowMultiple: false },
  { name: 'vehicleMake', allowMultiple: false },
  { name: 'vehicleModel', allowMultiple: false },
  { name: 'vehicleEngineType', allowMultiple: true },
  { name: 'vehicleKms', allowMultiple: true },
  { name: 'vehiclePrice', allowMultiple: false },
  { name: 'vehiclePriceMethod', allowMultiple: false },
]

const advancedParams = {
  name: 'advancedParams',
  fields: [
    { name: 'asset', allowMultiple: false },
    { name: 'start', allowMultiple: false },
    { name: 'length', allowMultiple: false },
    { name: 'effect', allowMultiple: false },
    { name: 'transition', allowMultiple: false },
    { name: 'offset', allowMultiple: false },
    { name: 'position', allowMultiple: false },
    { name: 'fit', allowMultiple: false },
    { name: 'scale', allowMultiple: false },
    { name: 'opacity', allowMultiple: false },
  ],
}

const GeneralSettings = ({ settings, onSettingChange }) => {
  const handleInputChange = (event, key) => {
    const { value } = event.target
    onSettingChange(key, value)
  }

  return (
    <div>
      <fieldset class='border p-4 mb-4'>
        <legend class='text-blue-500'>General Settings</legend>
        <div class='flex flex-col space-y-4'>
          <div>
            <label for='background'>Background:</label>
            <input
              type='color'
              id='background'
              name='background'
              value={settings.background || '#0080ff'} // Default value for background
              class={INPUT_TEXT}
              onInput={(event) => handleInputChange(event, 'background')}
            />
          </div>

          <div>
            <label for='soundtrack'>Soundtrack:</label>
            <input
              type='text'
              id='soundtrack'
              name='soundtrack'
              value={settings.soundtrack?.src ||
                'https://url-of-soundtrack.mp3'} // Default value for soundtrack src
              class={INPUT_TEXT}
              onInput={(event) => handleInputChange(event, 'soundtrack.src')}
            />
          </div>

          <div>
            <label for='effect'>Soundtrack Effect:</label>
            <input
              type='text'
              id='effect'
              name='effect'
              value={settings.soundtrack?.effect || 'https://url-of-video.mp4'} // Default value for soundtrack effect
              class={INPUT_TEXT}
              onInput={(event) => handleInputChange(event, 'soundtrack.effect')}
            />
          </div>

          <div>
            <label for='format'>Output Format:</label>
            <input
              type='text'
              id='format'
              name='format'
              value={settings.output?.format || 'mp4'} // Default value for output format
              class={INPUT_TEXT}
              onInput={(event) => handleInputChange(event, 'output.format')}
            />
          </div>

          <div>
            <label for='width'>Output Width:</label>
            <input
              type='number'
              id='width'
              name='width'
              value={settings.output?.size?.width || 1920} // Default value for output width
              class={INPUT_TEXT}
              onInput={(event) => handleInputChange(event, 'output.size.width')}
            />
          </div>

          <div>
            <label for='height'>Output Height:</label>
            <input
              type='number'
              id='height'
              name='height'
              value={settings.output?.size?.height || 1080} // Default value for output height
              class={INPUT_TEXT}
              onInput={(event) =>
                handleInputChange(event, 'output.size.height')}
            />
          </div>
        </div>
      </fieldset>
    </div>
  )
}

export default (props: FormProps) => {
  const onSubmit = (e: Event) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = replace(template, Object.fromEntries(formData.entries()))
    props.onSubmit(data)
  }

  const activeParameters = signal([])

  const settings = signal({
    timeline: {
      soundtrack: {
        src: '',
        effect: '',
      },
      background: '',
      cache: false,
    },
    output: {
      format: '',
      size: {
        width: null,
        height: null,
      },
    },
  })

  const shouldShowInput = (param) => {
    if (param === 'advancedParams') {
      return activeParameters.value.includes(param)
    }
    return activeParameters.value.includes(param)
  }

  const toggleParameter = (param) => {
    activeParameters.value = activeParameters.value.includes(param)
      ? activeParameters.value.filter((p) => p !== param)
      : [...activeParameters.value, param]
    console.log(activeParameters.value)
  }

  const handleSettingChange = (key, value) => {
    settings.value = {
      ...settings.value,
      [key]: value,
    }
  }

  const renderChips = () => {
    return availableParameters.map((param) => (
      <div
        key={param.name}
        class={activeParameters.value.includes(param.name)
          ? BADGE_ACTIVE
          : BADGE_INACTIVE}
        onClick={() => toggleParameter(param.name)}
      >
        {param.name}
      </div>
    ))
  }

  const renderFormFields = () => {
    return availableParameters.map((param) => (
      <div
        class={`mb-4 ${shouldShowInput(param.name) ? 'visible' : 'hidden'}`}
      >
        <label htmlFor={param.name}>{param.name}:</label>
        {shouldShowInput(param.name) && (
          <input
            type='text'
            id={param.name}
            name={param.name}
            value=''
            class={INPUT_TEXT}
            onChange={() => {}}
          />
        )}
      </div>
    ))
  }

  const renderAdvancedParams = () => {
    if (activeParameters.value.includes('active')) {
      return (
        <div class={`mb-4 visible`}>
          <fieldset class='border p-4'>
            <legend>Advanced Params</legend>
            {advancedParams.fields.map((field) => (
              <div key={field.name} class='mb-4'>
                <label htmlFor={field.name}>{field.name}:</label>
                <input
                  type='text'
                  id={field.name}
                  name={field.name}
                  value=''
                  class={INPUT_TEXT}
                  onChange={() => {}}
                />
              </div>
            ))}
          </fieldset>
        </div>
      )
    }
    return null
  }

  return (
    <form onSubmit={onSubmit}>
      <div class='mb-6'>
        <button
          type='submit'
          class='w-full my-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
        >
          Generate JSON
        </button>
      </div>

      <fieldset class='flex flex-col'>
        <GeneralSettings
          settings={settings}
          onSettingChange={handleSettingChange}
        />

        <fieldset class='border p-4 mb-4'>
          <legend class='text-blue-500'>Parameters</legend>
          <div class='chips-container flex flex-wrap space-x-2'>
            {renderChips()}
          </div>
        </fieldset>

        {renderFormFields()}
        {renderAdvancedParams()}
      </fieldset>
    </form>
  )
}
