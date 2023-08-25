import type { ButtonCta, SectionHeroSimple } from '@theme/components/types'

interface PricingTableSubheader {
  type: 'subheader'
  title: string
  description?: string
}

interface PricingTableCell {
  title: string
  description?: string
  business?: string | { icon: string }
  enterprise?: string | { icon: string }
}

export interface Pricing {
  hero: SectionHeroSimple
  plans: {
    [k: 'business' | 'enterprise' | string]: {
      title: string
      price: string
      unit?: string
      button: ButtonCta
    }
  }
  items: (PricingTableSubheader | PricingTableCell)[]
  faqs: {
    title: string
    items: {
      title: string
      description?: string
    }[]
  }
}
