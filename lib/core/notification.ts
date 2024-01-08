import type { Notification } from "../framework/mod.ts";
import type { ApiClient } from "../apis/_create-api/types.ts";

export const createNotification = (api: ApiClient) =>
  (
    data: Notification["data"],
  ): Promise<Notification> => {
    return api.notifications.post<Notification>({
      readBy: [],
      data,
      env: Deno.env.get("NETZO_ENV")!,
      projectId: Deno.env.get("NETZO_PROJECT_ID")!,
    });
  };
