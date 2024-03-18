import { _get } from "../../deps/lodash.get.ts";

export const ERRORS = {
  missingApiKey: () => new Response("Missing API key", { status: 401 }),
  invalidApiKey: () => new Response("Invalid API key", { status: 401 }),
  notAllowed: () => new Response("Method not allowed", { status: 405 }),
  invalidRequest: () => new Response("Invalid request", { status: 400 }),
};

// request:

export function parseSearchParams(
  searchParams: URLSearchParams,
): { query: Record<string, string>; params: Record<string, string> } {
  return Object.entries(Object.fromEntries(searchParams)).reduce(
    (acc, [key, value]) => (
      key.startsWith("$")
        ? { ...acc, params: { ...acc.params, [key]: value } }
        : { ...acc, query: { ...acc.query, [key]: value } }
    ),
    { query: {}, params: {} },
  );
}

export async function parseRequestBody(req: Request) {
  const contentType = req.headers.get("content-type"); // case insensitive
  if (contentType?.includes("application/json")) {
    return req.json();
  } else if (
    contentType?.includes("application/x-www-form-urlencoded") ||
    contentType?.includes("multipart/form-data")
  ) {
    const formData = await req.formData();
    return Object.fromEntries([...formData.entries()]);
  } else if (contentType?.includes("text/plain")) {
    return JSON.parse(await req.text());
  } else {
    try {
      return req.json();
    } catch (_jsonError) {
      try {
        return Object.fromEntries((await req.formData()).entries());
      } catch (_formDataError) {
        try {
          const url = new URL(req.url);
          return Object.fromEntries(url.searchParams.entries());
        } catch (_formDataError) {
          return JSON.parse(await req.text());
        }
      }
    }
  }
}

export function filterObjectsByKeyValues<T = unknown>(
  data: T[],
  filters: Record<string, any> = {},
) {
  // filter item out if any of the filters fail, otherwise keep it
  return !Object.keys(filters).length ? data : data.filter((item) => {
    return !Object.entries(filters).some(([key, value]) => {
      const itemValue = _get(item, key, "").toString();
      return itemValue?.toLowerCase() !== value?.toLowerCase(); // case insensitive
    });
  });
}
