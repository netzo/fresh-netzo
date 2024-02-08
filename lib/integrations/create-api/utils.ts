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
