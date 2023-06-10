/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from 'preact'

export default () => {
  return (
    <form
      action='#'
      id='drawer-update-product'
      class='fixed top-0 left-0 z-40 w-full h-screen max-w-3xl p-4 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800'
      tabIndex={-1}
      aria-labelledby='drawer-update-product-label'
      aria-hidden='true'
    >
      <h5
        id='drawer-label'
        class='inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400'
      >
        New Product
      </h5>
      <button
        type='button'
        data-drawer-dismiss='drawer-update-product'
        aria-controls='drawer-update-product'
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
      <div class='grid gap-4 sm:grid-cols-3 sm:gap-6 '>
        <div class='space-y-4 sm:col-span-2 sm:space-y-6'>
          <div>
            <label
              htmlFor='name'
              class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Product Name
            </label>
            <input
              type='text'
              name='name'
              id='name'
              class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              defaultValue='Apple iMac 27“'
              placeholder='Type product name'
              required=''
            />
          </div>
          <div>
            <label
              htmlFor='description'
              class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Description
            </label>
            <div class='w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600'>
              <div class='flex items-center justify-between px-3 py-2 border-b dark:border-gray-600'>
                <div class='flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600'>
                  <div class='flex items-center space-x-1 sm:pr-4'>
                    <button
                      type='button'
                      class='p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
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
                          d='M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span class='sr-only'>Attach file</span>
                    </button>
                    <button
                      type='button'
                      class='p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
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
                          d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span class='sr-only'>Embed map</span>
                    </button>
                    <button
                      type='button'
                      class='p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
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
                          d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span class='sr-only'>Upload image</span>
                    </button>
                    <button
                      type='button'
                      class='p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
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
                          d='M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span class='sr-only'>Format code</span>
                    </button>
                    <button
                      type='button'
                      class='p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
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
                          d='M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span class='sr-only'>Add emoji</span>
                    </button>
                  </div>
                  <div class='flex-wrap items-center hidden space-x-1 sm:flex sm:pl-4'>
                    <button
                      type='button'
                      class='p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
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
                          d='M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span class='sr-only'>Add list</span>
                    </button>
                    <button
                      type='button'
                      class='p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
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
                          d='M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span class='sr-only'>Settings</span>
                    </button>
                  </div>
                </div>
                <button
                  type='button'
                  data-tooltip-target='tooltip-fullscreen'
                  class='p-2 text-gray-500 rounded cursor-pointer sm:ml-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
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
                      d='M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span class='sr-only'>Full screen</span>
                </button>
                <div
                  id='tooltip-fullscreen'
                  role='tooltip'
                  class='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'
                  data-popper-reference-hidden=''
                  data-popper-escaped=''
                  data-popper-placement='bottom'
                  style={{
                    position: 'absolute',
                    inset: '0px auto auto 0px',
                    margin: 0,
                    transform: 'translate3d(0px, 335px, 0px)',
                  }}
                >
                  Show full screen
                  <div class='tooltip-arrow' data-popper-arrow='' />
                </div>
              </div>
              <div class='px-4 py-3 bg-white rounded-b-lg dark:bg-gray-800'>
                <textarea
                  id='description'
                  rows={8}
                  class='block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400'
                  placeholder='Write product description here'
                  required=''
                  defaultValue={'Standard glass, 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, 16GB 2666MHz DDR4 memory, Radeon Pro 5500 XT with 8GB of GDDR6 memory, 256GB SSD storage, Gigabit Ethernet, Magic Mouse 2, Magic Keyboard - US'}
                />
              </div>
            </div>
          </div>
          <div class='mb-4'>
            <span class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Product Images
            </span>
            <div class='grid grid-cols-3 gap-4 mb-4'>
              <div class='relative p-2 bg-gray-100 rounded-lg sm:w-36 sm:h-36 dark:bg-gray-700'>
                <img
                  src='https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-side-image.png'
                  alt='imac image'
                />
                <button
                  type='button'
                  class='absolute text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400 bottom-1 left-1'
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
                      d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span class='sr-only'>Remove image</span>
                </button>
              </div>
              <div class='relative p-2 bg-gray-100 rounded-lg sm:w-36 sm:h-36 dark:bg-gray-700'>
                <img
                  src='https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png'
                  alt='imac image'
                />
                <button
                  type='button'
                  class='absolute text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400 bottom-1 left-1'
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
                      d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span class='sr-only'>Remove image</span>
                </button>
              </div>
              <div class='relative p-2 bg-gray-100 rounded-lg sm:w-36 sm:h-36 dark:bg-gray-700'>
                <img
                  src='https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-back-image.png'
                  alt='imac image'
                />
                <button
                  type='button'
                  class='absolute text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400 bottom-1 left-1'
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
                      d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span class='sr-only'>Remove image</span>
                </button>
              </div>
              <div class='relative p-2 bg-gray-100 rounded-lg sm:w-36 sm:h-36 dark:bg-gray-700'>
                <img
                  src='https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-side-image.png'
                  alt='imac image'
                />
                <button
                  type='button'
                  class='absolute text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400 bottom-1 left-1'
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
                      d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span class='sr-only'>Remove image</span>
                </button>
              </div>
            </div>
            <div class='flex items-center justify-center w-full'>
              <label
                htmlFor='dropzone-file'
                class='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
              >
                <div class='flex flex-col items-center justify-center pt-5 pb-6'>
                  <svg
                    aria-hidden='true'
                    class='w-10 h-10 mb-3 text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                    />
                  </svg>
                  <p class='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                    <span class='font-semibold'>Click to upload</span>
                    or drag and drop
                  </p>
                  <p class='text-xs text-gray-500 dark:text-gray-400'>
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id='dropzone-file' type='file' class='hidden' />
              </label>
            </div>
          </div>
          <div class='flex items-center mb-4'>
            <input
              id='product-options'
              type='checkbox'
              defaultValue=''
              class='w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
            />
            <label
              htmlFor='product-options'
              class='ml-2 text-sm text-gray-500 dark:text-gray-300'
            >
              Product has multiple options, like different colors or sizes
            </label>
          </div>
          <div class='relative'>
            <div class='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <svg
                aria-hidden='true'
                class='w-5 h-5 text-gray-500 dark:text-gray-400'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <input
              datepicker=''
              id='datepicker'
              type='text'
              class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 datepicker-input'
              defaultValue='15/08/2022'
              placeholder='Select date'
            />
          </div>
        </div>
        <div class='space-y-4 sm:space-y-6'>
          <div>
            <label
              htmlFor='product-brand'
              class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Brand
            </label>
            <input
              type='text'
              id='product-brand'
              class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              defaultValue='Apple'
              placeholder='Product Brand'
              required=''
            />
          </div>
          <div>
            <label
              htmlFor='category'
              class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Category
            </label>
            <select
              id='category'
              class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
            >
              <option selected=''>Electronics</option>
              <option value='TV'>TV/Monitors</option>
              <option value='PC'>PC</option>
              <option value='GA'>Gaming/Console</option>
              <option value='PH'>Phones</option>
            </select>
          </div>
          <div>
            <label
              htmlFor='item-weight'
              class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Item Weight (kg)
            </label>
            <input
              type='number'
              name='item-weight'
              id='item-weight'
              class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              defaultValue={12}
              placeholder='Ex. 12'
              required=''
            />
          </div>
          <div>
            <label
              htmlFor='length'
              class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Length (cm)
            </label>
            <input
              type='number'
              name='length'
              id='lenght'
              class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              defaultValue={105}
              placeholder='Ex. 105'
              required=''
            />
          </div>
          <div>
            <label
              htmlFor='breadth'
              class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Breadth (cm)
            </label>
            <input
              type='number'
              name='breadth'
              id='breadth'
              class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              defaultValue={15}
              placeholder='Ex. 15'
              required=''
            />
          </div>
          <div>
            <label
              htmlFor='width'
              class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Width (cm)
            </label>
            <input
              type='number'
              name='width'
              id='width'
              class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              defaultValue={23}
              placeholder='Ex. 23'
              required=''
            />
          </div>
        </div>
      </div>
      <div class='grid grid-cols-2 gap-4 mt-6 sm:w-1/2'>
        <button
          type='submit'
          class='text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
        >
          Update product
        </button>
        <button
          type='button'
          class='text-red-600 inline-flex justify-center items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'
        >
          <svg
            aria-hidden='true'
            class='w-5 h-5 mr-1 -ml-1'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
              clipRule='evenodd'
            />
          </svg>
          Delete
        </button>
      </div>
    </form>
  )
}
