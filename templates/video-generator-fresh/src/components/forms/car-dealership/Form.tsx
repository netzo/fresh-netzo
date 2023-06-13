/** @jsx h */
import { h } from 'preact'
import type { Signal } from '@preact/signals'

interface Props {
  disabled: Signal<boolean>
  onSubmit: (e: Event) => Promise<void>
}

export default ({ disabled, onSubmit }: Props) => (
  <form method='post' onSubmit={onSubmit}>
    <button
      type='submit'
      disabled={disabled.value}
      class='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
    >
      Submit
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
          value='https://shotstack-assets.s3.ap-southeast-2.amazonaws.com/music/unminus/kring.mp3'
        />

        <label for='effect'>Effect</label>
        <select
          id='effect'
          name='effect'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value='fadeOut'
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
          value='#000000'
        />
      </fieldset>
    </details>

    <details>
      <summary class='mb-3 text-lg cursor-pointer'>Car Details</summary>

      <fieldset class='my-4 p-4 border-1 rounded-md'>
        <label for='year'>Year</label>
        <input
          type='number'
          id='year'
          name='year'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value='2023'
        />

        <label for='make'>Make</label>
        <input
          type='text'
          id='make'
          name='make'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value='AUDI A3 SPORTBACK'
        />

        <label for='model'>Model</label>
        <input
          type='text'
          id='model'
          name='model'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value='35 TDI 150 S-Tronic Sport'
        />

        <label for='description'>Description</label>
        <input
          type='text'
          id='description'
          name='description'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value='CONSECIONARIO | USADO | VALENCIA, ES'
        />

        <label for='engineType'>Engine Type</label>
        <input
          type='text'
          id='engineType'
          name='engineType'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value='2.0 TDI 150 S-Tronic | Diesel | 150 CV'
        />

        <label for='kilometers'>Kilometers</label>
        <input
          type='text'
          id='kilometers'
          name='kilometers'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value='17,432'
        />

        <label for='price'>Price</label>
        <input
          type='text'
          id='price'
          name='price'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value='23,400'
        />

        <label for='priceDisclaimer'>Price Disclaimer</label>
        <input
          type='text'
          id='priceDisclaimer'
          name='priceDisclaimer'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value='incuidos impuestos y gastos de transferencia'
        />

        <label for='dealerLogo'>Dealer Logo</label>
        <input
          type='url'
          id='dealerLogo'
          name='dealerLogo'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value='https://netzo.io/images/netzo-logo-light.svg'
        />

        <label for='dealerWebsite'>Dealer Website</label>
        <input
          type='text'
          id='dealerWebsite'
          name='dealerWebsite'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value='vendetucoche.es'
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
          value='https://netzo.io/images/netzo-logo-light.svg'
        />

        <label for='secondImage'>Second Image</label>
        <input
          type='url'
          id='secondImage'
          name='secondImage'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value='https://netzo.io/images/netzo-logo-light.svg'
        />

        <label for='thirdImage'>Third Image</label>
        <input
          type='url'
          id='thirdImage'
          name='thirdImage'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value='https://netzo.io/images/netzo-logo-light.svg'
        />

        <label for='fourthImage'>Fourth Image</label>
        <input
          type='url'
          id='fourthImage'
          name='fourthImage'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value='https://netzo.io/images/netzo-logo-light.svg'
        />

        <label for='fifthImage'>Fifth Image</label>
        <input
          type='url'
          id='fifthImage'
          name='fifthImage'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value='https://netzo.io/images/netzo-logo-light.svg'
        />

        <label for='sixthImage'>Sixth Image</label>
        <input
          type='url'
          id='sixthImage'
          name='sixthImage'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value='https://netzo.io/images/netzo-logo-light.svg'
        />

        <label for='seventhImage'>Seventh Image</label>
        <input
          type='url'
          id='seventhImage'
          name='seventhImage'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value='https://netzo.io/images/netzo-logo-light.svg'
        />

        <label for='eighthImage'>Eighth Image</label>
        <input
          type='url'
          id='eighthImage'
          name='eighthImage'
          required
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value='https://netzo.io/images/netzo-logo-light.svg'
        />
      </fieldset>
    </details>
  </form>
)
