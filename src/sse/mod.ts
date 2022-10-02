export interface ClientOptionsSSE {}

export interface ClientSSE {}

/**
 * Minimal, type-safe SSE client using JS proxies
 */
export function sse(
  defaultOptions: ClientOptionsSSE,
): ClientSSE {
  // TODO: implement sse client using http client as base
  return {};
}
