// adapted from https://github.com/Georgegriff/react-dnd-kit-tailwind-shadcn-ui/blob/main/src/components/BoardGroup.tsx
import { useComputed } from "@preact/signals";
import type {
  GroupDragData,
  KanbanGroupProps,
} from "netzo/components/blocks/kanban/kanban.tsx";
import { Card } from "netzo/components/card.tsx";
import { useSortable } from "netzo/deps/@dnd-kit/sortable.ts";
import { CSS } from "netzo/deps/@dnd-kit/utilities.ts";
import { cva } from "netzo/deps/class-variance-authority.ts";

export function KanbanGroupContainer({
  group,
  items,
  isOverlay,
  options,
  renderCard,
  ...props
}: KanbanGroupProps) {
  const itemsIds = useComputed(() =>
    items.map((item) => item[options.fieldIds.id])
  );
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: group[options.fieldIds.id],
    data: {
      type: "Group",
      group,
    } satisfies GroupDragData,
    attributes: {
      roleDescription: `Group: ${group.title}`,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva(
    "h-full self-baseline w-[300px] max-w-full flex flex-col flex-shrink-0 snap-center",
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
