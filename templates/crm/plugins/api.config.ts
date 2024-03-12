import { authenticate, log, resolve } from "netzo/plugins/api/hooks/mod.ts";
import { defineApiConfig } from "netzo/plugins/api/plugin.ts";
import { DenoKvResource, type Resource } from "netzo/plugins/api/resources/mod.ts";
import type { Activity } from "../data/activities.ts";
import { Contact } from "../data/contacts.ts";
import type { Deal } from "../data/deals.ts";

// server-side: use server-only $api client ($ = server-only).
// client-side: use fetch() or custom createApi() client.
export const $api = {
  accounts: DenoKvResource({ prefix: ["accounts"] }),
  contacts: DenoKvResource({ prefix: ["contacts"] }),
  deals: DenoKvResource({ prefix: ["deals"] }),
  activities: DenoKvResource({ prefix: ["activities"] }),
};

export default defineApiConfig({
  path: "/api",
  endpoints: [
    {
      name: "accounts",
      idField: "id",
      resource: $api.accounts,
      hooks: {
        all: [authenticate(), log()],
      },
    },
    {
      name: "activities",
      idField: "id",
      resource: $api.activities,
      hooks: {
        all: [authenticate(), log()],
        get: [
          resolve({
            after: {
              accounts: resolveRefs<Activity>($api.accounts, "accountIds"),
              contacts: resolveRefs<Activity>($api.contacts, "contactIds"),
              deals: resolveRefs<Activity>($api.deals, "dealIds"),
            },
          }),
        ],
      },
    },
    {
      name: "contacts",
      idField: "id",
      resource: $api.contacts,
      hooks: {
        all: [
          authenticate(),
          log(),
          resolve({
            after: {
              account: resolveRef<Contact>($api.accounts, "accountId"),
            },
          }),
        ],
      },
    },
    {
      name: "deals",
      idField: "id",
      resource: $api.deals,
      hooks: {
        all: [authenticate(), log()],
        get: [
          resolve({
            after: {
              account: resolveRef<Deal>($api.accounts, "accountId"),
              contacts: resolveRefs<Deal>($api.contacts, "contactIds"),
            },
          }),
        ],
      },
    },
  ],
});

// utils:

function resolveRefs<T = unknown>(resource: Resource, key: keyof T) {
  return (data: T) => {
    const ids = data?.[key] as string[];
    return Promise.all(ids?.map((id: string) => resource.get(id)));
  };
}

function resolveRef<T = unknown>(resource: Resource, key: keyof T) {
  return (data: T) => {
    const id = data?.[key] as string;
    return resource.get(id);
  };
}
