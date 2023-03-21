/** @jsx h */
import { h } from 'https://deno.land/x/netzo@v0.1.59/mod.ts'

export function Header({ title, description }) {
  return (
    <header>
      <div style='display: flex; justify-content: space-between; margin-bottom: 24px;'>
        <h1>{title}</h1>
        <a href='https://netzo.io' target='_blank' style='margin: auto 12px;'>
          <img
            src='https://netzo.io/images/netzo-logo-light.svg'
            style='height: 48px;'
          />
        </a>
      </div>
      <p style='margin-top: 24px;'>
        {description}
      </p>
    </header>
  )
}
