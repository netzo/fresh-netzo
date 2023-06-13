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
      'https://drive.google.com/file/d/1PDHHPbD_Mf47rYmp68IMN8uLkPj3fT6A/view',
    'dream':
      'Un sueno para familias que buscan espacio y tranquilidad en el centro de Madrid',
    'kilometers': 'Centro a 2.5',
    'secondImage':
      'https://drive.google.com/file/d/1lcphf7N5TASEsbvxCtAwKrCBZXFFVbFX/view?usp=drive_link',
    'thirdImage':
      'https://drive.google.com/file/d/1NtNNC3w8LRYrpzQ48OBhi9CCL0MrMz5x/view?usp=drive_link',
    'price': '3.8 Millones',
    'priceDisclaimer': 'Incluidos gastos de transferencia',
    'priceMethod': '',
    'dealerLogo': 'https://snaps.es/img/logo-dark.png',
    'dealerWebsite': 'asesores-bienesraices.es',
    'fourthImage':
      'https://drive.google.com/file/d/1HV-9zDhxoHWbeM84IwCJdSO9fF7FJbCX/view?usp=drive_link',
    'fifthImage':
      'https://drive.google.com/file/d/1N3ujzQu-pKCxrC7PFWuwjpSNWtbcDCLc/view?usp=drive_link',
    'sixthImage':
      'https://drive.google.com/file/d/1qzts8tcmiFvJuw-pAN4-ILdoeO-52Ww4/view?usp=drive_link',
    'seventhImage':
      'https://drive.google.com/file/d/1PeCp_G_t0toPr4bGA3JqGn7n4SOnIEQn/view?usp=drive_link',
    'eighthImage': '',
  },
  disabled,
  onSubmit,
}: Props) => (
  <form method='post' onSubmit={onSubmit}>
    <label for='soundtrack'>Soundtrack</label>
    <input
      type='text'
      id='soundtrack'
      name='Soundtrack'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      value={data.soundtrack}
    />

    <button
      type='submit'
      disabled={disabled.value}
      class='my-4 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
    >
      Generate Video
    </button>
  </form>
)
