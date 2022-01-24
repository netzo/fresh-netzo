export const getApiUrl = (): string => {
  // FIXME: This is a temporary hack to get the API URL for the current environment
  // since when running inside an iframe origin === 'null', therefore we use
  // ancestorOrigins[0] to get the correct origin. This should work for most cases
  // in the browser or else default to 'https://app.netzo.io'
  if (typeof window === 'undefined') return 'https://app.netzo.io' // non-browser enviorment
  const { port, origin, ancestorOrigins } = window?.location
  const trueOrigin = origin === 'null' ? ancestorOrigins?.[0] : origin
  return trueOrigin.includes('localhost')
    ? trueOrigin.replace(port, '4321') // development (localhost:4321)
    : trueOrigin.replace('app.', 'api.').replace('www.', '') // production (https://api.netzo.io)
}

export const getToken = (): string | null => window.localStorage.getItem('netzo-jwt')
