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
import type { Deal } from "@/data/deals.schema.tsx";
import type { Column } from "./kanban-column.tsx";
import { hasDraggableData } from "./utils.ts";
import { coordinateGetter } from "./multiple-containers-keyboard-preset.ts";

export type KanbanProps<TData = unknown, TValue = unknown> = {
  data: TData[];
  options: {
    resource: string;
    columnId: string;
  };
};

export function Kanban({ data, options }) {
  const { columnId = "status" } = options;
  const columns = useSignal<Column[]>(options.columns);
  const pickedUpDealColumn = useSignal<string | null>(null);
  const columnsId = useComputed(() => columns.value.map((col) => col.id));

  const deals = useSignal<Deal[]>(data);

  const activeColumn = useSignal<Column | null>(null);

  const activeDeal = useSignal<Deal | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: coordinateGetter,
    }),
  );

  function getDraggingDealData(
    dealId: UniqueIdentifier,
    columnIdValue: string,
  ) {
    const dealsInColumn = deals.value.filter((deal) =>
      deal[columnId] === columnIdValue
    );
    const dealPosition = dealsInColumn.findIndex((deal) => deal.id === dealId);
    const column = columns.value.find((col) => col.id === columnIdValue);
    return {
      dealsInColumn,
      dealPosition,
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
      } else if (active.data.current?.type === "Deal") {
        pickedUpDealColumn.value = active.data.current.deal[columnId];
        const { dealsInColumn, dealPosition, column } = getDraggingDealData(
          active.id,
          pickedUpDealColumn.value as string,
        );
        return `Picked up Deal ${active.data.current.deal.name} at position: ${
          dealPosition + 1
        } of ${dealsInColumn.length} in column ${column?.title}`;
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
        active.data.current?.type === "Deal" &&
        over.data.current?.type === "Deal"
      ) {
        const { dealsInColumn, dealPosition, column } = getDraggingDealData(
          over.id,
          over.data.current.deal[columnId],
        );
        if (over.data.current.deal[columnId] !== pickedUpDealColumn.value) {
          return `Deal ${active.data.current.deal.name} was moved over column ${column?.title} in position ${
            dealPosition + 1
          } of ${dealsInColumn.length}`;
        }
        return `Deal was moved over position ${
          dealPosition + 1
        } of ${dealsInColumn.length} in column ${column?.title}`;
      }
    },
    onDragEnd({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) {
        pickedUpDealColumn.value = null;
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
        active.data.current?.type === "Deal" &&
        over.data.current?.type === "Deal"
      ) {
        const { dealsInColumn, dealPosition, column } = getDraggingDealData(
          over.id,
          over.data.current.deal[columnId],
        );
        if (over.data.current.deal[columnId] !== pickedUpDealColumn.value) {
          return `Deal was dropped into column ${column?.title} in position ${
            dealPosition + 1
          } of ${dealsInColumn.length}`;
        }
        return `Deal was dropped into position ${
          dealPosition + 1
        } of ${dealsInColumn.length} in column ${column?.title}`;
      }
      pickedUpDealColumn.value = null;
    },
    onDragCancel({ active }) {
      pickedUpDealColumn.value = null;
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
              deals={deals.value.filter((deal) => deal[columnId] === col.id)}
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
                deals={deals.value.filter(
                  (deal) => deal[columnId] === activeColumn.id
                )}
              />
            )}
            {activeDeal && <KanbanCard deal={activeDeal} isOverlay />}
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

    if (data?.type === "Deal") {
      activeDeal.value = data.deal;
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    activeColumn.value = null;
    activeDeal.value = null;

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

    const isActiveADeal = activeData?.type === "Deal";
    const isOverADeal = activeData?.type === "Deal";

    if (!isActiveADeal) return;

    // Im dropping a Deal over another Deal
    if (isActiveADeal && isOverADeal) {
      const activeIndex = deals.value.findIndex((t) => t.id === activeId);
      const overIndex = deals.value.findIndex((t) => t.id === overId);
      const activeDeal = deals.value[activeIndex];
      const overDeal = deals.value[overIndex];
      if (
        activeDeal &&
        overDeal &&
        activeDeal[columnId] !== overDeal[columnId]
      ) {
        activeDeal[columnId] = overDeal[columnId];
        deals.value = arrayMove(deals.value, activeIndex, overIndex - 1);
      }

      deals.value = arrayMove(deals.value, activeIndex, overIndex);
    }

    const isOverAColumn = overData?.type === "Column";

    // Im dropping a Deal over a column
    if (isActiveADeal && isOverAColumn) {
      const activeIndex = deals.value.findIndex((t) => t.id === activeId);
      const activeDeal = deals.value[activeIndex];
      if (activeDeal) {
        activeDeal[columnId] = overId as string;
        return arrayMove(deals.value, activeIndex, activeIndex);
      }
    }
  }
}
