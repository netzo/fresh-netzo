// adapted from https://github.com/Georgegriff/react-dnd-kit-tailwind-shadcn-ui/blob/main/src/components/TaskCard.tsx
import { useSortable } from "../../../deps/@dnd-kit/sortable.ts";
import { CSS } from "../../../deps/@dnd-kit/utilities.ts";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card.tsx";
import { Button } from "../../ui/button.tsx";
import { cva } from "../../../deps/class-variance-authority.ts";
import { Badge } from "../../ui/badge.tsx";
import type { Deal } from "@/data/deals.schema.tsx";

interface KanbanCardProps {
  deal: Deal;
  isOverlay?: boolean;
}

export type DealType = "Deal";

export interface DealDragData {
  type: DealType;
  deal: Deal;
}

export function KanbanCard({ deal, isOverlay }: KanbanCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: deal.id,
    data: {
      type: "Deal",
      deal,
    } satisfies DealDragData,
    attributes: {
      roleDescription: "Deal",
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
          <span className="sr-only">Move deal</span>
          <div className="w-6 h-6 mdi-drag" />
        </Button>
        <CardTitle className="ml-1 text-sm font-medium">
          {deal.name}
        </CardTitle>
        <Badge variant={"outline"} className="ml-auto font-medium">
          {deal.status}
        </Badge>
      </CardHeader>
      <CardContent className="px-4 pt-2 pb-4 text-xs whitespace-pre-wrap text-secondary-foreground">
        {deal.description}
      </CardContent>
    </Card>
  );
}
