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
      'https://shotstack-assets.s3.ap-southeast-2.amazonaws.com/music/unminus/kring.mp3',
    'effect': 'fadeIn',
    'background': '#000000',
    'badge': 'HOY',
    'topic': 'Espectacular Chalet en Madrid',
    'ammenities': '4 Habitaciones | 5.5 Baños | 1,000 m2 | Piscina',
    'description': 'REFORMADA | Madrid Centro',
    'firstImage':
      'https://raw.githubusercontent.com/netzo/netzo/main/templates/video-generator-fresh/src/components/templates/real-estate/default-images/exterior1.webp',
    'dream':
      'Un sueno para familias que buscan espacio y tranquilidad en el centro de Madrid',
    'kilometers': 'Centro a 2.5 Km',
    'secondImage':
      'https://raw.githubusercontent.com/netzo/netzo/main/templates/video-generator-fresh/src/components/templates/real-estate/default-images/exterior2.webp',
    'thirdImage':
      'https://raw.githubusercontent.com/netzo/netzo/main/templates/video-generator-fresh/src/components/templates/real-estate/default-images/kitchen1.webp',
    'price': 'Tuyo por €23,400',
    'priceDisclaimer': 'Garantía 1 año, IVA incluido',
    'priceMethod': '',
    'dealerLogo': 'https://snaps.es/img/logo-dark.png',
    'dealerWebsite': 'inmuebles.es',
    'fourthImage':
      'https://raw.githubusercontent.com/netzo/netzo/main/templates/video-generator-fresh/src/components/templates/real-estate/default-images/living-room1.webp',
    'fifthImage':
      'https://raw.githubusercontent.com/netzo/netzo/main/templates/video-generator-fresh/src/components/templates/real-estate/default-images/living-room2.webp',
    'sixthImage':
      'https://raw.githubusercontent.com/netzo/netzo/main/templates/video-generator-fresh/src/components/templates/real-estate/default-images/bedroom1.webp',
    'seventhImage':
      'https://raw.githubusercontent.com/netzo/netzo/main/templates/video-generator-fresh/src/components/templates/real-estate/default-images/bedroom2.webp',
    'eighthImage':
      'https://raw.githubusercontent.com/netzo/netzo/main/templates/video-generator-fresh/src/components/templates/real-estate/default-images/exterior3.webp',
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

    <label for='soundtrack'>Soundtrack</label>
    <input
      type='text'
      id='soundtrack'
      name='Soundtrack'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      value={data.soundtrack}
    />
  </form>
)
