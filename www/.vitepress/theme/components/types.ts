import type { BUTTONS } from './buttons/buttons'

export interface Video {
  alt: string
  src: string
  poster: string
  class: string
  subtitles: {
    label: string
    kind: string
    srclang: string
    src: string
    default: boolean
  }[]
}

// button:

export interface ButtonCta {
  // either:
  type?: keyof typeof BUTTONS
  // or:
  variant?: 'primary' | 'secondary' | 'tertiary' // default: 'primary'
  text?: string
  href?: string
  target?: '_blank' | string
  onClick?: () => void
  icon?: 'default' | string
  caption?: string
  class?: string
  video?: Video
}

// list:

export interface ListItem {
  icon?: string // accepts color e.g. i-mdi-close-circle-outline text-accent-500
  text: string
}

// sections:

export interface Section {
  inverted?: Boolean // (optional) reverse flex order
  topic?: string
  title?: string
  description?: string
  buttons?: ButtonCta[]
  items?: Item[]
  image?: Image
  link?: {
    text: string
    href: string
    alt?: string
  } // (optional) link to a page (e.g. Learn more)
}

export interface SectionHeroSimple {
  topic?: string
  chip?: 'soon' | 'alpha' | 'beta' | 'new' | string
  title: string
  description: string
  buttons?: ButtonCta[]
  image?: Image
}

export interface SectionHero extends SectionHeroSimple {
  image: Image
}

export interface Item {
  icon?: string
  topic?: string
  title?: string
  description?: string
}

interface Image {
  src: string
  alt: string
  class: string
  [k: string]: any
}

export interface CardNav {
  title: string
  description?: string
  icon: string
  href?: string
}
