/** @jsx h */
import { h } from 'preact'

interface AppCardProps {
  name: string
  group: string
  tags: string[]
  logo: string
  description: string
  appLoginUrl: string
}

export default ({
  name,
  group,
  tags,
  logo,
  description,
  appLoginUrl,
}: AppCardProps) => {
  const handleCardClick = () => {
    window.open(appLoginUrl, '_blank')
  }

  return (
    <div
      class='card cursor-pointer border-1 hover:border-primary'
      onClick={handleCardClick}
    >
      <figure>
        <img src={logo} alt={name} class='object-contain max-h-12 max-w-12' />
      </figure>
      <div class='card-body'>
        <h2 class='card-title'>
          {name}
          <div class='badge badge-primary badge-outline'>{group}</div>
        </h2>
        <p>{description}</p>
        <div class='card-actions'>
          {tags.map((tag) => <div class='badge badge-outline'>{tag}</div>)}
        </div>
      </div>
    </div>
  )
}
