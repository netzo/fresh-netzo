// adapted from https://github.com/Georgegriff/react-dnd-kit-tailwind-shadcn-ui/blob/main/src/components/BoardGroup.tsx
import { useComputed, useSignal } from "@preact/signals";
import {
  type KanbanGroupProps,
} from "netzo/components/blocks/kanban/kanban.tsx";
import { Card, CardContent, CardHeader } from "netzo/components/card.tsx";
import { ScrollArea } from "netzo/components/scroll-area.tsx";
import { cn } from "netzo/components/utils.ts";
import { SortableContext } from "netzo/deps/@dnd-kit/sortable.ts";

export function KanbanGroup({
  group,
  items,
  isOverlay,
  options,
  renderCard,
}: KanbanGroupProps) {
  const selected = useSignal<string[]>([]);

  const itemsIds = useComputed(() =>
    items.map((item) => item[options.idField])
  );

  const itemsAmount = useComputed(() =>
    items.reduce(
      (acc, item) => acc + Number(item.amount),
      0,
    )
  );

  return (
    <Card className="h-full self-baseline w-[300px] max-w-full flex flex-col flex-shrink-0 snap-center">
      <CardHeader className="flex flex-row items-center py-2 px-4 font-semibold text-left border-b-2 justify-between">
        <div className="flex flex-1 items-center">
          <div
            {...group?.icon}
            className={cn("w-6 h-6 mr-3", group?.icon?.className)}
          />
          <h3 className="mt-0">{group.title}</h3>
        </div>
        <span className="text-sm font-medium">
          {Number(itemsAmount).toLocaleString("en-US", {
            style: "currency",
            currency: items?.[0]?.currencyCode || "USD",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </span>
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
