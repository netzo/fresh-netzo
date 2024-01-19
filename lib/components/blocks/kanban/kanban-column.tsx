// adapted from https://github.com/Georgegriff/react-dnd-kit-tailwind-shadcn-ui/blob/main/src/components/BoardColumn.tsx
import {
  SortableContext,
  useSortable,
} from "../../../deps/@dnd-kit/sortable.ts";
import {
  type UniqueIdentifier,
  useDndContext,
} from "../../../deps/@dnd-kit/core.ts";
import { CSS } from "../../../deps/@dnd-kit/utilities.ts";
import { useComputed } from "../../../deps/@preact/signals.ts";
import { KanbanCard } from "./kanban-card.tsx";
import { cva } from "../../../deps/class-variance-authority.ts";
import { Card, CardContent, CardHeader } from "../../ui/card.tsx";
import { Button } from "../../ui/button.tsx";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area.tsx";
import type { Deal } from "@/database/deals.schema.tsx";

export interface Column {
  id: UniqueIdentifier;
  title: string;
}

export type ColumnType = "Column";

export interface ColumnDragData {
  type: ColumnType;
  column: Column;
}

interface KanbanColumnProps {
  column: Column;
  deals: Deal[];
  isOverlay?: boolean;
}

export function KanbanColumn(
  { column, deals, isOverlay }: KanbanColumnProps,
) {
  const dealsIds = useComputed(() => deals.map((deal) => deal.id));

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    } satisfies ColumnDragData,
    attributes: {
      roleDescription: `Column: ${column.title}`,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva(
    "h-full self-baseline w-[300px] max-w-full bg-primary-foreground flex flex-col flex-shrink-0 snap-center",
    {
      variants: {
        dragging: {
          default: "border-2 border-transparent",
          over: "ring-2 opacity-30",
          overlay: "ring-2 ring-primary",
        },
      },
    },
  );

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="flex flex-row items-center p-4 font-semibold text-left border-b-2 space-between">
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className="relative h-auto p-1 -ml-2 text-primary/50 cursor-grab"
        >
          <span className="sr-only">{`Move column: ${column.title}`}</span>
          <div className="w-6 h-6 mdi-drag" />
        </Button>
        <span className="ml-auto">{column.title}</span>
      </CardHeader>
      <ScrollArea>
        <CardContent className="flex flex-col flex-grow gap-2 p-2">
          <SortableContext items={dealsIds.value}>
            {deals.map((deal) => <KanbanCard key={deal.id} deal={deal} />)}
          </SortableContext>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}

export function BoardContainer({ children }: { children: React.ReactNode }) {
  const dndContext = useDndContext();

  const variations = cva("h-full px-2 md:px-0 flex lg:justify-center", {
    variants: {
      dragging: {
        default: "snap-x snap-mandatory",
        active: "snap-none",
      },
    },
  });

  return (
    <ScrollArea
      className={variations({
        dragging: dndContext.active ? "active" : "default",
      })}
    >
      <div className="flex flex-row items-center justify-center gap-4 h-full">
        {children}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
