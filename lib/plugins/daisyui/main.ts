import { injectScript, injectStylesheet } from '../utils.ts'

export default function main() {
  injectStylesheet('https://cdn.jsdelivr.net/npm/daisyui@2.52.0/dist/full.css')
  injectScript('https://cdn.tailwindcss.com')
}
