import { Client } from "./schema.ts";
import { DataTableProps } from "@/components/tables/components/data-table.tsx";

export const aliases = {
  id: "ID",
  createdAt: "Created",
  updatedAt: "Updated",
  name: "Name",
  status: "Status",
  type: "Type",
  web: "Website",
  phone: "Phone",
  address: {
    streetAddress: "Street address",
    number: "Number",
    city: "City",
    postCode: "Post code",
  },
  notifications: {
    payments: "Payments",
    invoices: "Invoices",
    promotions: "Promotions",
    marketing: "Marketing",
  },
};

export const getOptions = (
  data: Client[],
): DataTableProps<Client, unknown>["options"] => {
  return {
    search: {
      column: "name",
      placeholder: "Search by name...",
    },
    filters: [
      {
        column: "status",
        title: aliases.status,
        options: [...new Set(data.map((item) => item.status))].map((
          value,
        ) => ({
          label: value,
          value: value,
        })),
      },
      {
        column: "type",
        title: aliases.type,
        options: [...new Set(data.map((item) => item.type))].sort().map((
          value,
        ) => (value
          ? { label: value, value }
          : { label: "*no data", value: undefined })
        ),
      },
      {
        column: "address_city",
        title: aliases.address.city,
        options: [...new Set(data.map((item) => item.address?.city))].sort()
          .map(
            (
              value,
            ) => (value
              ? { label: value, value }
              : { label: "*no data", value: undefined }),
          ),
      },
    ],
    resource: "clients",
  };
};
