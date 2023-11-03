// deno-lint-ignore-file no-explicit-any
import _get from "https://esm.sh/lodash.get@4.4.2";
import { logInfo } from "netzo/cli/src/console.ts";

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
  let filteredData = data;

  if (Object.keys(filters).length > 0) {
    for (const key in filters) {
      if (filters[key]) {
        const value = filters[key];

        if (key.includes(".")) {
          filteredData = filteredData.filter((item) =>
            _get(item, key, "").toLowerCase().includes(value.toLowerCase())
          );
        } else {
          filteredData = filteredData.filter((item) =>
            _get(item, key, "").toLowerCase().includes(value.toLowerCase())
          );
        }
      }
    }
  }

  return filteredData;
}

export async function parseRequestBody(req: Request) {
  const contentType = req.headers.get("content-type"); // case insensitive
  if (contentType?.includes("application/json")) {
    return req.json();
  } else if (contentType?.includes("multipart/form-data")) {
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
        return JSON.parse(await req.text());
      }
    }
  }
}
