/**
 * Script sets an event listener to force reload CMP and page on each consent update
 * @see https://docs.usercentrics.com/#/cmp-v2-ui-api?id=getservices
 */

const customServiceIds = {
  'Airtable': 'bUTe7YRHy-maZH',
  'Auth0': 'LLAY2EL8z',
  'Cloudflare': 'fLGy-OG2f',
  'Customerly': 'ma38H1WeI67i48',
  'Fathom Analytics': 'DJkOqizhU',
  'Google Cloud Run': '-3EoNx5F176g3W',
  'Usercentrics': 'V5PjfrpZz',
  'YouTube Video': 'BJnb3X38F',
}

const originalIdsModifiedServices = {
  'Airtable': 'IdaQw5cVN',
  'Auth0': '7mOrpUraa',
  'Cloudflare': 'HklVcNiuoZX',
  'Usercentrics': 'Hk8e94jOjWX',
  'YouTube Video': 'BJz7qNsdj-7',
}

window.addEventListener('UC_UI_INITIALIZED', (_event) => {
  // const { dataLayer, uc, UC_UI, UC_UI_IS_RENDERED } = window // extract relevant variables

  window.console.debug('[usercentrics] We are protecting your privacy.')

  // NOTE: window.uc is only available when loading the SMP and after UC_UI_INITIALIZED event
  if (window.uc) {
    // 1) dynamically map original ids to their modified counterparts (DO NOT CHANGE)
    window.uc.setServiceAlias(Object.fromEntries(
      Object.entries(originalIdsModifiedServices).map(
        ([service, originalId]) => [originalId, customServiceIds[service]],
      ),
    ))

    // 2) restart CMP and force reload page on changes
    window.uc.onProvidersOrWhitelistedChange = async () => {
      window.console.debug('[usercentrics] Providers or whitelisted changed, restarting CMP and reloading page')
      window.location.reload() // will trigger UC_UI_INITIALIZED (above) again
    }
    // alternatively, individually: window.uc.reloadOnOptIn('SERVICE_ID') // reload page on 'YouTube Video' opt-in
  }
})
