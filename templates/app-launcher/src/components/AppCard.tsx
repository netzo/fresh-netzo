/** @jsx h */
import { h } from 'preact'

interface AppCardProps {
  name: string
  tags: string[]
  logo: string
  description: string
  href: string
}

export default ({
  name,
  tags,
  logo,
  description,
  href,
}: AppCardProps) => {
  const handleCardClick = () => window.open(href, '_blank')

  return (
    <div
      class='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:border-blue-400 hover:cursor-pointer'
      onClick={handleCardClick}
    >
      <div class='flex flex-col items-center py-4'>
        <img
          src={logo}
          alt={name}
          class='object-contain w-16 h-16 mb-3 rounded-full shadow-lg'
        />
        <h5 class='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
          {name}
        </h5>
        <span class='text-sm text-gray-500 dark:text-gray-400'>
          {description}
        </span>
        <div class='flex mt-4 md:mt-6'>
          {tags.map((tag) => (
            <span class='bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400'>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
