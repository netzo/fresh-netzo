import { useSignal } from "@preact/signals";
import { useProseEditor } from "netzo/components/blocks/prose-editor/use-prose-editor.tsx";
import {
  TableActionsReload,
  TableFilters,
  TablePagination,
  TableSearch,
  TableViewOptions,
  useTable,
} from "netzo/components/blocks/table/table.tsx";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "netzo/components/resizable.tsx";
import type { Account } from "netzo/data/accounts.ts";
import type { Contact } from "netzo/data/contacts.ts";
import type { User } from "netzo/data/users.ts";
import { useWindowSize } from "netzo/deps/usehooks-ts.ts";
import type { Deal } from "../data/deals.ts";
import type { Event } from "../data/events.ts";
import { EventEditor } from "./events.editor.tsx";
import { EventsFormCreate } from "./events.forms.tsx";
import { EventsList } from "./events.list.tsx";

export function Main({ data, defaultLayout = [40, 60] }: {
  data: {
    event: Event;
    accounts: Account[];
    contacts: Contact[];
    deals: Deal[];
    events: Event[];
    users: User[];
  };
  defaultLayout?: [number, number];
}) {
  const { accounts, contacts, deals, events, users } = data;
  const event = useSignal(data.event);
  const { width = 0 } = useWindowSize();

  const table = useTable<Event>(data, {
    resource: "events",
    idField: "id",
    search: {
      column: "name",
      placeholder: "Search by name...",
    },
    filters: [],
    columns: [],
  });

  const editor = useProseEditor({ content: event.value?.content });

  return (
    <>
      <header className="flex items-center justify-between mx-4">
        <div className="flex items-center flex-1 space-x-2">
          <TableActionsReload table={table} />
          <TableSearch table={table} />
          <TableFilters table={table} />
        </div>
        <div className="flex items-center space-x-2">
          <TableViewOptions table={table} />
          <EventsFormCreate
            event={data.event}
            accounts={accounts}
            contacts={contacts}
            deals={deals}
            events={events}
            users={users}
          />
        </div>
      </header>
      <div className="h-full flex-1 overflow-y-auto">
        <ResizablePanelGroup
            direction={(!width || width > 768) ? "horizontal" : "vertical"}
          >
            <ResizablePanel defaultSize={defaultLayout[0]} minSize={30}>
              <EventsList table={table} event={event} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={defaultLayout[1]}>
              <div className="grid h-full">
                <EventEditor
                  editor={editor}
                  content={event.value?.content ?? ""}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
      </div>
      <footer className="flex items-center justify-between mx-4">
        <TablePagination table={table} />
      </footer>
    </>
  );
}
