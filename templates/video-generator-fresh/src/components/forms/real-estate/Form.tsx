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

    <label for='propertyType'>Property Type</label>
    <input
      type='text'
      id='propertyType'
      name='Property_Type'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    />

    <label for='propertyAddress'>Property Address</label>
    <input
      type='text'
      id='propertyAddress'
      name='Property_Address'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    />

    <label for='propertyCity'>Property City</label>
    <input
      type='text'
      id='propertyCity'
      name='Property_City'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    />

    <label for='propertyState'>Property State</label>
    <input
      type='text'
      id='propertyState'
      name='Property_State'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    />

    <label for='propertyZip'>Property ZIP</label>
    <input
      type='text'
      id='propertyZip'
      name='Property_Zip'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    />

    <label for='propertyPrice'>Property Price</label>
    <input
      type='number'
      id='propertyPrice'
      name='Property_Price'
      min='0'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    />

    <label for='propertyDescription'>Property Description</label>
    <textarea
      id='propertyDescription'
      name='Property_Description'
      required
      class='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    >
    </textarea>

    <label for='propertyArea'>Property Area</label>
    <input
      type='number'
      id='propertyArea'
      name='Property_Area'
      min='0'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    />

    <label for='propertyBedrooms'>Property Bedrooms</label>
    <input
      type='number'
      id='propertyBedrooms'
      name='Property_Bedrooms'
      min='0'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    />

    <label for='propertyBathrooms'>Property Bathrooms</label>
    <input
      type='number'
      id='propertyBathrooms'
      name='Property_Bathrooms'
      min='0'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    />

    <label for='propertyParkingSpaces'>Property Parking Spaces</label>
    <input
      type='number'
      id='propertyParkingSpaces'
      name='Property_Parking_Spaces'
      min='0'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    />

    <label
      class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      for='propertyPhotos'
    >
      Property Photos
    </label>
    <input
      type='text'
      id='propertyType'
      name='Property_Type'
      required
      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    />
  </form>
)
