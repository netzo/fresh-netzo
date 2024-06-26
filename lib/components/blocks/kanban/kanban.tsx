// @deno-types="npm:@types/react@18.2.60"
import * as React from "react";

// adapted from https://github.com/Georgegriff/react-dnd-kit-tailwind-shadcn-ui/blob/main/src/components/kanban.tsx
// see "Calling children as a function" from https://stackoverflow.com/a/32371612
import { useComputed, useSignal } from "@preact/signals";
import { BadgeProps } from "netzo/components/badge.tsx";
import { Card } from "netzo/components/card.tsx";
import { useSortable } from "netzo/deps/@dnd-kit/sortable.ts";
import { CSS } from "netzo/deps/@dnd-kit/utilities.ts";
import { cva } from "netzo/deps/class-variance-authority.ts";
import type { ComponentChildren } from "preact";
import type { StateUpdater } from "preact/hooks";
import {
  Announcements,
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  type UniqueIdentifier,
  useDndContext,
  useSensor,
  useSensors,
} from "../../../deps/@dnd-kit/core.ts";
import { arrayMove, SortableContext } from "../../../deps/@dnd-kit/sortable.ts";
import { ScrollArea, ScrollBar } from "../../scroll-area.tsx";
import type { Table } from "../table/table.tsx";
import { coordinateGetter } from "./multiple-containers-keyboard-preset.ts";
import { hasDraggableData } from "./utils.ts";

// kanban-group:

export type Group = {
  id: UniqueIdentifier;
  label: string;
  icon?: JSX.IntrinsicElements["div"];
  badge?: BadgeProps;
};

export type GroupDragData = {
  type: "Group";
  group: Group;
};

export type KanbanGroupProps<TData = unknown> = KanbanViewProps<TData> & {
  group: Group;
  items: TData[];
  isOverlay?: boolean;
  children: ComponentChildren;
};

// kanban-card:

export type CardDragData<TData = unknown> = {
  type: "Item";
  item: TData;
};

export type KanbanCardProps<TData = unknown> = KanbanViewProps<TData> & {
  table: Table<TData>;
  group: Group;
  item: TData;
  isOverlay?: boolean;
};

// kanban-view:

export type KanbanViewProps<TData = unknown> = {
  data: TData[];
  setData: StateUpdater<TData[]>;
  table: Table<TData>;
  options: {
    column: string;
    groups: {
      id: string;
      label: string;
      icon?: JSX.IntrinsicElements["i"];
      badge?: BadgeProps;
    }[];
  };
  renderGroup?: (props: KanbanGroupProps<TData>) => ComponentChildren;
  renderCard?: (props: KanbanCardProps<TData>) => ComponentChildren;
};

export function KanbanView<TData>({
  data,
  setData,
  table,
  options,
  renderGroup = (props) => JSON.stringify(props),
  renderCard = (props) => JSON.stringify(props),
}: KanbanViewProps<TData>) {
  const groups = useSignal<Group[]>(options.groups);
  const pickedUpItemGroup = useSignal<string | null>(null);
  const groupsId = useComputed(() => groups.value.map((col) => col.id));

  const activeGroup = useSignal<Group | null>(null);

  const activeItem = useSignal<TData | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: coordinateGetter,
    }),
  );

  function getDraggingItemData(
    itemId: UniqueIdentifier,
    groupIdValue: string,
  ) {
    const itemsInGroup = data.filter((item) => item[options.column] === groupIdValue);
    const itemPosition = itemsInGroup.findIndex((item) => item.id === itemId);
    const group = groups.value.find((col) => col.id === groupIdValue);
    return {
      itemsInGroup,
      itemPosition,
      group,
    };
  }

  const announcements: Announcements = {
    onDragStart({ active }) {
      if (!hasDraggableData(active)) return;
      if (active.data.current?.type === "Group") {
        const startGroupIdx = groupsId.value.findIndex((id) => id === active.id);
        const startGroup = groups.value[startGroupIdx];
        return `Picked up Group ${startGroup?.label} at position: ${
          startGroupIdx + 1
        } of ${groupsId.value.length}`;
      } else if (active.data.current?.type === "Item") {
        pickedUpItemGroup.value = active.data.current.item[options.column];
        const { itemsInGroup, itemPosition, group } = getDraggingItemData(
          active.id,
          pickedUpItemGroup.value as string,
        );
        return `Picked up Item ${active.data.current.item.name} at position: ${
          itemPosition + 1
        } of ${itemsInGroup.length} in group ${group?.label}`;
      }
    },
    onDragOver({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) return;

      if (
        active.data.current?.type === "Group" &&
        over.data.current?.type === "Group"
      ) {
        const overGroupIdx = groupsId.value.findIndex((id) => id === over.id);
        return `Group ${active.data.current.group.label} was moved over ${over.data.current.group.label} at position ${
          overGroupIdx + 1
        } of ${groupsId.value.length}`;
      } else if (
        active.data.current?.type === "Item" &&
        over.data.current?.type === "Item"
      ) {
        const { itemsInGroup, itemPosition, group } = getDraggingItemData(
          over.id,
          over.data.current.item[options.column],
        );
        if (
          over.data.current.item[options.column] !==
            pickedUpItemGroup.value
        ) {
          return `Item ${active.data.current.item.name} was moved over group ${group?.label} in position ${
            itemPosition + 1
          } of ${itemsInGroup.length}`;
        }
        return `Item was moved over position ${
          itemPosition + 1
        } of ${itemsInGroup.length} in group ${group?.label}`;
      }
    },
    onDragEnd({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) {
        pickedUpItemGroup.value = null;
        return;
      }
      if (
        active.data.current?.type === "Group" &&
        over.data.current?.type === "Group"
      ) {
        const overGroupPosition = groupsId.value.findIndex((id) => id === over.id);

        return `Group ${active.data.current.group.label} was dropped into position ${
          overGroupPosition + 1
        } of ${groupsId.value.length}`;
      } else if (
        active.data.current?.type === "Item" &&
        over.data.current?.type === "Item"
      ) {
        const { itemsInGroup, itemPosition, group } = getDraggingItemData(
          over.id,
          over.data.current.item[options.column],
        );
        if (
          over.data.current.item[options.column] !==
            pickedUpItemGroup.value
        ) {
          return `Item was dropped into group ${group?.label} in position ${
            itemPosition + 1
          } of ${itemsInGroup.length}`;
        }
        return `Item was dropped into position ${
          itemPosition + 1
        } of ${itemsInGroup.length} in group ${group?.label}`;
      }
      pickedUpItemGroup.value = null;
    },
    onDragCancel({ active }) {
      pickedUpItemGroup.value = null;
      if (!hasDraggableData(active)) return;
      return `Dragging ${active.data.current?.type} cancelled.`;
    },
  };

  return (
    <DndContext
      accessibility={{
        announcements,
      }}
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <KanbanContainer>
        <SortableContext items={groupsId.value}>
          {groups.value.map((group, index) =>
            renderGroup({
              table,
              options,
              renderGroup,
              renderCard,
              key: `group-${index}`,
              group,
              items: data.filter((item) => item[options.column] === group.id),
              isOverlay: false,
            })
          )}
        </SortableContext>
      </KanbanContainer>

      {"document" in globalThis &&
        React.createPortal(
          <DragOverlay>
            {activeItem.value &&
              renderCard({
                table,
                options,
                renderGroup,
                renderCard,
                item: activeItem.value,
                isOverlay: true,
              })}
          </DragOverlay>,
          document.body,
        )}
    </DndContext>
  );

  function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return;
    const data = event.active.data.current;
    if (data?.type === "Group") {
      activeGroup.value = data.group;
      return;
    }

    if (data?.type === "Item") {
      activeItem.value = data.item;
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    activeGroup.value = null;
    activeItem.value = null;

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (!hasDraggableData(active)) return;

    const activeData = active.data.current;

    // NOTE: expects an update() method to be passed via useTable({ meta: { update } })
    table.options?.meta?.update?.(activeData.item); // activeId === item.id (used internally)

    if (activeId === overId) return;

    const isActiveAGroup = activeData?.type === "Group";
    if (!isActiveAGroup) return;

    const activeGroupIndex = groups.value.findIndex((col) => col.id === activeId);

    const overGroupIndex = groups.value.findIndex((col) => col.id === overId);

    groups.value = arrayMove(
      groups.value,
      activeGroupIndex,
      overGroupIndex,
    );
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveAItem = activeData?.type === "Item";
    const isOverAItem = activeData?.type === "Item";

    if (!isActiveAItem) return;

    // Im dropping a Item over another Item
    if (isActiveAItem && isOverAItem) {
      const activeIndex = data.findIndex((t) => t.id === activeId);
      const overIndex = data.findIndex((t) => t.id === overId);
      const activeItem = data[activeIndex];
      const overItem = data[overIndex];
      if (
        activeItem &&
        overItem &&
        activeItem[options.column] !== overItem[options.column]
      ) {
        activeItem[options.column] = overItem[options.column];
        setData(arrayMove(data, activeIndex, overIndex - 1));
      }

      setData(arrayMove(data, activeIndex, overIndex));
    }

    const isOverAGroup = overData?.type === "Group";

    // Im dropping a Item over a group
    if (isActiveAItem && isOverAGroup) {
      console.log("dropping item over group", { isActiveAItem, isOverAGroup });
      const activeIndex = data.findIndex((t) => t.id === activeId);
      const activeItem = data[activeIndex];
      if (activeItem) {
        activeItem[options.column] = overId as string;
        return arrayMove(data, activeIndex, activeIndex);
      }
    }
  }
}

export function KanbanContainer({ children }: { children: ComponentChildren }) {
  const dndContext = useDndContext();

  const variations = cva("h-full px-2 md:px-4 flex lg:justify-center", {
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

export function KanbanCardContainer({
  table,
  group,
  item,
  isOverlay,
  ...props
}: KanbanCardProps & { children: (props: KanbanCardProps) => JSX.Element }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
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
