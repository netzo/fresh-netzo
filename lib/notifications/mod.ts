import type { createDatabase } from "../resources/clients/kv.ts";

export type Notification = {
  id: string;
  data: {
    type: string;
    title: string;
    body: string;
  };
  projectId: string | undefined; // set in production
  createdAt: string;
  updatedAt: string;
};

export const createNotification = (db: ReturnType<typeof createDatabase>) => {
  return (data: Notification["data"]): Promise<Notification> => {
    const createdAt = new Date().toISOString();
    return db.create<Notification>(["$notifications"], {
      data,
      projectId: Deno.env.get("NETZO_PROJECT_ID")!,
      createdAt,
      updatedAt: createdAt,
    } as Notification);
  };
};
