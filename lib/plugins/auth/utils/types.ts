import { AuthConfig } from "../plugin.ts";

export type AuthProvider = keyof AuthConfig["providers"];

export type AuthUser = {
  id: string;
  provider: AuthProvider;
  authId: string; // id from auth provider
  sessionId: string;
  name: string;
  email: string;
  avatar: string;
  // deno-lint-ignore no-explicit-any
  data: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
};

export type AuthUserFromProvider = Pick<
  AuthUser,
  "authId" | "name" | "email" | "avatar" | "provider"
>;

export type Auth = {
  /**
   * Creates a new user in the database. Throws if the user already exists.
   */
  createUser: (user: AuthUser) => Promise<void>;
  /**
   * Creates a new user session in the database. Throws if the user session
   * already exists.
   */
  createUserSession: (user: AuthUser, sessionId: string) => Promise<void>;
  /**
   * Creates a user in the database, overwriting any previous data.
   */
  updateUser: (user: AuthUser) => Promise<void>;
  /**
   * Updates the session ID of a given user in the database.
   */
  updateUserSession: (user: AuthUser, sessionId: string) => Promise<void>;
  /**
   * Gets the user with the given authId from the database.
   */
  getUser: (authId: string) => Promise<AuthUser | null>;
  /**
   * Gets the user with the given session ID from the database. The first attempt
   * is done with eventual consistency. If that returns `null`, the second
   * attempt is done with strong consistency. This is done for performance
   * reasons, as this function is called in every route request for checking
   * whether the session user is signed in.
   */
  getUserBySession: (sessionId: string) => Promise<AuthUser | null>;
};
