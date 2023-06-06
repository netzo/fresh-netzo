/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from 'preact'

interface FilterBarProps {
  tags: string[]
  selectedTags: string[]
  onTagSelect: (tag: string) => void
}

export default ({ tags, selectedTags, onTagSelect }: FilterBarProps) => {
  const getClass = (tag: string) =>
    selectedTags.value.includes(tag)
      ? 'bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'
      : 'bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400'

  return (
    <>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagSelect(tag)}
          class={getClass(tag)}
        >
          {tag}
        </button>
      ))}
    </>
  )
}
