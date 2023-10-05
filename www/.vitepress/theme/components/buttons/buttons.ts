import type { ButtonCta } from '../types'
import { useUsercentrics } from '../../composables/usercentrics'

const { sendChatMessageOrEmail } = useUsercentrics()

// 'Sign In' (href: 'https://api.netzo.io/oauth/auth0?redirect=/')
export const BUTTONS = {
  'nav-bar-cta': {
    variant: 'primary',
    text: 'Let\'s Talk',
    onClick: () => sendChatMessageOrEmail(),
    class: 'nav-bar-cta', // used to style the button
  },
  'lets-talk': {
    variant: 'primary',
    text: 'Let\'s Talk',
    onClick: () => sendChatMessageOrEmail(),
  },
  'try-for-free': {
    variant: 'primary',
    text: 'Try for Free',
    href: 'https://api.netzo.io/oauth/auth0?redirect=/',
    target: '_blank',
    icon: 'default',
  },
  'book-a-demo': {
    variant: 'secondary',
    text: 'Book a Demo',
    href: 'https://calendar.app.google/uHEnkfwpgYSM1ppN6',
    target: '_blank',
  },
  'learn-more': {
    variant: 'tertiary',
    text: 'Learn More',
    href: '/docs/introduction/getting-started',
  },
  'video-scroll': {
    variant: 'tertiary',
    text: 'Preview',
    icon: 'i-mdi-play-circle',
  },
  'video-modal': {
    variant: 'secondary',
    text: 'Preview',
  },
  'video-modal-consent': {
    variant: 'secondary',
    text: 'Preview',
  },
} satisfies Record<string, ButtonCta>
