export interface AuthorizationNone {
  type: "none";
}

export interface AuthorizationBasic {
  type: "basic";
  username?: string;
  password?: string;
  value?: string; // base64 encoded username:password
}

export interface AuthorizationBearer {
  type: "bearer";
  token: string;
}

export interface AuthorizationApiKey {
  type: "apiKey";
  in: "query" | "header"; // | "cookie";
  name: string;
  value: string;
}

// Requires first creating a service account key file in the Google Cloud Console
// https://console.cloud.google.com/apis/credentials/serviceaccountkey
export interface AuthorizationGoogleJwtSa {
  type: "googlejwtsa";
  // NOTE: expects a stringified JSON key file
  // like the result of JSON.stringify(keyFile)
  // or await Deno.readTextFile('./keyFile.json')
  googleServiceAccountCredentials: string;
  googleAuthOptions: {
    scope: string[];
    sub?: string;
  };
}

// This grant type allows your serverless function to obtain access tokens directly
// from the authorization server using its client credentials (clientId and clientSecret)
// It doesn't involve any user authentication and is suitable for server-to-server
// communication where the client (serverless function) acts on its own behalf.
export interface AuthorizationOAuth2ClientCredentials {
  type: "oauth2";
  grantType: "client_credentials";
  headerPrefix?: "Bearer" | string;
  authorizationUrl: string;
  clientId: string;
  clientSecret: string;
  scope?: string;
}

// This response is returned from the authorization server following the Client Credentials flow
// Optional paramaters are marked with a "?" and represent additional information that may be returned
// by the authorization server. Eg. Azure AD returns an "ext_expires_in" parameter
export interface AuthorizationOAuth2AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  ext_expires_in?: number;
}

// This grant type involves exchanging the user's credentials (username and password)
// for an access token. However, this is not generally recommended for serverless
// functions because it requires the client (serverless function) to handle
// sensitive user credentials, which can pose security risks. If possible, you
// avoid using this grant type and opt for a more secure method.
export interface AuthorizationOAuth2PasswordCredentials {
  type: "oauth2";
  grantType: "password_credentials";
  headerPrefix?: "Bearer" | string;
  accessTokenUrl: string;
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
  scope?: string;
}

// Authorization Code Flow (3-legged authorization):
// Use case: Commonly used for server-side web applications where the client ID
// and secret can be securely stored on the server. It involves the client application
// receiving an authorization code through the user's browser after authentication,
// which is then exchanged for an access token with the client secret.
export interface AuthorizationOAuth2AuthorizationCode {
  type: "oauth2";
  grantType: "authorization_code";
  headerPrefix?: "Bearer" | string;
  redirectUrl: string;
  authorizationUrl: string;
  accessTokenUrl: string;
  clientId: string;
  clientSecret: string;
  scope?: string;
  state?: string;
}

export type AuthorizationOAuth2 =
  | AuthorizationOAuth2ClientCredentials
  | AuthorizationOAuth2PasswordCredentials
  | AuthorizationOAuth2AuthorizationCode; // not relevant for backend environments

export type Authorization =
  | AuthorizationNone
  | AuthorizationBasic
  | AuthorizationBearer
  | AuthorizationApiKey
  | AuthorizationGoogleJwtSa
  | AuthorizationOAuth2;
