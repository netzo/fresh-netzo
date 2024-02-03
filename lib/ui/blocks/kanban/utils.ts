// adapted from https://github.com/Georgegriff/react-dnd-kit-tailwind-shadcn-ui/blob/main/src/components/utils.ts
import { Active, DataRef, Over } from "../../../deps/@dnd-kit/core.ts";
import { ColumnDragData } from "./kanban-column.tsx";
import { ItemDragData } from "./kanban-card.tsx";

type DraggableData = ColumnDragData | ItemDragData;

export function hasDraggableData<T extends Active | Over>(
  entry: T | null | undefined,
): entry is T & {
  data: DataRef<DraggableData>;
} {
  if (!entry) return false;

  const data = entry.data.current;

  if (data?.type === "Column" || data?.type === "Item") return true;

  return false;
}
