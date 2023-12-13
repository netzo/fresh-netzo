import type { ApiClient } from "../apis/_create-api/types.ts";

// NOTE: avoid importing from "./types.ts" which
// bloats bundle with entire @netzo/api package
export type Notification = {
  _id: string;
  workspaceId: string;
  labels: string[];
  readBy: string[]; // userId[]
  data: {
    type: "notice" | "info" | "success" | "warning" | "error" | string; // allow custom types
    title: string; // accepts HTML (will be sanitized)
    body: string; // accepts HTML (will be sanitized)
  };
  env: "production" | "development"; // set to Deno.env.get('NETZO_ENV')
  projectId: string; // set to Deno.env.get('NETZO_PROJECT_ID')
  createdAt: string;
  updatedAt: string;
};

export const createNotification = (api: ApiClient) =>
(
  data: Notification["data"],
): Promise<Notification> => {
  return api.notifications.post<Notification>({
    labels: [],
    readBy: [],
    data,
    env: Deno.env.get("NETZO_ENV")!,
    projectId: Deno.env.get("NETZO_PROJECT_ID")!,
  });
};
