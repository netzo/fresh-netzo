import { eq } from "drizzle-orm";
import { database, id } from "../../../../database/mod.ts";
import type { Auth, AuthUser } from "../types.ts";

export const createDatabaseAuth = (db: ReturnType<typeof database>): Auth => {
  const { $users, $sessions } = db?._?.fullSchema! ?? {}; // use fullSchema, not schema
  if (!$users) throw new Error(`Missing "$users" table in database schema`);
  if (!$sessions) {
    throw new Error(`Missing "$sessions" table in database schema`);
  }

  return {
    createUser: async (user: AuthUser) => {
      user.id = id();
      await db.transaction(async (tx) => {
        await tx.insert($users).values(user).returning();
        await tx.insert($sessions).values({
          id: user.sessionId,
          $userId: user.id,
        });
      });
    },
    updateUser: async (user: AuthUser) => {
      user.updatedAt = new Date().toISOString();

      await db.update($users).set(user).where(eq($users.id, user.id)).execute();
      await db.query.$users.findFirst({ where: eq($users.id, user.id) });
    },
    updateUserSession: async (user: AuthUser, sessionId: string) => {
      user.updatedAt = new Date().toISOString();
      const newUser: AuthUser = { ...user, sessionId };
      await db.transaction(async (tx) => {
        await tx.update($users).set(newUser).where(
          eq($users.authId, user.authId),
        );
        await tx.delete($sessions).where(eq($sessions.id, user.sessionId));
        await tx.insert($sessions).values({
          id: sessionId,
          $userId: user.id,
        });
      });
    },
    getUser: async (authId: string) => {
      const user = await db.query.$users.findFirst({
        where: eq($users.authId, authId),
      }) as AuthUser;
      return user ?? null;
    },
    getUserBySession: async (sessionId: string) => {
      const session = await db.query.$sessions.findFirst({
        where: eq($sessions.id, sessionId),
      });
      if (session?.$userId) {
        const user = await db.query.$users.findFirst({
          where: eq($users.id, session.$userId),
        }) as AuthUser;
        return user;
      } else {
        return null;
      }
    },
  };
};
