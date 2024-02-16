// adapted from https://github.com/Georgegriff/react-dnd-kit-tailwind-shadcn-ui/blob/main/src/components/TaskCard.tsx
import { useSortable } from "../../../deps/@dnd-kit/sortable.ts";
import { CSS } from "../../../deps/@dnd-kit/utilities.ts";
import { cva } from "../../../deps/class-variance-authority.ts";
import { Badge } from "../../badge.tsx";
import { Button } from "../../button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "../../card.tsx";
import { cn } from "../../utils.ts";
import type { Item, KanbanProps } from "./kanban.tsx";

type KanbanCardProps = {
  item: Item;
  isOverlay?: boolean;
  options: KanbanProps["options"];
};

export type ItemType = "Item";

export type ItemDragData = {
  type: ItemType;
  item: Item;
};

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

  const { badge } = options.groups.find((c) =>
    c.id === item?.[options.fieldIds.group]
  );

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      {item?.[options.fieldIds.image] && (
        <img
          src={item[options.fieldIds.image]}
          className="w-full h-auto p-1"
        />
      )}

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
      </CardHeader>
      <CardContent className="flex flex-col gap-2 px-4 pt-2 pb-4 text-xs whitespace-pre-wrap text-secondary-foreground">
        {item?.[options.fieldIds.description]}
        <Badge
          variant={"outline"}
          {...badge}
          className={cn("mr-auto font-medium", badge?.className)}
        >
          {item?.[options.fieldIds.group]}
        </Badge>
      </CardContent>
    </Card>
  );
}
