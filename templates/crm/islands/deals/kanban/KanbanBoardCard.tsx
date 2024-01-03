// adapted from https://github.com/Georgegriff/react-dnd-kit-tailwind-shadcn-ui/blob/main/src/components/TaskCard.tsx
import type { UniqueIdentifier } from "netzo/deps/@dnd-kit/core.ts";
import { useSortable } from "netzo/deps/@dnd-kit/sortable.ts";
import { CSS } from "netzo/deps/@dnd-kit/utilities.ts";
import { Card, CardContent, CardHeader } from "netzo/components/ui/card.tsx";
import { Button } from "netzo/components/ui/button.tsx";
import { cva } from "netzo/deps/class-variance-authority.ts";
import { Badge } from "netzo/components/ui/badge.tsx";
import type { Deal } from "@/data/deals.schema.tsx";

interface KanbanBoardCardProps {
  deal: Deal;
  isOverlay?: boolean;
}

export type DealType = "Deal";

export interface DealDragData {
  type: DealType;
  deal: Deal;
}

export function KanbanBoardCard({ deal, isOverlay }: KanbanBoardCardProps) {
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
      <CardHeader className="relative flex flex-row px-3 py-3 border-b-2 space-between border-secondary">
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className="h-auto p-1 -ml-2 text-secondary-foreground/50 cursor-grab"
        >
          <span className="sr-only">Move deal</span>
          <div className="w-6 h-6 mdi-drag" />
        </Button>
        <Badge variant={"outline"} className="ml-auto font-semibold">
          Deal
        </Badge>
      </CardHeader>
      <CardContent className="px-3 pt-3 pb-6 text-left whitespace-pre-wrap">
        {deal.name}
      </CardContent>
    </Card>
  );
}
