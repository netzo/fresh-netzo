export interface ClientOptionsWebSocket {
  [k: string]: unknown; // TODO
}

export interface ClientWebSocket {
  [k: string]: unknown; // TODO
}

/**
 * Minimal, type-safe WebSocket client using JS proxies
 */
export function websocket(
  _defaultOptions: ClientOptionsWebSocket,
): ClientWebSocket {
  // TODO: implement websocket client using http client as base
  return {};
}
