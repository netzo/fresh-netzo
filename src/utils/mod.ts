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
  if (!base) return new URL(url);

  let { origin, pathname } = new URL(base);
  if (origin.endsWith("/")) origin = origin.slice(0, -1);
  if (pathname.endsWith("/")) pathname = pathname.slice(0, -1);
  if (url.startsWith("/")) url = url.slice(1);
  return new URL(`${pathname}/${url}`, origin);
};

/**
 * Parse a string as an ES Module and return its module exports object
 *
 * @param esm {string} - a string representing an ES Module
 * @returns {object} - an object containing all module exports
 */
export const importFromString = (esm = "") => {
  return import(/* @vite-ignore */ `data:text/javascript;base64,${btoa(esm)}`);
};

/**
 * Parse a string as an ESModule and return its named or default export
 *
 * @param esm {string} -  a string representing an ES Module
 * @param name {string} - the name of function (named export) to
 * @returns {object} - a parsed named or default export
 */
export const importFromStringByName = async (
  esm = "export default {}",
  name = "default",
) => {
  const mod = await importFromString(esm);
  return mod?.[name] ?? mod?.default;
};
