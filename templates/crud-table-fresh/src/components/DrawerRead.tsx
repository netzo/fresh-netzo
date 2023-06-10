/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from 'preact'

export default () => {
  return (
    <div
      id='drawer-read-product-advanced'
      class='overflow-y-auto fixed top-0 left-0 z-40 p-4 w-full max-w-lg h-screen bg-white transition-transform -translate-x-full dark:bg-gray-800'
      tabIndex={-1}
      aria-labelledby='drawer-label'
      aria-hidden='true'
    >
      <div>
        <h4
          id='read-drawer-label'
          class='mb-1.5 leading-none text-xl font-semibold text-gray-900 dark:text-white'
        >
          Apple iMac 25"
        </h4>
        <h5 class='mb-5 text-xl font-bold text-gray-900 dark:text-white'>
          $2999
        </h5>
      </div>
      <button
        type='button'
        data-drawer-dismiss='drawer-read-product-advanced'
        aria-controls='drawer-read-product-advanced'
        class='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
      >
        <svg
          aria-hidden='true'
          class='w-5 h-5'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
        <span class='sr-only'>Close menu</span>
      </button>
      <div class='grid grid-cols-3 gap-4 mb-4 sm:mb-5'>
        <div class='p-2 w-auto bg-gray-100 rounded-lg dark:bg-gray-700'>
          <img
            src='https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-side-image.png'
            alt='iMac Side Image'
          />
        </div>
        <div class='p-2 w-auto bg-gray-100 rounded-lg dark:bg-gray-700'>
          <img
            src='https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png'
            alt='iMac Front Image'
          />
        </div>
        <div class='p-2 w-auto bg-gray-100 rounded-lg dark:bg-gray-700'>
          <img
            src='https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-back-image.png'
            alt='iMac Back Image'
          />
        </div>
        <div class='p-2 w-auto bg-gray-100 rounded-lg dark:bg-gray-700'>
          <img
            src='https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-side-image.png'
            alt='iMac Back Image'
          />
        </div>
        <div class='p-2 w-auto bg-gray-100 rounded-lg dark:bg-gray-700'>
          <img
            src='https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-back-image.png'
            alt='iMac Front Image'
          />
        </div>
        <div class='p-2 w-auto bg-gray-100 rounded-lg dark:bg-gray-700'>
          <img
            src='https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-side-image.png'
            alt='iMac Side Image'
          />
        </div>
      </div>
      <dl class='sm:mb-5'>
        <dt class='mb-2 font-semibold leading-none text-gray-900 dark:text-white'>
          Details
        </dt>
        <dd class='mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400'>
          Standard glass ,3.8GHz 8-core 10th-generation Intel Core i7 processor,
          Turbo Boost up to 5.0GHz, 16GB 2666MHz DDR4 memory, Radeon Pro 5500 XT
          with 8GB of GDDR6 memory, 256GB SSD storage, Gigabit Ethernet, Magic
          Mouse 2, Magic Keyboard - US.
        </dd>
      </dl>
      <dl class='grid grid-cols-2 gap-4 mb-4'>
        <div class='col-span-2 p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 sm:col-span-1 dark:border-gray-600'>
          <dt class='mb-2 font-semibold leading-none text-gray-900 dark:text-white'>
            Shipping
          </dt>
          <dd class='flex items-center text-gray-500 dark:text-gray-400'>
            <svg
              class='w-4 h-4 mr-1.5'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                clipRule='evenodd'
              />
            </svg>
            United States, Europe
          </dd>
        </div>
        <div class='col-span-2 p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 sm:col-span-1 dark:border-gray-600'>
          <dt class='mb-2 font-semibold leading-none text-gray-900 dark:text-white'>
            Colors
          </dt>
          <dd class='flex items-center space-x-2 font-light text-gray-500 dark:text-gray-400'>
            <div class='flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full' />
            <div class='flex-shrink-0 w-6 h-6 bg-indigo-400 rounded-full' />
            <div class='flex-shrink-0 w-6 h-6 rounded-full bg-primary-600' />
            <div class='flex-shrink-0 w-6 h-6 bg-pink-400 rounded-full' />
            <div class='flex-shrink-0 w-6 h-6 bg-teal-300 rounded-full' />
            <div class='flex-shrink-0 w-6 h-6 bg-green-300 rounded-full' />
          </dd>
        </div>
        <div class='p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600'>
          <dt class='mb-2 font-semibold leading-none text-gray-900 dark:text-white'>
            Product State
          </dt>
          <dd class='text-gray-500 dark:text-gray-400'>
            <span class='bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800'>
              <svg
                aria-hidden='true'
                class='mr-1 w-3 h-3'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
              </svg>
              New
            </span>
          </dd>
        </div>
        <div class='p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600'>
          <dt class='mb-2 font-semibold leading-none text-gray-900 dark:text-white'>
            Sold by
          </dt>
          <dd class='text-gray-500 dark:text-gray-400'>Flowbite</dd>
        </div>
        <div class='p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600'>
          <dt class='mb-2 font-semibold leading-none text-gray-900 dark:text-white'>
            Ships from
          </dt>
          <dd class='text-gray-500 dark:text-gray-400'>Flowbite</dd>
        </div>
        <div class='p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600'>
          <dt class='mb-2 font-semibold leading-none text-gray-900 dark:text-white'>
            Brand
          </dt>
          <dd class='text-gray-500 dark:text-gray-400'>Apple</dd>
        </div>
        <div class='p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600'>
          <dt class='mb-2 font-semibold leading-none text-gray-900 dark:text-white'>
            Dimensions (cm)
          </dt>
          <dd class='text-gray-500 dark:text-gray-400'>105 x 15 x 23</dd>
        </div>
        <div class='p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600'>
          <dt class='mb-2 font-semibold leading-none text-gray-900 dark:text-white'>
            Item weight
          </dt>
          <dd class='text-gray-500 dark:text-gray-400'>12kg</dd>
        </div>
      </dl>
      <div class='flex bottom-0 left-0 justify-center pb-4 space-x-4 w-full'>
        <button
          type='button'
          class='text-white w-full inline-flex items-center justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
        >
          <svg
            aria-hidden='true'
            class='mr-1 -ml-1 w-5 h-5'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z' />
            <path
              fillRule='evenodd'
              d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
              clipRule='evenodd'
            />
          </svg>
          Edit
        </button>
        <button
          type='button'
          class='inline-flex w-full items-center text-white justify-center bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900'
        >
          <svg
            aria-hidden='true'
            class='w-5 h-5 mr-1.5 -ml-1'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  )
}
