/** @jsx h */
import { h } from 'preact'

interface FilterBarProps {
  tags: string[]
  selectedTags: string[]
  onTagSelect: (tag: string) => void
}

export default ({ tags, selectedTags, onTagSelect }: FilterBarProps) => {
  const isActive = (tag: string) => selectedTags.value.includes(tag)
  return (
    <div>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagSelect(tag)}
          class={`badge badge-outline cursor-pointer ${
            isActive(tag) ? 'badge-primary' : ''
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
