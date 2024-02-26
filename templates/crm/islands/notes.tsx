import { useComputed, useSignal } from "@preact/signals";
import { RichTextEditor } from "netzo/components/blocks/rich-text-editor/rich-text-editor.tsx";
import { Button } from "netzo/components/button.tsx";
import { Input } from "netzo/components/input.tsx";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "netzo/components/resizable.tsx";
import { cn } from "netzo/components/utils.ts";
import { type Note, toDateTime } from "../data/mod.ts";

type NoteProps = {
  data: Note[];
  defaultLayout: number[] | undefined;
};

export function Notes({ data, defaultLayout = [50, 50] }: NoteProps) {
  const note = useSignal(data[0]);
  const search = useSignal("");

  const items = useComputed(() =>
    data.filter((item) =>
      item.name.includes(search.value) || item.content.includes(search.value)
    )
  );

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={defaultLayout[0]} minSize={30}>
        <div className="h-full overflow-y-auto p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search"
              value={search.value}
              onInput={(e) => search.value = e.currentTarget.value}
              className="mb-4"
            />
            <Button onClick={() => note.value = { name: "", content: "" }}>
              Create
            </Button>
          </div>
          <NotesList items={items.value} />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]}>
        <NotesDisplay note={note.value} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export function NotesList({ items }: { items: Note[] }) {
  const note = useSignal(items[0]);
  const selected = useSignal(0);

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) => (
        <div
          key={`notes-item-${index}`}
          className={cn(
            "rounded-lg border p-3 text-sm hover:bg-accent hover:cursor-pointer",
            selected.value === index && "bg-muted",
          )}
          onClick={() => note.value = item}
        >
          <div className="flex gap-4 items-center pb-2">
            <h4 className="font-semibold line-clamp-1">{item.name}</h4>
            <span
              className={cn(
                "ml-auto text-xs min-w-fit",
                selected.value === index
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {toDateTime(item.updatedAt)}
            </span>
          </div>
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {item.content.substring(0, 300)}
          </p>
        </div>
      ))}
    </div>
  );
}

export function NotesDisplay({ note }: { note: Note | null }) {
  return (
    <div className="grid h-full">
      <div className="flex-1">
        {note
          ? (
            <RichTextEditor
              className="h-[calc(100%-42px)]"
              content={note.content}
            />
          )
          : (
            <div className="grid place-items-center w-full py-20">
              <div className="text-center">
                <i className="mdi-note-text text-4xl text-muted-foreground mb-2" />
                <h2 className="text-xl font-medium text-muted-foreground mb-1">
                  No note selected
                </h2>
                <p className="text-sm text-muted-foreground">
                  Create a new note to get started
                </p>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
