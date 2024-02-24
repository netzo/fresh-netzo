// see "Calling children as a function" from https://stackoverflow.com/a/32371612
import { Badge } from "netzo/components/badge.tsx";
import {
  KanbanCardContainer,
  type KanbanCardProps,
} from "netzo/components/blocks/kanban/kanban.tsx";
import { TableRowActions } from "netzo/components/blocks/table/table.tsx";
import { Button } from "netzo/components/button.tsx";
import { CardContent, CardHeader, CardTitle } from "netzo/components/card.tsx";
import { cn } from "netzo/components/utils.ts";

export function KanbanCard({ item, isOverlay, options }: KanbanCardProps) {
  const { badge } = options.groups.find((c) =>
    c.id === item?.[options.fieldIds.group]
  );

  return (
    <KanbanCardContainer {...{ item, isOverlay, options }}>
      {({
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
      }) => (
        <>
          {item?.[options.fieldIds.image] && (
            <img
              src={item[options.fieldIds.image]}
              className="w-full h-auto p-1"
            />
          )}
          <CardHeader className="relative flex flex-row items-center px-3 py-1 justify-between">
            <div className="flex flex-1 items-center">
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
            </div>
            <TableRowActions
              row={{ original: item }}
              resource="deals"
              className={cn("h-auto p-1 -mr-2 text-secondary-foreground/50")}
            />
          </CardHeader>
          <CardContent className="flex flex-col gap-2 px-4 pt-2 pb-4 text-xs whitespace-pre-wrap text-secondary-foreground">
            {item?.[options.fieldIds.description]}
            <div className="flex items-center justify-between w-full">
              <Badge
                variant={"outline"}
                {...badge}
                className={cn("font-medium", badge?.className)}
              >
                {item?.[options.fieldIds.group]}
              </Badge>
              <span className="font-medium">
                {Number(item?.amount).toLocaleString("en-US", {
                  style: "currency",
                  currency: item?.currencyCode || "USD",
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </CardContent>
        </>
      )}
    </KanbanCardContainer>
  );
}
