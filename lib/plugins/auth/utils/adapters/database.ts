import { eq } from "drizzle-orm";
import { AuthConfig } from "netzo/plugins/auth/plugin.ts";
import { database, id } from "../../../../database/mod.ts";
import type { Auth, AuthUser } from "../types.ts";

export const createDatabaseAuth = (config: AuthConfig): Auth => {
  const { $users, $sessions } = config.schema!;
  const db = database({ schema: config.schema! });

  return {
    createUser: async (user: AuthUser) => {
      user.id = id();
      user.createdAt = new Date().toISOString();
      user.updatedAt = user.createdAt;
      user.deletedAt = "";

      console.log(user);

      const newUser = await db.transaction(async (tx) => {
        const newUser = await tx.insert($users).values(user).returning();
        await tx.insert($sessions).values({
          id: user.sessionId,
          userId: user.id,
          projectId: Deno.env.get("NETZO_PROJECT_ID")!,
          createdAt: user.createdAt,
        });
        return newUser;
      });
      return newUser;
    },
    updateUser: async (user: AuthUser) => {
      user.updatedAt = new Date().toISOString();

      await db.update($users).set(user).where(eq($users.id, user.id)).execute();
      const updatedUser = await db.query.$users.findFirst({
        where: eq($users.id, user.id),
      });
      return updatedUser;
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
          userId: user.id,
          projectId: Deno.env.get("NETZO_PROJECT_ID")!,
          createdAt: new Date().toISOString(),
        }).where(eq($sessions.userId, sessionId));
      });
    },
    getUser: async (authId: string) => {
      const user = await db.query.$users.findFirst({
        where: eq($users.authId, authId),
      });
      return user;
    },
    getUserBySession: async (sessionId: string) => {
      const session = await db.query.$sessions.findFirst({
        where: eq($sessions.id, sessionId),
      });
      if (session?.userId) {
        const user = await db.query.$users.findFirst({
          where: eq($users.id, session.userId),
        });
        return user;
      } else {
        return null;
      }
    },
  };
};
