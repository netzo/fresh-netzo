import { type Signal, useSignal } from "@preact/signals";
import { Badge } from "netzo/components/badge.tsx";
import {
  TableActionsReload,
  TablePagination,
  TableSearch,
  TableView,
  useTable,
} from "netzo/components/blocks/table/table.tsx";
import { cn } from "netzo/components/utils.ts";
import type { Event } from "../data/events.ts";
import { toDateTime } from "../data/mod.ts";
import { EventsFormCreate } from "./events.forms.tsx";

export function EventsList({ table, event }: {
  table: ReturnType<typeof useTable>;
  event: Signal<Event>;
}) {
  const selected = useSignal(event.value?.id);

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="space-y-4">
        <header className="flex items-center space-x-2">
          <TableActionsReload table={table} />
          <TableSearch table={table} className="flex-1" />
          <EventsFormCreate />
        </header>

        <div className="space-y-2">
          <TableView table={table}>
            {(table) =>
              table.getRowModel().rows?.length
                ? table.getRowModel().rows.map((row) => (
                  <div
                    key={`events-${row.original.id}`}
                    className={cn(
                      "space-y-2 rounded-lg border p-3 text-sm hover:bg-accent hover:cursor-pointer",
                      selected.value === row.original.id && "bg-muted",
                    )}
                    onClick={() => event.value = row.original}
                  >
                    <div className="flex gap-4 items-center pb-2">
                      <h4 className="font-semibold line-clamp-1">
                        {row.original.name}
                      </h4>
                      <span
                        className={cn(
                          "ml-auto text-xs min-w-fit",
                          selected.value === row.original.id
                            ? "text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {toDateTime(row.original.updatedAt)}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-xs text-muted-foreground">
                      {row.original.content.substring(0, 300)}
                    </p>
                    <div className="flex gap-2">
                      <EventIcon type={row.original.type} />
                    </div>
                  </div>
                ))
                : (
                  <div className="grid place-items-center h-full w-full">
                    No results.
                  </div>
                )}
          </TableView>
        </div>
        <TablePagination table={table} />
      </div>
    </div>
  );
}

function EventIcon({ type }: { type: string }) {
  const props = ({
    email: {
      icon: "mdi-email",
      text: "Email",
      className: `bg-red hover:bg-red bg-opacity-80 text-white`,
    },
    call: {
      icon: "mdi-phone",
      text: "Call",
      className: `bg-purple hover:bg-purple bg-opacity-80 text-white`,
    },
    videocall: {
      icon: "mdi-video",
      text: "Call",
      className: `bg-purple hover:bg-purple bg-opacity-80 text-white`,
    },
    meeting: {
      icon: "mdi-account-group",
      text: "Meeting",
      className: `bg-yellow hover:bg-yellow bg-opacity-80 text-white`,
    },
    "whatsapp": {
      icon: "mdi-whatsapp",
      text: "WhatsApp",
      className: `bg-green hover:bg-green bg-opacity-80 text-white`,
    },
    "livechat": {
      icon: "mdi-chat",
      text: "Livechat",
      className: `bg-green hover:bg-green bg-opacity-80 text-white`,
    },
    "facebook": {
      icon: "mdi-facebook",
      text: "Facebook",
      className: `bg-blue hover:bg-blue bg-opacity-80 text-white`,
    },
    "instagram": {
      icon: "mdi-instagram",
      text: "Instagram",
      className: `bg-blue hover:bg-blue bg-opacity-80 text-white`,
    },
    "linkedin": {
      icon: "mdi-linkedin",
      text: "LinkedIn",
      className: `bg-blue hover:bg-blue bg-opacity-80 text-white`,
    },
    "twitter": {
      icon: "mdi-twitter",
      text: "Twitter",
      className: `bg-blue hover:bg-blue bg-opacity-80 text-white`,
    },
    other: {
      icon: "mdi-help",
      text: "Other",
      className: `bg-gray hover:bg-gray bg-opacity-80 text-white`,
    },
  })?.[type];

  return (
    <Badge variant="default" className={`${props.className}`}>
      <i className={`${props.icon} mr-1`} />
      {props.text}
    </Badge>
  );
}
