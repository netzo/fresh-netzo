// adapted from https://github.com/Georgegriff/react-dnd-kit-tailwind-shadcn-ui/blob/main/src/components/TaskCard.tsx
// see "Calling children as a function" from https://stackoverflow.com/a/32371612
import {
  CardDragData,
  KanbanCardProps,
} from "netzo/components/blocks/kanban/kanban.tsx";
import { Card } from "netzo/components/card.tsx";
import { useSortable } from "netzo/deps/@dnd-kit/sortable.ts";
import { CSS } from "netzo/deps/@dnd-kit/utilities.ts";
import { cva } from "netzo/deps/class-variance-authority.ts";

export function KanbanCardContainer({
  item,
  isOverlay,
  options,
  ...props
}: KanbanCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item[options.idField],
    data: {
      type: "Item",
      item,
    } satisfies CardDragData,
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
      {props.children({
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
      })}
    </Card>
  );
}
