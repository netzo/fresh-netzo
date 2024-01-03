import { Activity } from "./schema.ts";
import { DataTableProps } from "@/components/tables/components/data-table.tsx";

export const aliases = {
  id: "ID",
  createdAt: "Created",
  updatedAt: "Updated",
  name: "Name",
  avatar: "Image",
  email: "Email",
  phone: "Phone",
  accountId: "Account",
  notifications: {
    new: "New products",
    promotions: "Promotions",
    marketing: "Marketing",
  },
};

export const getOptions = (
  data: Activity[],
): DataTableProps<Activity, unknown>["options"] => {
  return {
    search: {
      column: "name",
      placeholder: "Search by name...",
    },
    filters: [],
    resource: "activities",
  };
};
