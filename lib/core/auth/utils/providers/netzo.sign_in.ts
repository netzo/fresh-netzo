// adapted from https://github.com/denoland/deno_kv_oauth/blob/main/lib/sign_in.ts
import { Cookie, SECOND, setCookie } from "../../../../deps/deno_kv_oauth/deps.ts";
import {
  COOKIE_BASE,
  getCookieName,
  getSuccessUrl,
  isHttps,
  OAUTH_COOKIE_NAME,
  redirect,
} from "../../../../deps/deno_kv_oauth/lib/_http.ts";
import { setOAuthSession } from "../../../../deps/deno_kv_oauth/lib/_kv.ts";
import { NetzoClientConfig } from "./netzo.ts";

export interface SignInOptions {
  /** URL parameters that are appended to the authorization URI, if defined. */
  urlParams?: Record<string, string>;
}

/**
 * Handles the sign-in request and process for the given Netzo configuration
 * and redirects the client to the authorization URL.
 */
export async function signIn(
  request: Request,
  /** @see {@linkcode NetzoClientConfig} */
  _clientConfig: NetzoClientConfig,
  options?: SignInOptions,
): Promise<Response> {
  const state = crypto.randomUUID();
  const { NETZO_API_URL = "https://api.netzo.io" } = Deno.env.toObject();
  const url = new URL(request.url);
  const redirectUrl = `${url.origin}/auth/netzo/callback`;
  const uri = new URL(`${NETZO_API_URL}/oauth/auth0?redirect=${redirectUrl}`);

  if (options?.urlParams) {
    Object.entries(options.urlParams).forEach(([key, value]) =>
      uri.searchParams.append(key, value)
    );
  }

  const oauthSessionId = crypto.randomUUID();
  const cookie: Cookie = {
    ...COOKIE_BASE,
    name: getCookieName(OAUTH_COOKIE_NAME, isHttps(request.url)),
    value: oauthSessionId,
    secure: isHttps(request.url),
    /**
     * A maximum authorization code lifetime of 10 minutes is recommended.
     * This cookie lifetime matches that value.
     *
     * @see {@link https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2}
     */
    maxAge: 10 * 60,
  };
  const successUrl = getSuccessUrl(request);
  await setOAuthSession(
    oauthSessionId,
    { state, codeVerifier: "", successUrl },
    {
      expireIn: cookie.maxAge! * SECOND,
    },
  );
  const response = redirect(uri.toString());
  setCookie(response.headers, cookie);
  return response;
}
