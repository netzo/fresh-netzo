/** @jsx h */
import { h } from 'preact'
import type { Signal } from '@preact/signals'

interface Props {
  data: Record<string, string>
  disabled: Signal<boolean>
  onSubmit: (e: Event) => Promise<unknown>
}

export default ({
  data = {
    'soundtrack':
      'https://raw.githubusercontent.com/netzo/netzo/main/templates/video-generator-fresh/src/components/templates/real-estate/default-images/ambient-guitar.mp3',
    'effect': 'fadeIn',
    'background': '#000000',
    'badge': '¡Solo hoy!',
    'topic': 'Espectacular Residencia',
    'ammenities': '4 Habitaciones | 5.5 Baños | 1,000 m2 | Piscina',
    'description': 'NUEVA | Monterrey, Nuevo León',
    'firstImage':
      'https://raw.githubusercontent.com/netzo/netzo/main/templates/video-generator-fresh/src/components/templates/real-estate/default-images/exterior1.jpg',
    'benefitTitle': 'Un sueño hecho realidad',
    'benefit': 'Encuentra amplitud, paz y armonia en el corazón de San Pedro',
    'secondImage':
      'https://raw.githubusercontent.com/netzo/netzo/main/templates/video-generator-fresh/src/components/templates/real-estate/default-images/exterior2.png',
    'thirdImage':
      'https://raw.githubusercontent.com/netzo/netzo/main/templates/video-generator-fresh/src/components/templates/real-estate/default-images/kitchen1.jpg',
    'price': 'Estrenala por €1,900,000',
    'priceDisclaimer': 'Y vive la vida que mereces...',
    'priceMethod': 'No dejes pasar esta oportunidad',
    'dealerLogo': 'https://snaps.es/img/logo-dark.png',
    'dealerWebsite': 'inmuebles.es',
    'fourthImage':
      'https://raw.githubusercontent.com/netzo/netzo/main/templates/video-generator-fresh/src/components/templates/real-estate/default-images/living-room1.jpg',
    'fifthImage':
      'https://raw.githubusercontent.com/netzo/netzo/main/templates/video-generator-fresh/src/components/templates/real-estate/default-images/living-room2.png',
    'sixthImage':
      'https://raw.githubusercontent.com/netzo/netzo/main/templates/video-generator-fresh/src/components/templates/real-estate/default-images/bedroom1.png',
    'seventhImage':
      'https://raw.githubusercontent.com/netzo/netzo/main/templates/video-generator-fresh/src/components/templates/real-estate/default-images/bedroom2.jpg',
    'eighthImage':
      'https://raw.githubusercontent.com/netzo/netzo/main/templates/video-generator-fresh/src/components/templates/real-estate/default-images/exterior3.png',
  },
  disabled,
  onSubmit,
}: Props) => (
  <form method='post' onSubmit={onSubmit}>
    <button
      type='submit'
      disabled={disabled.value}
      class='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
    >
      Generate Video
    </button>

    <details open>
      <summary class='mb-3 text-lg cursor-pointer'>Video Settings</summary>

      <fieldset class='my-4 p-4 border-1 rounded-md'>
        <label for='soundtrack'>Soundtrack</label>
        <input
          type='url'
          id='soundtrack'
          name='soundtrack'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={data.soundtrack}
        />

        <label for='effect'>Effect</label>
        <select
          id='effect'
          name='effect'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={data.effect}
        >
          <option value='fadeIn'>Fade in</option>
          <option value='fadeOut'>Fade out</option>
        </select>

        <label for='background'>Background</label>
        <input
          type='color'
          id='background'
          name='background'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={data.color}
        />
      </fieldset>
    </details>

    <details>
      <summary class='mb-3 text-lg cursor-pointer'>Property Details</summary>

      <fieldset class='my-4 p-4 border-1 rounded-md'>
        <label for='badge'>Badge</label>
        <input
          type='text'
          id='badge'
          name='badge'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={data.badge}
        />

        <label for='topic'>Topic</label>
        <input
          type='text'
          id='topic'
          name='topic'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={data.topic}
        />

        <label for='ammenities'>Ammenities</label>
        <input
          type='text'
          id='ammenities'
          name='ammenities'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={data.ammenities}
        />

        <label for='description'>Description</label>
        <input
          type='text'
          id='description'
          name='description'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={data.description}
        />

        <label for='benefitTitle'>BenefitTitle</label>
        <input
          type='text'
          id='benefitTitle'
          name='benefitTitle'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={data.benefitTitle}
        />

        <label for='benefit'>Benefit</label>
        <input
          type='text'
          id='benefit'
          name='benefit'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={data.benefit}
        />

        <label for='price'>Price</label>
        <input
          type='text'
          id='price'
          name='price'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={data.price}
        />

        <label for='priceDisclaimer'>Price Disclaimer</label>
        <input
          type='text'
          id='priceDisclaimer'
          name='priceDisclaimer'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={data.priceDisclaimer}
        />

        <label for='dealerLogo'>Dealer Logo</label>
        <input
          type='url'
          id='dealerLogo'
          name='dealerLogo'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={data.dealerLogo}
        />

        <label for='dealerWebsite'>Dealer Website</label>
        <input
          type='text'
          id='dealerWebsite'
          name='dealerWebsite'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={data.dealerWebsite}
        />
      </fieldset>
    </details>

    <details>
      <summary class='mb-3 text-lg cursor-pointer'>Images</summary>

      <fieldset class='my-4 p-4 border-1 rounded-md'>
        <label for='firstImage'>First Image</label>
        <input
          type='url'
          id='firstImage'
          name='firstImage'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={data.firstImage}
        />

        <label for='secondImage'>Second Image</label>
        <input
          type='url'
          id='secondImage'
          name='secondImage'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={data.secondImage}
        />

        <label for='thirdImage'>Third Image</label>
        <input
          type='url'
          id='thirdImage'
          name='thirdImage'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={data.thirdImage}
        />

        <label for='fourthImage'>Fourth Image</label>
        <input
          type='url'
          id='fourthImage'
          name='fourthImage'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={data.fourthImage}
        />

        <label for='fifthImage'>Fifth Image</label>
        <input
          type='url'
          id='fifthImage'
          name='fifthImage'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={data.fifthImage}
        />

        <label for='sixthImage'>Sixth Image</label>
        <input
          type='url'
          id='sixthImage'
          name='sixthImage'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={data.sixthImage}
        />

        <label for='seventhImage'>Seventh Image</label>
        <input
          type='url'
          id='seventhImage'
          name='seventhImage'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={data.seventhImage}
        />

        <label for='eighthImage'>Eighth Image</label>
        <input
          type='url'
          id='eighthImage'
          name='eighthImage'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={data.eighthImage}
        />
      </fieldset>
    </details>
  </form>
)
