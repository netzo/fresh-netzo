import { ulid } from "../../../../datastore/mod.ts";
import type { Auth, AuthUser } from "../types.ts";

const kv = await Deno.openKv(Deno.env.get("DENO_KV_PATH"));

export const createDatastoreAuth = (): Auth => ({
  createUser: async (user: AuthUser) => {
    user.id = ulid();
    user.createdAt = new Date().toISOString();
    user.updatedAt = user.createdAt;
    user.deletedAt = "";
    const usersKey = ["users", user.authId];
    const usersBySessionKey = ["usersBySession", user.sessionId];

    const atomicOp = kv.atomic()
      .check({ key: usersKey, versionstamp: null })
      .check({ key: usersBySessionKey, versionstamp: null })
      .set(usersKey, user)
      .set(usersBySessionKey, user);

    const res = await atomicOp.commit();
    if (!res.ok) throw new Error("Failed to create user");
  },
  updateUser: async (user: AuthUser) => {
    user.updatedAt ||= new Date().toISOString();
    const usersKey = ["users", user.authId];
    const usersBySessionKey = ["usersBySession", user.sessionId];

    const atomicOp = kv.atomic()
      .set(usersKey, user)
      .set(usersBySessionKey, user);

    const res = await atomicOp.commit();
    if (!res.ok) throw new Error("Failed to update user");
  },
  updateUserSession: async (user: AuthUser, sessionId: string) => {
    user.updatedAt = new Date().toISOString();
    const userKey = ["users", user.authId];
    const oldUserBySessionKey = ["usersBySession", user.sessionId];
    const newUserBySessionKey = ["usersBySession", sessionId];
    const newUser: AuthUser = { ...user, sessionId };

    const atomicOp = kv.atomic()
      .set(userKey, newUser)
      .delete(oldUserBySessionKey)
      .check({ key: newUserBySessionKey, versionstamp: null })
      .set(newUserBySessionKey, newUser);

    const res = await atomicOp.commit();
    if (!res.ok) throw new Error("Failed to update user session");
  },
  getUser: async (authId: string) => {
    const res = await kv.get<AuthUser>(["users", authId]);
    return res.value;
  },
  getUserBySession: async (sessionId: string) => {
    const key = ["usersBySession", sessionId];
    const eventualRes = await kv.get<AuthUser>(key, {
      consistency: "eventual",
    });
    if (eventualRes.value !== null) return eventualRes.value;
    const res = await kv.get<AuthUser>(key);
    return res.value;
  },
});
