/**
 * Resolves a url and an optional base without discarding the
 * pathname of the base (if any), required since new URL() discards it:
 * new URL('foo', 'http://example.com/bar').href => http://example.com/foo
 * resolveURL('foo', 'http://example.com/bar').href => http://example.com/bar/foo
 *
 * @param url {string} - the url to fetch
 * @param base {string} - (optional) the base url to use
 * @returns {URL} - the resolved url
 */
export const resolveURL = (url: string, base?: string): URL => {
  if (!base) return new URL(url)

  let { origin, pathname } = new URL(base)
  if (origin.endsWith('/')) origin = origin.slice(0, -1)
  if (pathname.endsWith('/')) pathname = pathname.slice(0, -1)
  if (url.startsWith('/')) url = url.slice(1)
  return new URL(`${pathname}/${url}`, origin)
}
