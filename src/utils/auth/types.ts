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
  key: string;
  value: string;
}

export interface AuthorizationOAuth2 {
  type: "oauth2";
  clientId: string;
  clientSecret: string;
  authorizationUri: string;
  accessTokenUri: string;
  redirectUri: string;
  scopes: string[];
}

export type Authorization =
  | AuthorizationNone
  | AuthorizationBasic
  | AuthorizationBearer
  | AuthorizationApiKey
  | AuthorizationOAuth2;
