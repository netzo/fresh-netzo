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
  projects: {
    [projectId: string]: {
      roles: ("owner" | "admin" | "developer" | "user" | string)[];
      // deno-lint-ignore no-explicit-any
      [key: string]: any;
    };
  };
  createdAt: string;
  updatedAt: string;
  deletedAt: "" | string;
};

export type AuthUserFromProvider = Pick<
  AuthUser,
  "authId" | "name" | "email" | "avatar" | "provider"
>;

export type Auth = {
  /**
   * Creates a new user in the database. Throws if the user or user session
   * already exists.
   *
   * @example
   * ```ts
   * import { createUser } from "../../../../auth/utils/db.ts";
   *
   * await createUser({
   *   authId: "auth0|xxx",
   *   sessionId: crypto.randomUUID(),
   * });
   * ```
   */
  createUser: (user: AuthUser) => Promise<void>;
  /**
   * Creates a user in the database, overwriting any previous data.
   *
   * @example
   * ```ts
   * import { updateUser } from "../../../../auth/utils/db.ts";
   *
   * await updateUser({
   *   authId: "auth0|xxx",
   *   sessionId: crypto.randomUUID(),
   * });
   * ```
   */
  updateUser: (user: AuthUser) => Promise<void>;
  /**
   * Updates the session ID of a given user in the database.
   *
   * @example
   * ```ts
   * import { updateUserSession } from "../../../../auth/utils/db.ts";
   *
   * await updateUserSession({
   *   authId: "auth0|xxx",
   *   sessionId: "xxx",
   * }, "yyy");
   * ```
   */
  updateUserSession: (user: AuthUser, sessionId: string) => Promise<void>;
  /**
   * Gets the user with the given authId from the database.
   *
   * @example
   * ```ts
   * import { getUser } from "../../../../auth/utils/db.ts";
   *
   * const user = await getUser("jack");
   * user?.authId; // Returns "auth0|xxx"
   * user?.sessionId; // Returns "xxx"
   * user?.roles; // Returns ["admin"]
   * user?.provider; // Returns "github"
   * ```
   */
  getUser: (authId: string) => Promise<AuthUser | null>;
  /**
   * Gets the user with the given session ID from the database. The first attempt
   * is done with eventual consistency. If that returns `null`, the second
   * attempt is done with strong consistency. This is done for performance
   * reasons, as this function is called in every route request for checking
   * whether the session user is signed in.
   *
   * @example
   * ```ts
   * import { getUserBySession } from "../../../../auth/utils/db.ts";
   *
   * const user = await getUserBySession("xxx");
   * user?.authId; // Returns "auth0|xxx"
   * user?.sessionId; // Returns "xxx"
   * user?.roles; // Returns ["admin"]
   * user?.provider; // Returns "github"
   * ```
   */
  getUserBySession: (sessionId: string) => Promise<AuthUser | null>;
};
