export function headersToObject(headers: HeadersInit = {}) {
  // SSR compatibility for `Headers` prototype
  if (typeof Headers !== "undefined" && headers instanceof Headers) {
    // deno-lint-ignore no-explicit-any
    return Object.fromEntries([...(headers as any).entries()]);
  }

  if (Array.isArray(headers)) {
    return Object.fromEntries(headers);
  }

  return headers;
}
