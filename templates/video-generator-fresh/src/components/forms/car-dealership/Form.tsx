/** @jsx h */
import { h } from 'preact'

interface Props {
  onSubmit: (e: Event) => Promise<void>
}

export default ({ onSubmit }: Props) => (
  <form method='post' onSubmit={onSubmit}>
    <button
      type='submit'
      class='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
    >
      Submit
    </button>

    <label for='soundtrack'>Soundtrack</label>
    <input
      type='text'
      id='soundtrack'
      name='Soundtrack'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      value='https://shotstack-assets.s3.ap-southeast-2.amazonaws.com/music/unminus/kring.mp3'
    />

    <label for='effect'>Effect</label>
    <input
      type='text'
      id='effect'
      name='Effect'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      value='fadeOut'
    />

    <label for='background'>Background</label>
    <input
      type='text'
      id='background'
      name='Background'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      value='#000000'
    />

    <label for='year'>Year</label>
    <input
      type='text'
      id='year'
      name='Year'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      value='2023'
    />

    <label for='make'>Make</label>
    <input
      type='text'
      id='make'
      name='Make'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      value='AUDI A3 SPORTBACK'
    />

    <label for='model'>Model</label>
    <input
      type='text'
      id='model'
      name='Model'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      value='35 TDI 150 S-Tronic Sport'
    />

    <label for='description'>Description</label>
    <input
      type='text'
      id='description'
      name='Description'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      value='CONSECIONARIO | USADO | VALENCIA, ES'
    />

    <label for='firstImage'>First Image</label>
    <input
      type='text'
      id='firstImage'
      name='First_Image'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      value='https://drive.google.com/file/d/1PDHHPbD_Mf47rYmp68IMN8uLkPj3fT6A/view'
    />

    <label for='engineType'>Engine Type</label>
    <input
      type='text'
      id='engineType'
      name='Engine_Type'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      value='2.0 TDI 150 S-Tronic | Diesel | 150 CV'
    />

    <label for='kilometers'>Kilometers</label>
    <input
      type='text'
      id='kilometers'
      name='Kilometers'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      value='17,432'
    />

    <label for='secondImage'>Second Image</label>
    <input
      type='text'
      id='secondImage'
      name='Second_Image'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      value='https://drive.google.com/file/d/1lcphf7N5TASEsbvxCtAwKrCBZXFFVbFX/view?usp=drive_link'
    />

    <label for='thirdImage'>Third Image</label>
    <input
      type='text'
      id='thirdImage'
      name='Third_Image'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      value='https://drive.google.com/file/d/1NtNNC3w8LRYrpzQ48OBhi9CCL0MrMz5x/view?usp=drive_link'
    />

    <label for='price'>Price</label>
    <input
      type='text'
      id='price'
      name='Price'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      value='23,400'
    />

    <label for='priceDisclaimer'>Price Disclaimer</label>
    <input
      type='text'
      id='priceDisclaimer'
      name='Price_Disclaimer'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      value='incuidos impuestos y gastos de transferencia'
    />

    <label for='dealerWebsite'>Dealer Website</label>
    <input
      type='text'
      id='dealerWebsite'
      name='Dealer_Website'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      value='vendetucoche.es'
    />

    <label for='fourthImage'>Fourth Image</label>
    <input
      type='text'
      id='fourthImage'
      name='Fourth_Image'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      value='https://drive.google.com/file/d/1HV-9zDhxoHWbeM84IwCJdSO9fF7FJbCX/view?usp=drive_link'
    />

    <label for='fifthImage'>Fifth Image</label>
    <input
      type='text'
      id='fifthImage'
      name='Fifth_Image'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      value='https://drive.google.com/file/d/1DsE-E0Q5Z46MLTxIqU0X4PWmAg3tzKvX/view?usp=drive_link'
    />

    <label for='sixthImage'>Sixth Image</label>
    <input
      type='text'
      id='sixthImage'
      name='Sixth_Image'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      value='https://drive.google.com/file/d/1DsE-E0Q5Z46MLTxIqU0X4PWmAg3tzKvX/view?usp=drive_link'
    />

    <label for='seventhImage'>Seventh Image</label>
    <input
      type='text'
      id='seventhImage'
      name='Seventh_Image'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      value='https://drive.google.com/file/d/1DsE-E0Q5Z46MLTxIqU0X4PWmAg3tzKvX/view?usp=drive_link'
    />

    <label for='eighthImage'>Eighth Image</label>
    <input
      type='text'
      id='eighthImage'
      name='Eighth_Image'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      value='https://drive.google.com/file/d/1DsE-E0Q5Z46MLTxIqU0X4PWmAg3tzKvX/view?usp=drive_link'
    />
  </form>
)
