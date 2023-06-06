import { FetchContext } from "https://esm.sh/ofetch@1.0.0";
import { Authorization } from "./types.ts";
import { getToken } from "./oauth2/mod.ts";

/**
 * Auth hook to mutate context based on authorization.type
 *
 * @see https://gomakethings.com/using-oauth-with-fetch-in-vanilla-js/
 *
 * @param authorization {Authorization} - the authorization object containing the type its corresponding options
 * @param context {FetchContext} - the context object to mutate ({ request, options })
 */
export const auth = async (
  authorization: Authorization = { type: "none" },
  { request: _, options }: FetchContext,
) => {
  const query = {} as Record<string, string>;
  const headers = {} as Record<string, string>;

  if (authorization.type === "basic") {
    const { username, password } = authorization;
    const token = btoa(`${username}:${password}`);
    headers.Authorization = `Basic ${token}`;
  } else if (authorization.type === "bearer") {
    const { token } = authorization;
    headers.Authorization = `Bearer ${token}`;
  } else if (authorization.type === "apiKey") {
    const { in: In, name, value } = authorization;
    if (In === "query") query[name] = value;
    if (In === "header") headers[name] = value;
  } else if (authorization.type === "oauth2") {
    const { headerPrefix = "Bearer" } = authorization;
    const { token_type = headerPrefix, access_token } = await getToken(
      authorization,
    );
    headers.Authorization = token_type
      ? `${token_type} ${access_token}`
      : access_token;
  }

  options.query = { ...options.query, ...query };
  options.headers = { ...options.headers, ...headers };
};
