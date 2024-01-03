// adapted from https://github.com/Georgegriff/react-dnd-kit-tailwind-shadcn-ui/blob/main/src/components/KanbanBoard.tsx
import { useComputed, useSignal } from "netzo/deps/@preact/signals.ts";
import { BoardContainer, KanbanBoardColumn } from "./KanbanBoardColumn.tsx";
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
} from "netzo/deps/@dnd-kit/core.ts";
import { arrayMove, SortableContext } from "netzo/deps/@dnd-kit/sortable.ts";
import type { Deal } from "@/data/deals.schema.tsx";
import type { Column } from "./KanbanBoardColumn.tsx";
import { hasDraggableData } from "./utils.ts";
import { coordinateGetter } from "./multipleContainersKeyboardPreset.ts";

export function KanbanBoard({ data, options }) {
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

  function getDraggingDealData(dealId: UniqueIdentifier, status: string) {
    const dealsInColumn = deals.value.filter((deal) => deal.status === status);
    const dealPosition = dealsInColumn.findIndex((deal) => deal.id === dealId);
    const column = columns.value.find((col) => col.id === status);
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
        pickedUpDealColumn.value = active.data.current.deal.status;
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
          over.data.current.deal.status,
        );
        if (over.data.current.deal.status !== pickedUpDealColumn.value) {
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
          over.data.current.deal.status,
        );
        if (over.data.current.deal.status !== pickedUpDealColumn.value) {
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
            <KanbanBoardColumn
              key={col.id}
              column={col}
              deals={deals.value.filter((deal) => deal.status === col.id)}
            />
          ))}
        </SortableContext>
      </BoardContainer>

      {
        /* {"document" in window &&
        createPortal(
          <DragOverlay>
            {activeColumn && (
              <KanbanBoardColumn
                isOverlay
                column={activeColumn}
                deals={deals.value.filter(
                  (deal) => deal.status === activeColumn.id
                )}
              />
            )}
            {activeDeal && <KanbanBoardCard deal={activeDeal} isOverlay />}
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
        activeDeal.status !== overDeal.status
      ) {
        activeDeal.status = overDeal.status;
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
        activeDeal.status = overId as string;
        return arrayMove(deals.value, activeIndex, activeIndex);
      }
    }
  }
}
