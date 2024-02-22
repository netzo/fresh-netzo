// adapted from https://github.com/Georgegriff/react-dnd-kit-tailwind-shadcn-ui/blob/main/src/components/utils.ts
import { Active, DataRef, Over } from "../../../deps/@dnd-kit/core.ts";
import type { CardDragData, GroupDragData } from "./kanban.tsx";

type DraggableData = GroupDragData | CardDragData;

export function hasDraggableData<T extends Active | Over>(
  entry: T | null | undefined,
): entry is T & {
  data: DataRef<DraggableData>;
} {
  if (!entry) return false;

  const data = entry.data.current;

  if (data?.type === "Group" || data?.type === "Item") return true;

  return false;
}
