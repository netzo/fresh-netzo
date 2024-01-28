// adapted from https://github.com/Georgegriff/react-dnd-kit-tailwind-shadcn-ui/blob/main/src/components/kanban.tsx
import { useComputed, useSignal } from "../../../deps/@preact/signals.ts";
import { BoardContainer, KanbanColumn } from "./kanban-column.tsx";
import {
  Announcements,
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  // DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "../../../deps/@dnd-kit/core.ts";
import { arrayMove, SortableContext } from "../../../deps/@dnd-kit/sortable.ts";
import type { Column } from "./kanban-column.tsx";
import { hasDraggableData } from "./utils.ts";
import { coordinateGetter } from "./multiple-containers-keyboard-preset.ts";

export type Item = {
  id: UniqueIdentifier;
  name: string;
  status: string;
  [key: string]: unknown;
};

export type KanbanProps<TData = unknown, TValue = unknown> = {
  data: TData[];
  options: {
    resource: string;
    columnId: string;
    columns: Column[];
  };
};

export function Kanban({ data, options }) {
  const { columnId = "status" } = options;
  const columns = useSignal<Column[]>(options.columns);
  const pickedUpItemColumn = useSignal<string | null>(null);
  const columnsId = useComputed(() => columns.value.map((col) => col.id));

  const items = useSignal<Item[]>(data);

  const activeColumn = useSignal<Column | null>(null);

  const activeItem = useSignal<Item | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: coordinateGetter,
    }),
  );

  function getDraggingItemData(
    itemId: UniqueIdentifier,
    columnIdValue: string,
  ) {
    const itemsInColumn = items.value.filter((item) =>
      item[columnId] === columnIdValue
    );
    const itemPosition = itemsInColumn.findIndex((item) => item.id === itemId);
    const column = columns.value.find((col) => col.id === columnIdValue);
    return {
      itemsInColumn,
      itemPosition,
      column,
    };
  }

  const announcements: Announcements = {
    onDragStart({ active }) {
      if (!hasDraggableData(active)) return;
      if (active.data.current?.type === "Column") {
        const startColumnIdx = columnsId.value.findIndex((id) =>
          id === active.id
        );
        const startColumn = columns.value[startColumnIdx];
        return `Picked up Column ${startColumn?.title} at position: ${
          startColumnIdx + 1
        } of ${columnsId.value.length}`;
      } else if (active.data.current?.type === "Item") {
        pickedUpItemColumn.value = active.data.current.item[columnId];
        const { itemsInColumn, itemPosition, column } = getDraggingItemData(
          active.id,
          pickedUpItemColumn.value as string,
        );
        return `Picked up Item ${active.data.current.item.name} at position: ${
          itemPosition + 1
        } of ${itemsInColumn.length} in column ${column?.title}`;
      }
    },
    onDragOver({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) return;

      if (
        active.data.current?.type === "Column" &&
        over.data.current?.type === "Column"
      ) {
        const overColumnIdx = columnsId.value.findIndex((id) => id === over.id);
        return `Column ${active.data.current.column.title} was moved over ${over.data.current.column.title} at position ${
          overColumnIdx + 1
        } of ${columnsId.value.length}`;
      } else if (
        active.data.current?.type === "Item" &&
        over.data.current?.type === "Item"
      ) {
        const { itemsInColumn, itemPosition, column } = getDraggingItemData(
          over.id,
          over.data.current.item[columnId],
        );
        if (over.data.current.item[columnId] !== pickedUpItemColumn.value) {
          return `Item ${active.data.current.item.name} was moved over column ${column?.title} in position ${
            itemPosition + 1
          } of ${itemsInColumn.length}`;
        }
        return `Item was moved over position ${
          itemPosition + 1
        } of ${itemsInColumn.length} in column ${column?.title}`;
      }
    },
    onDragEnd({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) {
        pickedUpItemColumn.value = null;
        return;
      }
      if (
        active.data.current?.type === "Column" &&
        over.data.current?.type === "Column"
      ) {
        const overColumnPosition = columnsId.value.findIndex((id) =>
          id === over.id
        );

        return `Column ${active.data.current.column.title} was dropped into position ${
          overColumnPosition + 1
        } of ${columnsId.value.length}`;
      } else if (
        active.data.current?.type === "Item" &&
        over.data.current?.type === "Item"
      ) {
        const { itemsInColumn, itemPosition, column } = getDraggingItemData(
          over.id,
          over.data.current.item[columnId],
        );
        if (over.data.current.item[columnId] !== pickedUpItemColumn.value) {
          return `Item was dropped into column ${column?.title} in position ${
            itemPosition + 1
          } of ${itemsInColumn.length}`;
        }
        return `Item was dropped into position ${
          itemPosition + 1
        } of ${itemsInColumn.length} in column ${column?.title}`;
      }
      pickedUpItemColumn.value = null;
    },
    onDragCancel({ active }) {
      pickedUpItemColumn.value = null;
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
      <BoardContainer>
        <SortableContext items={columnsId.value}>
          {columns.value.map((col) => (
            <KanbanColumn
              key={col.id}
              column={col}
              items={items.value.filter((item) => item[columnId] === col.id)}
            />
          ))}
        </SortableContext>
      </BoardContainer>

      {
        /* {"document" in window &&
        createPortal(
          <DragOverlay>
            {activeColumn && (
              <KanbanColumn
                isOverlay
                column={activeColumn}
                items={items.value.filter(
                  (item) => item[columnId] === activeColumn.id
                )}
              />
            )}
            {activeItem && <KanbanCard item={activeItem} isOverlay />}
          </DragOverlay>,
          document.body
        )} */
      }
    </DndContext>
  );

  function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return;
    const data = event.active.data.current;
    if (data?.type === "Column") {
      activeColumn.value = data.column;
      return;
    }

    if (data?.type === "Item") {
      activeItem.value = data.item;
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    activeColumn.value = null;
    activeItem.value = null;

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (!hasDraggableData(active)) return;

    const activeData = active.data.current;

    if (activeId === overId) return;

    const isActiveAColumn = activeData?.type === "Column";
    if (!isActiveAColumn) return;

    const activeColumnIndex = columns.value.findIndex((col) =>
      col.id === activeId
    );

    const overColumnIndex = columns.value.findIndex((col) => col.id === overId);

    columns.value = arrayMove(
      columns.value,
      activeColumnIndex,
      overColumnIndex,
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
      const activeIndex = items.value.findIndex((t) => t.id === activeId);
      const overIndex = items.value.findIndex((t) => t.id === overId);
      const activeItem = items.value[activeIndex];
      const overItem = items.value[overIndex];
      if (
        activeItem &&
        overItem &&
        activeItem[columnId] !== overItem[columnId]
      ) {
        activeItem[columnId] = overItem[columnId];
        items.value = arrayMove(items.value, activeIndex, overIndex - 1);
      }

      items.value = arrayMove(items.value, activeIndex, overIndex);
    }

    const isOverAColumn = overData?.type === "Column";

    // Im dropping a Item over a column
    if (isActiveAItem && isOverAColumn) {
      const activeIndex = items.value.findIndex((t) => t.id === activeId);
      const activeItem = items.value[activeIndex];
      if (activeItem) {
        activeItem[columnId] = overId as string;
        return arrayMove(items.value, activeIndex, activeIndex);
      }
    }
  }
}
