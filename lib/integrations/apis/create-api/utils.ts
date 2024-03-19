export function headersToObject(headers: HeadersInit = {}) {
  // SSR compatibility for `Headers` prototype
  if (typeof Headers !== "undefined" && headers instanceof Headers) {
    return Object.fromEntries([...(headers as Headers).entries()]);
  }

  if (Array.isArray(headers)) {
    return Object.fromEntries(headers);
  }

  return headers;
}

/**
 * Simple heuristic to check if a client is an API client
 * @param client {Record<string, unknown>} - the object to check
 * @returns {boolean} - true if the object is an API client
 */
export const isApiClient = (client: Record<string, unknown>) => {
  const METHODS = ["get", "post", "put", "patch", "delete"];
  return METHODS.some((method: string) => client[method]);
};
