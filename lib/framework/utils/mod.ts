// deno-lint-ignore-file no-explicit-any
import { _get } from "../../deps/lodash.get.ts";
import { logInfo } from "./console.ts";

export function setEnvVars(envVars: Record<string, any>) {
  for (const key in envVars) {
    Deno.env.set(key, envVars[key]);
  }
  const count = Object.keys(envVars).length;
  logInfo(`Set ${count} development environment variables`);
}

export function filterObjectsByKeyValues<T = Record<string, any>>(
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
          return Object.fromEntries(req.searchParams);
        } catch (_formDataError) {
          return JSON.parse(await req.text());
        }
      }
    }
  }
}
