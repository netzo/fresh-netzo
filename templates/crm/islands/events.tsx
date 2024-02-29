import { useSignal } from "@preact/signals";
import { useProseEditor } from "netzo/components/blocks/prose-editor/use-prose-editor.tsx";
import { useTable } from "netzo/components/blocks/table/table.tsx";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "netzo/components/resizable.tsx";
import { useWindowSize } from "netzo/deps/usehooks-ts.ts";
import type { Event } from "../data/events.ts";
import { EventEditor } from "./events.editor.tsx";
import { EventsList } from "./events.list.tsx";

export function Main({ data, defaultLayout = [40, 60] }: {
  data: Event[];
  defaultLayout?: [number, number];
}) {
  const event = useSignal(data[0]);
  const { width = 0, height = 0 } = useWindowSize();

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

  const editor = useProseEditor({ content: event.value.content });

  return (
    <ResizablePanelGroup
      direction={(!width || width > 768) ? "horizontal" : "vertical"}
    >
      <ResizablePanel defaultSize={defaultLayout[0]} minSize={30}>
        <EventsList table={table} event={event} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]}>
        <div className="grid h-full">
          <EventEditor editor={editor} content={event.value.content} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
