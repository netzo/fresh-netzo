// adapted from https://github.com/Georgegriff/react-dnd-kit-tailwind-shadcn-ui/blob/main/src/components/TaskCard.tsx
import { useSortable } from "../../../deps/@dnd-kit/sortable.ts";
import { CSS } from "../../../deps/@dnd-kit/utilities.ts";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card.tsx";
import { Button } from "../../ui/button.tsx";
import { cva } from "../../../deps/class-variance-authority.ts";
import { Badge } from "../../ui/badge.tsx";
import type { Item, KanbanProps } from "./kanban.tsx";

interface KanbanCardProps {
  item: Item;
  isOverlay?: boolean;
  options: KanbanProps["options"];
}

export type ItemType = "Item";

export interface ItemDragData {
  type: ItemType;
  item: Item;
}

export function KanbanCard({ item, isOverlay, options }: KanbanCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item[options.fieldIds.id],
    data: {
      type: "Item",
      item,
    } satisfies ItemDragData,
    attributes: {
      roleDescription: "Item",
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva("", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  });

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="relative flex flex-row px-3 py-1 space-between">
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className="h-auto p-1 -ml-2 text-secondary-foreground/50 cursor-grab"
        >
          <span className="sr-only">Move item</span>
          <div className="w-6 h-6 mdi-drag" />
        </Button>
        <CardTitle className="ml-1 text-sm font-medium">
          {item?.[options.fieldIds.name]}
        </CardTitle>
        <Badge variant={"outline"} className="ml-auto font-medium">
          {item?.[options.fieldIds.column]}
        </Badge>
      </CardHeader>
      <CardContent className="px-4 pt-2 pb-4 text-xs whitespace-pre-wrap text-secondary-foreground">
        {item?.[options.fieldIds.description]}
      </CardContent>
    </Card>
  );
}
