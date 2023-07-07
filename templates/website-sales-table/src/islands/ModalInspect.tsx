export default () => {
  return (
    <div
      id='inspectModal'
      tabIndex={-1}
      aria-hidden='true'
      class='hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full'
    >
      <div class='relative p-4 w-full max-w-3xl h-full md:h-auto'>
        {/* Modal content */}
        <div class='relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5'>
          {/* Modal header */}
          <div class='flex justify-between items-center pb-4 mb-4 rounded-t sm:mb-5 dark:border-gray-600'>
            <h3 class='text-lg font-semibold text-gray-900 dark:text-white'>
              Inspect Product
            </h3>
            <button
              type='button'
              id='createProductButton'
              data-modal-toggle='inspectModal'
              class='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
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
              <span class='sr-only'>Close modal</span>
            </button>
          </div>

          <img
            src='https://blog.coursify.me/wp-content/uploads/2019/07/sales-forecast-chart.png'
            class='w-full'
          />
        </div>
      </div>
    </div>
  )
}
