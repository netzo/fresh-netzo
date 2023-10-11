import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { HeadConfig } from 'vitepress'

export const head: HeadConfig[] = [
  // [scripts] loaded before usercentrics
  ['script', {
    type: 'text/javascript', async: 'true',
  }, readFileSync(resolve(__dirname, './scripts/chat-popup.js'), 'utf-8')],

  // [usercentrics] CMP (Consent Management Platform) script (loader.js)
  ['script', {
    'id': 'usercentrics-cmp',
    // FIXME: loader.js script MIGHT SLOW DOWN APP (in development)
    'src': 'https://app.usercentrics.eu/browser-ui/latest/loader.js',
    'data-settings-id': 'sZu6kSROU',
    // 'data-disable-tracking': true, // only for non-production. default preview site
    // 'data-version': 'preview', // only for non-production. default preview site
    'async': 'true',
  }],

  // [usercentrics] SMP (Smart Data Protector) script (uc-block.bundle.js): loads window.uc object
  // SMP is required to block embeds not directly implemented as scripts (e.g. iframes, noscript tags,
  // image tags) until consent is given (shows an overlay prompting user to enable, e.g. 'YouTube')
  ['script', { type: 'application/javascript', src: 'https://privacy-proxy.usercentrics.eu/latest/uc-block.bundle.js' }],

  // [usercentrics] DSR (Data Subject Request) script: injects button in privacy policy
  ['script', {
    type: 'application/javascript',
    src: 'https://dsr.consent.usercentrics.eu/dsr_url.js',
    dsr_text: 'DSR',
  }],

  // [scripts] loaded after usercentrics
  ['script', {}, readFileSync(resolve(__dirname, './scripts/usercentrics.js'), 'utf-8')],
  // 1) Essential services/cookies
  ['script', {
    'src': 'https://cdn.usefathom.com/script.js',
    'type': 'text/plain',
    'data-usercentrics': 'Fathom Analytics',
    'data-site': 'QREQWIXF', // NOTE: will only fire event in production (under netzo.io/)
    'data-spa': 'auto',
    'defer': '',
  }],
  // 2) Functional services/cookies
  ['script', {
    'type': 'text/plain',
    'data-usercentrics': 'Hotjar',
    'defer': '',
  }, readFileSync(resolve(__dirname, './scripts/hotjar.js'), 'utf-8')],
  // 3) Statistics services/cookies
  // 4) Marketing services/cookies
  // 5) Video services/cookies
]
