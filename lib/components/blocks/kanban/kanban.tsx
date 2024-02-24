// adapted from https://github.com/Georgegriff/react-dnd-kit-tailwind-shadcn-ui/blob/main/src/components/kanban.tsx
import { useComputed, useSignal } from "@preact/signals";
import { BadgeProps } from "netzo/components/badge.tsx";
import type { ComponentChildren } from "preact";
import { createPortal } from "preact/compat";
import {
  Announcements,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "../../../deps/@dnd-kit/core.ts";
import { SortableContext, arrayMove } from "../../../deps/@dnd-kit/sortable.ts";
import type { Table, TableProps } from "../table/use-table.ts";
import { KanbanContainer } from "./kanban-container.tsx";
import { coordinateGetter } from "./multiple-containers-keyboard-preset.ts";
import { hasDraggableData } from "./utils.ts";

export { KanbanCardContainer } from "./kanban-card-container.tsx";
export { KanbanContainer } from "./kanban-container.tsx";

// kanban:

export type KanbanProps<
  TData = unknown,
  TValue = unknown,
> = TableProps<TData, TValue> & {
  table: Table<TData>;
  groups: {
    id: string;
    title: string;
    icon?: JSX.IntrinsicElements["i"];
    badge?: BadgeProps;
  }[];
  renderGroup?: (props: KanbanGroupProps<TData, TValue>) => ComponentChildren;
  renderCard?: (props: KanbanCardProps<TData, TValue>) => ComponentChildren;
};

// kanban-group:

export type Group = {
  id: UniqueIdentifier;
  title: string;
  icon?: JSX.IntrinsicElements["div"];
  badge?: BadgeProps;
};

export type GroupDragData = {
  type: "Group";
  group: Group;
};

export type KanbanGroupProps<
  TData = unknown,
  TValue = unknown,
> = TableProps<TData, TValue> & {
  group: Group;
  items: TData[];
  isOverlay?: boolean;
  options: KanbanProps["options"];
  renderCard: KanbanProps["renderCard"];
  children: ComponentChildren;
};

// kanban-card:

export type CardDragData = {
  type: "Item";
  item: TData;
};

export type KanbanCardProps<
  TData = unknown,
  TValue = unknown,
> = TableProps<TData, TValue> & {
  table: Table<TData>;
  item: TData;
  isOverlay?: boolean;
  options: KanbanProps["options"];
};

export function Kanban<TData, TValue>({
  table,
  options,
  renderGroup = (props) => JSON.stringify(props),
  renderCard = (props) => JSON.stringify(props),
}: KanbanProps<TData, TValue>) {
  const data = table.getFilteredRowModel().rows.map((row) => row.original);

  // set default fieldIds:
  options.fieldIds = {
    id: options?.fieldIds?.id || "id",
    group: options?.fieldIds?.group || "status",
    name: options?.fieldIds?.name || "name",
    description: options?.fieldIds?.description || "description",
    image: options?.fieldIds?.image || "image",
  };

  const groups = useSignal<Group[]>(options.groups);
  const pickedUpItemGroup = useSignal<string | null>(null);
  const groupsId = useComputed(() =>
    groups.value.map((col) => col[options.fieldIds.id])
  );

  const items = useSignal<TData[]>(data);

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
    const itemsInGroup = items.value.filter((item) =>
      item[options.fieldIds.group] === groupIdValue
    );
    const itemPosition = itemsInGroup.findIndex((item) =>
      item[options.fieldIds.id] === itemId
    );
    const group = groups.value.find((col) =>
      col[options.fieldIds.id] === groupIdValue
    );
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
        const startGroupIdx = groupsId.value.findIndex((id) =>
          id === active[options.fieldIds.id]
        );
        const startGroup = groups.value[startGroupIdx];
        return `Picked up Group ${startGroup?.title} at position: ${
          startGroupIdx + 1
        } of ${groupsId.value.length}`;
      } else if (active.data.current?.type === "Item") {
        pickedUpItemGroup.value =
          active.data.current.item[options.fieldIds.group];
        const { itemsInGroup, itemPosition, group } = getDraggingItemData(
          active[options.fieldIds.id],
          pickedUpItemGroup.value as string,
        );
        return `Picked up Item ${active.data.current.item.name} at position: ${
          itemPosition + 1
        } of ${itemsInGroup.length} in group ${group?.title}`;
      }
    },
    onDragOver({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) return;

      if (
        active.data.current?.type === "Group" &&
        over.data.current?.type === "Group"
      ) {
        const overGroupIdx = groupsId.value.findIndex((id) =>
          id === over[options.fieldIds.id]
        );
        return `Group ${active.data.current.group.title} was moved over ${over.data.current.group.title} at position ${
          overGroupIdx + 1
        } of ${groupsId.value.length}`;
      } else if (
        active.data.current?.type === "Item" &&
        over.data.current?.type === "Item"
      ) {
        const { itemsInGroup, itemPosition, group } = getDraggingItemData(
          over[options.fieldIds.id],
          over.data.current.item[options.fieldIds.group],
        );
        if (
          over.data.current.item[options.fieldIds.group] !==
            pickedUpItemGroup.value
        ) {
          return `Item ${active.data.current.item.name} was moved over group ${group?.title} in position ${
            itemPosition + 1
          } of ${itemsInGroup.length}`;
        }
        return `Item was moved over position ${
          itemPosition + 1
        } of ${itemsInGroup.length} in group ${group?.title}`;
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
        const overGroupPosition = groupsId.value.findIndex((id) =>
          id === over[options.fieldIds.id]
        );

        return `Group ${active.data.current.group.title} was dropped into position ${
          overGroupPosition + 1
        } of ${groupsId.value.length}`;
      } else if (
        active.data.current?.type === "Item" &&
        over.data.current?.type === "Item"
      ) {
        const { itemsInGroup, itemPosition, group } = getDraggingItemData(
          over[options.fieldIds.id],
          over.data.current.item[options.fieldIds.group],
        );
        if (
          over.data.current.item[options.fieldIds.group] !==
            pickedUpItemGroup.value
        ) {
          return `Item was dropped into group ${group?.title} in position ${
            itemPosition + 1
          } of ${itemsInGroup.length}`;
        }
        return `Item was dropped into position ${
          itemPosition + 1
        } of ${itemsInGroup.length} in group ${group?.title}`;
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
              key: `group-${index}`,
              group,
              items: items.value.filter((item) =>
                item[options.fieldIds.group] === group[options.fieldIds.id]
              ),
              options,
              renderCard,
            })
          )}
        </SortableContext>
      </KanbanContainer>

      {"document" in window &&
        createPortal(
          <DragOverlay>
            {activeItem.value &&
              renderCard({ item: activeItem.value, options, isOverlay: true })}
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

    const activeId = active[options.fieldIds.id];
    const overId = over[options.fieldIds.id];

    if (!hasDraggableData(active)) return;

    const activeData = active.data.current;

    fetch(`/api/${options.resource}/${activeId}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(activeData.item),
    });

    if (activeId === overId) return;

    const isActiveAGroup = activeData?.type === "Group";
    if (!isActiveAGroup) return;

    const activeGroupIndex = groups.value.findIndex((col) =>
      col[options.fieldIds.id] === activeId
    );

    const overGroupIndex = groups.value.findIndex((col) =>
      col[options.fieldIds.id] === overId
    );

    groups.value = arrayMove(
      groups.value,
      activeGroupIndex,
      overGroupIndex,
    );
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active[options.fieldIds.id];
    const overId = over[options.fieldIds.id];

    if (activeId === overId) return;

    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveAItem = activeData?.type === "Item";
    const isOverAItem = activeData?.type === "Item";

    if (!isActiveAItem) return;

    // Im dropping a Item over another Item
    if (isActiveAItem && isOverAItem) {
      const activeIndex = items.value.findIndex((t) =>
        t[options.fieldIds.id] === activeId
      );
      const overIndex = items.value.findIndex((t) =>
        t[options.fieldIds.id] === overId
      );
      const activeItem = items.value[activeIndex];
      const overItem = items.value[overIndex];
      if (
        activeItem &&
        overItem &&
        activeItem[options.fieldIds.group] !==
          overItem[options.fieldIds.group]
      ) {
        activeItem[options.fieldIds.group] = overItem[options.fieldIds.group];
        items.value = arrayMove(items.value, activeIndex, overIndex - 1);
      }

      items.value = arrayMove(items.value, activeIndex, overIndex);
    }

    const isOverAGroup = overData?.type === "Group";

    // Im dropping a Item over a group
    if (isActiveAItem && isOverAGroup) {
      const activeIndex = items.value.findIndex((t) =>
        t[options.fieldIds.id] === activeId
      );
      const activeItem = items.value[activeIndex];
      if (activeItem) {
        activeItem[options.fieldIds.group] = overId as string;
        return arrayMove(items.value, activeIndex, activeIndex);
      }
    }
  }
}
