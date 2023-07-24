export interface AuthorizationNone {
  type: "none";
}

export interface AuthorizationBasic {
  type: "basic";
  username: string;
  password: string;
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
  headerPrefix: "Bearer" | string;
  authorizationUrl: string;
  clientId: string;
  clientSecret: string;
  scope?: string;
}

// This grant type involves exchanging the user's credentials (username and password)
// for an access token. However, this is not generally recommended for serverless
// functions because it requires the client (serverless function) to handle
// sensitive user credentials, which can pose security risks. If possible, you
// avoid using this grant type and opt for a more secure method.
export interface AuthorizationOAuth2PasswordCredentials {
  type: "oauth2";
  grantType: "password_credentials";
  headerPrefix: "Bearer" | string;
  accessTokenUrl: string;
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
  scope?: string;
}

// NOTE: this is made for frontend environments (require user interaction)
export interface AuthorizationOAuth2Implicit {
  type: "oauth2";
  grantType: "implicit";
  headerPrefix: "Bearer" | string;
  redirectUrl: string;
  authorizationUrl: string;
  clientId: string;
  clientSecret: string;
  scope?: string;
  state?: string;
}

// NOTE: this is made for frontend environments (require user interaction)
export interface AuthorizationOAuth2AuthorizationCode {
  type: "oauth2";
  grantType: "authorization_code";
  headerPrefix: "Bearer" | string;
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
  | AuthorizationOAuth2Implicit // not relevant for backend environments
  | AuthorizationOAuth2AuthorizationCode; // not relevant for backend environments

export type Authorization =
  | AuthorizationNone
  | AuthorizationBasic
  | AuthorizationBearer
  | AuthorizationApiKey
  | AuthorizationGoogleJwtSa
  | AuthorizationOAuth2;
