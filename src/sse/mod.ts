export interface ClientOptionsSSE {
  [k: string]: unknown; // TODO
}

export interface ClientSSE {
  [k: string]: unknown; // TODO
}

/**
 * Minimal, type-safe SSE client using JS proxies
 */
export function sse(
  _defaultOptions: ClientOptionsSSE,
): ClientSSE {
  // TODO: implement sse client using http client as base
  return {};
}
