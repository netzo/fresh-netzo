/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from 'preact'
import DrawerUpdate from '../components/DrawerUpdate.tsx'
import DrawerRead from '../components/DrawerRead.tsx'
import ModalCreate from '../components/ModalCreate.tsx'
import ModalDelete from '../components/ModalDelete.tsx'
import RatingStars from '../components/table/RatingStars.tsx'
import products, { Product } from '../data/products.ts'
import {
  usePagination,
  useSearch,
  useSelected,
} from '../../../../lib/hooks/mod.ts'

const {
  page,
  itemsPerPage,
  pageCount,
  paginatedItems,
} = usePagination<Product>(products)
const {
  search,
  filteredItems,
} = useSearch<Product>(paginatedItems.value)
const {
  selected,
  selectedAll,
  selectedCount,
  selectedAllCount,
} = useSelected<Product>()

export default () => {
  return (
    <>
      {/* Start block */}
      <section class='bg-gray-50 dark:bg-gray-900 antialiased'>
        <div class='mx-auto px-4 lg:px-12'>
          <div class='bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden'>
            <div class='flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700'>
              <div class='w-full md:w-1/2'>
                <form class='flex items-center'>
                  <label htmlFor='simple-search' class='sr-only'>
                    Search
                  </label>
                  <div class='relative w-full'>
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
                          clipRule='evenodd'
                          d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                        />
                      </svg>
                    </div>
                    <input
                      type='text'
                      id='simple-search'
                      placeholder='Search for products'
                      required
                      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      value={search.value}
                      onInput={(e) =>
                        search.value = (e.target as HTMLInputElement).value}
                    />
                  </div>
                </form>
              </div>
              <div class='w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0'>
                <button
                  type='button'
                  id='createProductButton'
                  data-modal-toggle='createProductModal'
                  class='flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'
                >
                  <svg
                    class='h-3.5 w-3.5 mr-1.5 -ml-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                  >
                    <path
                      clipRule='evenodd'
                      fillRule='evenodd'
                      d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
                    />
                  </svg>
                  Add product
                </button>
                <button
                  id='filterDropdownButton'
                  data-dropdown-toggle='filterDropdown'
                  class='w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                  type='button'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                    class='h-4 w-4 mr-1.5 -ml-1 text-gray-400'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Filter options
                  <svg
                    class='-mr-1 ml-1.5 w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                  >
                    <path
                      clipRule='evenodd'
                      fillRule='evenodd'
                      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    />
                  </svg>
                </button>
                <div
                  id='filterDropdown'
                  class='z-10 hidden px-3 pt-1 bg-white rounded-lg shadow w-80 dark:bg-gray-700 right-0'
                >
                  <div class='flex items-center justify-between pt-2'>
                    <h6 class='text-sm font-medium text-black dark:text-white'>
                      Filters
                    </h6>
                    <div class='flex items-center space-x-3'>
                      <a
                        href='#'
                        class='flex items-center text-sm font-medium text-primary-600 dark:text-primary-500 hover:underline'
                      >
                        Save view
                      </a>
                      <a
                        href='#'
                        class='flex items-center text-sm font-medium text-primary-600 dark:text-primary-500 hover:underline'
                      >
                        Clear all
                      </a>
                    </div>
                  </div>
                  <div class='pt-3 pb-2'>
                    <label htmlFor='input-group-search' class='sr-only'>
                      Search
                    </label>
                    <div class='relative'>
                      <div class='absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none'>
                        <svg
                          class='w-4 h-4 text-gray-500 dark:text-gray-400'
                          aria-hidden='true'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </div>
                      <input
                        type='text'
                        id='input-group-search'
                        class='block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                        placeholder='Search keywords...'
                      />
                    </div>
                  </div>
                  <div
                    id='accordion-flush'
                    data-accordion='collapse'
                    data-active-classes='text-black dark:text-white'
                    data-inactive-classes='text-gray-500 dark:text-gray-400'
                  >
                    {/* Category */}
                    <h2 id='category-heading'>
                      <button
                        type='button'
                        class='flex items-center justify-between w-full py-2 px-1.5 text-sm font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                        data-accordion-target='#category-body'
                        aria-expanded='true'
                        aria-controls='category-body'
                      >
                        <span>Category</span>
                        <svg
                          aria-hidden='true'
                          data-accordion-icon
                          class='w-5 h-5 rotate-180 shrink-0'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                          />
                        </svg>
                      </button>
                    </h2>
                    <div
                      id='category-body'
                      class='hidden'
                      aria-labelledby='category-heading'
                    >
                      <div class='py-2 font-light border-b border-gray-200 dark:border-gray-600'>
                        <ul class='space-y-2'>
                          <li class='flex items-center'>
                            <input
                              id='apple'
                              type='checkbox'
                              defaultValue
                              class='w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                            />
                            <label
                              htmlFor='apple'
                              class='ml-2 text-sm font-medium text-gray-900 dark:text-gray-100'
                            >
                              Apple (56)
                            </label>
                          </li>
                          <li class='flex items-center'>
                            <input
                              id='microsoft'
                              type='checkbox'
                              defaultValue
                              class='w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                            />
                            <label
                              htmlFor='microsoft'
                              class='ml-2 text-sm font-medium text-gray-900 dark:text-gray-100'
                            >
                              Microsoft (45)
                            </label>
                          </li>
                          <li class='flex items-center'>
                            <input
                              id='logitech'
                              type='checkbox'
                              defaultValue
                              defaultChecked
                              class='w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                            />
                            <label
                              htmlFor='logitech'
                              class='ml-2 text-sm font-medium text-gray-900 dark:text-gray-100'
                            >
                              Logitech (97)
                            </label>
                          </li>
                          <li class='flex items-center'>
                            <input
                              id='sony'
                              type='checkbox'
                              defaultValue
                              class='w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                            />
                            <label
                              htmlFor='sony'
                              class='ml-2 text-sm font-medium text-gray-900 dark:text-gray-100'
                            >
                              Sony (234)
                            </label>
                          </li>
                          <li class='flex items-center'>
                            <input
                              id='asus'
                              type='checkbox'
                              defaultValue
                              defaultChecked
                              class='w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                            />
                            <label
                              htmlFor='asus'
                              class='ml-2 text-sm font-medium text-gray-900 dark:text-gray-100'
                            >
                              Asus (97)
                            </label>
                          </li>
                          <li class='flex items-center'>
                            <input
                              id='dell'
                              type='checkbox'
                              defaultValue
                              class='w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                            />
                            <label
                              htmlFor='dell'
                              class='ml-2 text-sm font-medium text-gray-900 dark:text-gray-100'
                            >
                              Dell (56)
                            </label>
                          </li>
                          <li class='flex items-center'>
                            <input
                              id='msi'
                              type='checkbox'
                              defaultValue
                              class='w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                            />
                            <label
                              htmlFor='msi'
                              class='ml-2 text-sm font-medium text-gray-900 dark:text-gray-100'
                            >
                              MSI (97)
                            </label>
                          </li>
                          <li class='flex items-center'>
                            <input
                              id='canon'
                              type='checkbox'
                              defaultValue
                              defaultChecked
                              class='w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                            />
                            <label
                              htmlFor='canon'
                              class='ml-2 text-sm font-medium text-gray-900 dark:text-gray-100'
                            >
                              Canon (49)
                            </label>
                          </li>
                          <li class='flex items-center'>
                            <input
                              id='benq'
                              type='checkbox'
                              defaultValue
                              class='w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                            />
                            <label
                              htmlFor='benq'
                              class='ml-2 text-sm font-medium text-gray-900 dark:text-gray-100'
                            >
                              BenQ (23)
                            </label>
                          </li>
                          <li class='flex items-center'>
                            <input
                              id='razor'
                              type='checkbox'
                              defaultValue
                              class='w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                            />
                            <label
                              htmlFor='razor'
                              class='ml-2 text-sm font-medium text-gray-900 dark:text-gray-100'
                            >
                              Razor (49)
                            </label>
                          </li>
                          <a
                            href='#'
                            class='flex items-center text-sm font-medium text-primary-600 dark:text-primary-500 hover:underline'
                          >
                            View all
                          </a>
                        </ul>
                      </div>
                    </div>
                    {/* Price */}
                    <h2 id='price-heading'>
                      <button
                        type='button'
                        class='flex items-center justify-between w-full py-2 px-1.5 text-sm font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                        data-accordion-target='#price-body'
                        aria-expanded='true'
                        aria-controls='price-body'
                      >
                        <span>Price</span>
                        <svg
                          aria-hidden='true'
                          data-accordion-icon
                          class='w-5 h-5 rotate-180 shrink-0'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                          />
                        </svg>
                      </button>
                    </h2>
                    <div
                      id='price-body'
                      class='hidden'
                      aria-labelledby='price-heading'
                    >
                      <div class='flex items-center py-2 space-x-3 font-light border-b border-gray-200 dark:border-gray-600'>
                        <select
                          id='price-from'
                          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                        >
                          <option disabled selected>
                            From
                          </option>
                          <option>$500</option>
                          <option>$2500</option>
                          <option>$5000</option>
                        </select>
                        <select
                          id='price-to'
                          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                        >
                          <option disabled selected>
                            To
                          </option>
                          <option>$500</option>
                          <option>$2500</option>
                          <option>$5000</option>
                        </select>
                      </div>
                    </div>
                    {/* Worldwide Shipping */}
                    <h2 id='worldwide-shipping-heading'>
                      <button
                        type='button'
                        class='flex items-center justify-between w-full py-2 px-1.5 text-sm font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                        data-accordion-target='#worldwide-shipping-body'
                        aria-expanded='true'
                        aria-controls='worldwide-shipping-body'
                      >
                        <span>Worldwide Shipping</span>
                        <svg
                          aria-hidden='true'
                          data-accordion-icon
                          class='w-5 h-5 rotate-180 shrink-0'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                          />
                        </svg>
                      </button>
                    </h2>
                    <div
                      id='worldwide-shipping-body'
                      class='hidden'
                      aria-labelledby='worldwide-shipping-heading'
                    >
                      <div class='py-2 space-y-2 font-light border-b border-gray-200 dark:border-gray-600'>
                        <label class='relative flex items-center cursor-pointer'>
                          <input
                            type='checkbox'
                            defaultValue
                            class='sr-only peer'
                            name='shipping'
                            defaultChecked
                          />
                          <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600" />
                          <span class='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                            North America
                          </span>
                        </label>
                        <label class='relative flex items-center cursor-pointer'>
                          <input
                            type='checkbox'
                            defaultValue
                            class='sr-only peer'
                            name='shipping'
                          />
                          <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600" />
                          <span class='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                            South America
                          </span>
                        </label>
                        <label class='relative flex items-center cursor-pointer'>
                          <input
                            type='checkbox'
                            defaultValue
                            class='sr-only peer'
                            name='shipping'
                          />
                          <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600" />
                          <span class='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                            Asia
                          </span>
                        </label>
                        <label class='relative flex items-center cursor-pointer'>
                          <input
                            type='checkbox'
                            defaultValue
                            class='sr-only peer'
                            name='shipping'
                            defaultChecked
                          />
                          <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600" />
                          <span class='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                            Australia
                          </span>
                        </label>
                        <label class='relative flex items-center cursor-pointer'>
                          <input
                            type='checkbox'
                            defaultValue
                            class='sr-only peer'
                            name='shipping'
                          />
                          <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600" />
                          <span class='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                            Europe
                          </span>
                        </label>
                      </div>
                    </div>
                    {/* Rating */}
                    <h2 id='rating-heading'>
                      <button
                        type='button'
                        class='flex items-center justify-between w-full py-2 px-1.5 text-sm font-medium text-left text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                        data-accordion-target='#rating-body'
                        aria-expanded='true'
                        aria-controls='rating-body'
                      >
                        <span>Rating</span>
                        <svg
                          aria-hidden='true'
                          data-accordion-icon
                          class='w-5 h-5 rotate-180 shrink-0'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                          />
                        </svg>
                      </button>
                    </h2>
                    <div
                      id='rating-body'
                      class='hidden'
                      aria-labelledby='rating-heading'
                    >
                      <div class='py-2 space-y-2 font-light border-b border-gray-200 dark:border-gray-600'>
                        <div class='flex items-center'>
                          <input
                            id='five-stars'
                            type='radio'
                            defaultValue
                            name='rating'
                            class='w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                          />
                          <label
                            htmlFor='five-stars'
                            class='flex items-center ml-2'
                          >
                            <svg
                              aria-hidden='true'
                              class='w-5 h-5 text-yellow-400'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <title>First star</title>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                            <svg
                              aria-hidden='true'
                              class='w-5 h-5 text-yellow-400'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <title>Second star</title>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                            <svg
                              aria-hidden='true'
                              class='w-5 h-5 text-yellow-400'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <title>Third star</title>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                            <svg
                              aria-hidden='true'
                              class='w-5 h-5 text-yellow-400'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <title>Fourth star</title>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                            <svg
                              aria-hidden='true'
                              class='w-5 h-5 text-yellow-400'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <title>Fifth star</title>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                          </label>
                        </div>
                        <div class='flex items-center'>
                          <input
                            id='four-stars'
                            type='radio'
                            defaultValue
                            name='rating'
                            class='w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                          />
                          <label
                            htmlFor='four-stars'
                            class='flex items-center ml-2'
                          >
                            <svg
                              aria-hidden='true'
                              class='w-5 h-5 text-yellow-400'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <title>First star</title>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                            <svg
                              aria-hidden='true'
                              class='w-5 h-5 text-yellow-400'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <title>Second star</title>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                            <svg
                              aria-hidden='true'
                              class='w-5 h-5 text-yellow-400'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <title>Third star</title>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                            <svg
                              aria-hidden='true'
                              class='w-5 h-5 text-yellow-400'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <title>Fourth star</title>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                            <svg
                              aria-hidden='true'
                              class='w-5 h-5 text-gray-300 dark:text-gray-500'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <title>Fifth star</title>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                          </label>
                        </div>
                        <div class='flex items-center'>
                          <input
                            id='three-stars'
                            type='radio'
                            defaultValue
                            name='rating'
                            defaultChecked
                            class='w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                          />
                          <label
                            htmlFor='three-stars'
                            class='flex items-center ml-2'
                          >
                            <svg
                              aria-hidden='true'
                              class='w-5 h-5 text-yellow-400'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <title>First star</title>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                            <svg
                              aria-hidden='true'
                              class='w-5 h-5 text-yellow-400'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <title>Second star</title>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                            <svg
                              aria-hidden='true'
                              class='w-5 h-5 text-yellow-400'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <title>Third star</title>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                            <svg
                              aria-hidden='true'
                              class='w-5 h-5 text-gray-300 dark:text-gray-500'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <title>Fourth star</title>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                            <svg
                              aria-hidden='true'
                              class='w-5 h-5 text-gray-300 dark:text-gray-500'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <title>Fifth star</title>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                          </label>
                        </div>
                        <div class='flex items-center'>
                          <input
                            id='two-stars'
                            type='radio'
                            defaultValue
                            name='rating'
                            class='w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                          />
                          <label
                            htmlFor='two-stars'
                            class='flex items-center ml-2'
                          >
                            <svg
                              aria-hidden='true'
                              class='w-5 h-5 text-yellow-400'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <title>First star</title>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                            <svg
                              aria-hidden='true'
                              class='w-5 h-5 text-yellow-400'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <title>Second star</title>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                            <svg
                              aria-hidden='true'
                              class='w-5 h-5 text-gray-300 dark:text-gray-500'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <title>Third star</title>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                            <svg
                              aria-hidden='true'
                              class='w-5 h-5 text-gray-300 dark:text-gray-500'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <title>Fourth star</title>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                            <svg
                              aria-hidden='true'
                              class='w-5 h-5 text-gray-300 dark:text-gray-500'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <title>Fifth star</title>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                          </label>
                        </div>
                        <div class='flex items-center'>
                          <input
                            id='one-star'
                            type='radio'
                            defaultValue
                            name='rating'
                            class='w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                          />
                          <label
                            htmlFor='one-star'
                            class='flex items-center ml-2'
                          >
                            <svg
                              aria-hidden='true'
                              class='w-5 h-5 text-yellow-400'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <title>First star</title>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                            <svg
                              aria-hidden='true'
                              class='w-5 h-5 text-gray-300 dark:text-gray-500'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <title>Second star</title>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                            <svg
                              aria-hidden='true'
                              class='w-5 h-5 text-gray-300 dark:text-gray-500'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <title>Third star</title>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                            <svg
                              aria-hidden='true'
                              class='w-5 h-5 text-gray-300 dark:text-gray-500'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <title>Fourth star</title>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                            <svg
                              aria-hidden='true'
                              class='w-5 h-5 text-gray-300 dark:text-gray-500'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <title>Fifth star</title>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class='overflow-x-auto'>
              <table class='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead class='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' class='p-4'>
                      <div class='flex items-center'>
                        <input
                          id='checkbox-all'
                          type='checkbox'
                          class='w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                        />
                        <label htmlFor='checkbox-all' class='sr-only'>
                          checkbox
                        </label>
                      </div>
                    </th>
                    <th scope='col' class='p-4'>
                      Product
                    </th>
                    <th scope='col' class='p-4'>
                      Category
                    </th>
                    <th scope='col' class='p-4'>
                      Stock
                    </th>
                    <th scope='col' class='p-4'>
                      Rating
                    </th>
                    <th scope='col' class='p-4'>
                      Sales
                    </th>
                    <th scope='col' class='p-4'>
                      Revenue
                    </th>
                    <th scope='col' class='p-4'>
                      Last Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.value.map((product: Product) => (
                    <tr class='border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'>
                      <td class='p-4 w-4'>
                        <div class='flex items-center'>
                          <input
                            id='checkbox-table-search-1'
                            type='checkbox'
                            onInput={(e) => e.stopPropagation()}
                            class='w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                          />
                          <label
                            htmlFor='checkbox-table-search-1'
                            class='sr-only'
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope='row'
                        class='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                      >
                        <div class='flex items-center mr-3'>
                          <img
                            src={product.image}
                            alt={product.name}
                            class='h-8 w-auto mr-3'
                          />
                          {product.name}
                        </div>
                      </th>
                      <td class='px-4 py-3'>
                        <span class='bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300'>
                          {product.category}
                        </span>
                      </td>
                      <td class='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                        <div class='flex items-center'>
                          <div class='h-4 w-4 rounded-full inline-block mr-2 bg-red-700' />
                          95
                        </div>
                      </td>
                      <td class='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                        <RatingStars rating={product.rating} />
                      </td>
                      <td class='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                        <div class='flex items-center'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='currentColor'
                            class='w-5 h-5 text-gray-400 mr-2'
                            aria-hidden='true'
                          >
                            <path d='M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z' />
                          </svg>
                          {product.sales}
                        </div>
                      </td>
                      <td class='px-4 py-3'>{product.revenue}</td>
                      <td class='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                        <div class='flex items-center space-x-4'>
                          <button
                            type='button'
                            data-drawer-target='drawer-update-product'
                            data-drawer-show='drawer-update-product'
                            aria-controls='drawer-update-product'
                            class='py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              class='h-4 w-4 mr-2 -ml-0.5'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                              aria-hidden='true'
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
                            data-drawer-target='drawer-read-product-advanced'
                            data-drawer-show='drawer-read-product-advanced'
                            aria-controls='drawer-read-product-advanced'
                            class='py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 24 24'
                              fill='currentColor'
                              class='w-4 h-4 mr-2 -ml-0.5'
                            >
                              <path d='M12 15a3 3 0 100-6 3 3 0 000 6z' />
                              <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z'
                              />
                            </svg>
                            Preview
                          </button>
                          <button
                            type='button'
                            data-modal-target='delete-modal'
                            data-modal-toggle='delete-modal'
                            class='flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              class='h-4 w-4 mr-2 -ml-0.5'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                              aria-hidden='true'
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <nav
              class='flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4'
              aria-label='Table navigation'
            >
              <span class='text-sm font-normal text-gray-500 dark:text-gray-400'>
                Showing
                <span class='font-semibold text-gray-900 dark:text-white'>
                  1-10
                </span>
                of
                <span class='font-semibold text-gray-900 dark:text-white'>
                  1000
                </span>
              </span>
              <ul class='inline-flex items-stretch -space-x-px'>
                <li>
                  <a
                    href='#'
                    class='flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    <span class='sr-only'>Previous</span>
                    <svg
                      class='w-5 h-5'
                      aria-hidden='true'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    class='flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    class='flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    aria-current='page'
                    class='flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    class='flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    ...
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    class='flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    100
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    class='flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    <span class='sr-only'>Next</span>
                    <svg
                      class='w-5 h-5'
                      aria-hidden='true'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      {/* End block */}
      <ModalCreate />
      {/* drawer component */}
      <DrawerUpdate />
      {/* Preview Drawer */}
      <DrawerRead />
      {/* Delete Modal */}
      <ModalDelete />
    </>
  )
}
