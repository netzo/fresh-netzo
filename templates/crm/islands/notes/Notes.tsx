import { Input } from "netzo/components/input.tsx";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "netzo/components/resizable.tsx";
import { Separator } from "netzo/components/separator.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "netzo/components/tabs.tsx";
import { TooltipProvider } from "netzo/components/tooltip.tsx";
import { useState } from "preact/hooks";
import { Note } from "../../data/notes.ts";
import { NoteDisplay } from "./NoteDisplay.tsx";
import { NoteEditor } from "./NoteEditor.tsx";
import { NoteList } from "./NoteList.tsx";

interface NoteProps {
  data: Note[];
  defaultLayout: number[] | undefined;
}

export function Notes({
  data,
  defaultLayout = [50, 50],
}: NoteProps) {
  const [note] = useState(data[0]);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${
            JSON.stringify(
              sizes,
            )
          }`;
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel defaultSize={defaultLayout[0]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Inbox</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All note
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Unread
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <i className="mdi-magnify absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <NoteList items={data} />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <NoteList items={data.filter(({ read }) => !read)} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]}>
          <NoteEditor note={note} />
          <NoteDisplay
            note={data.find(({ id }) => id === note.selected) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
