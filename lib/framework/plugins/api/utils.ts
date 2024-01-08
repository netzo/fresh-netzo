export const METHODS = [
  "find",
  "get",
  "create",
  "update",
  "patch",
  "remove",
] as NetzoConfig["api"]["methods"];

export const ERRORS = {
  missingApiKey: () => new Response("Missing API key", { status: 401 }),
  invalidApiKey: () => new Response("Invalid API key", { status: 401 }),
  notAllowed: () => new Response("Method not allowed", { status: 405 }),
  invalidRequest: () => new Response("Invalid request", { status: 400 }),
};

export function parseSearchParams(
  searchParams: URLSearchParams,
): { query: object; params: object } {
  return Object.entries(Object.fromEntries(searchParams)).reduce(
    (acc, [key, value]) => (
      key.startsWith("$")
        ? { ...acc, params: { ...acc.params, [key]: value } }
        : { ...acc, query: { ...acc.query, [key]: value } }
    ),
    { query: {}, params: {} },
  );
}
