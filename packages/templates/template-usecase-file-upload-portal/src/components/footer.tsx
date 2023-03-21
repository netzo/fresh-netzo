/** @jsx h */
import { h } from 'https://deno.land/x/netzo@v0.1.59/mod.ts'

export function Footer() {
  return (
    <footer style='display: flex; justify-content: center; padding: 12px 0px;'>
      <a href='https://netzo.io' target='_blank'>
        <img
          src='https://netzo.io/images/built-with-netzo-light.svg'
          style='height: 28px;'
        />
      </a>
    </footer>
  )
}
