import type { ComponentChildren } from "../../../deps/preact.ts";
// adapted from https://github.com/Georgegriff/react-dnd-kit-tailwind-shadcn-ui/blob/main/src/components/BoardGroup.tsx
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
import type { BadgeProps } from "../../badge.tsx";
import { Card, CardContent, CardHeader } from "../../card.tsx";
import { Button } from "../../button.tsx";
import { ScrollArea, ScrollBar } from "../../scroll-area.tsx";
import type { Item, KanbanProps } from "./kanban.tsx";
import { cn } from "../../utils.ts";

export type Group = {
  id: UniqueIdentifier;
  title: string;
  icon?: JSX.IntrinsicElements["div"];
  badge?: BadgeProps;
};

export type GroupType = "Group";

export type GroupDragData = {
  type: GroupType;
  group: Group;
};

type KanbanGroupProps = {
  group: Group;
  items: Item[];
  isOverlay?: boolean;
  options: KanbanProps["options"];
};

export function KanbanGroup(
  { group, items, isOverlay, options }: KanbanGroupProps,
) {
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
      <CardHeader className="flex flex-row items-center py-2 px-4 font-semibold text-left border-b-2 justify-between">
        <div className="flex items-center">
          <div
            {...group?.icon}
            className={cn("w-6 h-6 mr-3", group?.icon?.className)}
          />
          <h3 className="mt-0">{group.title}</h3>
        </div>
        <Button variant="outline" size="icon" className="mt-0">
          <div className="w-4 h-4 mdi-plus" />
        </Button>
      </CardHeader>
      <ScrollArea>
        <CardContent className="flex flex-col flex-grow gap-2 p-2">
          <SortableContext items={itemsIds.value}>
            {items.map((item) => (
              <KanbanCard
                key={item[options.fieldIds.id]}
                item={item}
                options={options}
              />
            ))}
          </SortableContext>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}

export function BoardContainer({ children }: { children: ComponentChildren }) {
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
