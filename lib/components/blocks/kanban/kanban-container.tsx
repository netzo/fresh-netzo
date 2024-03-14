// adapted from https://github.com/Georgegriff/react-dnd-kit-tailwind-shadcn-ui/blob/main/src/components/BoardGroup.tsx
import type { ComponentChildren } from "preact";
import { useDndContext } from "../../../deps/@dnd-kit/core.ts";
import { cva } from "../../../deps/class-variance-authority.ts";
import { ScrollArea, ScrollBar } from "../../scroll-area.tsx";

export function KanbanContainer(
  { children }: { children: ComponentChildren },
) {
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
