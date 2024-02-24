// adapted from https://github.com/Georgegriff/react-dnd-kit-tailwind-shadcn-ui/blob/main/src/components/BoardGroup.tsx
import { useComputed } from "@preact/signals";
import type {
  GroupDragData,
  KanbanGroupProps,
} from "netzo/components/blocks/kanban/kanban.tsx";
import { Button } from "netzo/components/button.tsx";
import { Card, CardContent, CardHeader } from "netzo/components/card.tsx";
import { ScrollArea } from "netzo/components/scroll-area.tsx";
import { cn } from "netzo/components/utils.ts";
import { type UniqueIdentifier } from "netzo/deps/@dnd-kit/core.ts";
import { SortableContext, useSortable } from "netzo/deps/@dnd-kit/sortable.ts";
import { CSS } from "netzo/deps/@dnd-kit/utilities.ts";
import { cva } from "netzo/deps/class-variance-authority.ts";

export function KanbanGroup({
  group,
  items,
  isOverlay,
  options,
  renderCard,
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

  const onClickCreate = async (groupId: UniqueIdentifier) => {
    const name = globalThis.prompt("Enter a name");
    if (name) {
      const description = globalThis.prompt("Enter a description");
      await fetch(`/api/${options.resource}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          [options.fieldIds.name]: name,
          [options.fieldIds.description]: description,
          [options.fieldIds.group]: groupId,
        }),
      });
      globalThis.location.reload();
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="flex flex-row items-center py-2 px-4 font-semibold text-left border-b-2 justify-between">
        <div className="flex flex-1 items-center">
          <div
            {...group?.icon}
            className={cn("w-6 h-6 mr-3", group?.icon?.className)}
          />
          <h3 className="mt-0">{group.title}</h3>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="mt-0"
          onClick={() => onClickCreate(group.id)}
        >
          <div className="w-4 h-4 mdi-plus" />
        </Button>
      </CardHeader>
      <ScrollArea>
        <CardContent className="flex flex-col flex-grow gap-2 p-2">
          <SortableContext items={itemsIds.value}>
            {items.map((item, index) => renderCard({ item, options }))}
          </SortableContext>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
