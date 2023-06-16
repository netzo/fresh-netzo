/** @jsx h */
import { h } from 'preact'

interface Props {
  rating: number
  showLabel?: boolean
}

export default ({ rating, showLabel = true }: Props) => {
  const stars = Math.round(rating * 2) / 2
  const fullStars = Math.floor(stars)
  const hasHalfStar = stars % 1 !== 0
  const emptyStars = hasHalfStar ? 5 - fullStars - 1 : 5 - fullStars

  // return (
  //   <svg
  //   aria-hidden='true'
  //   class='w-5 h-5 text-yellow-400'
  //   fill='currentColor'
  //   viewBox='0 0 20 20'
  //   xmlns='http://www.w3.org/2000/svg'
  // >
  //   <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
  // </svg>
  // )

  return (
    <div className='flex items-center'>
      {Array.from({ length: fullStars }).map((_, i) => (
        <svg
          key={i}
          aria-hidden='true'
          class='w-5 h-5 text-yellow-400'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      ))}
      {hasHalfStar && (
        <svg
          aria-hidden='true'
          class='w-5 h-5 text-yellow-400'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <svg
          key={i}
          aria-hidden='true'
          class='w-5 h-5 text-gray-300'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill-rule='evenodd'
            d='M10 12.585l-4.243 2.45a1 1 0 01-1.497-1.054l.823-4.804L1.11 6.965a1 1 0 01.583-1.705l4.804-.698L9.31.965a1 1 0 011.88 0l2.813 5.597 4.804.698a1 1 0 01.583 1.705l-3.973 4.312.823 4.804a1 1 0 01-1.497 1.054L10 12.585z'
            clip-rule='evenodd'
          />
        </svg>
      ))}
      {showLabel && (
        <span class='text-gray-500 dark:text-gray-400 ml-1'>{rating}</span>
      )}
    </div>
  )
}
