import {
  Kanban as _Kanban,
  type KanbanProps,
} from "netzo/components/blocks/kanban/kanban.tsx";
import { ALIASES, type Deal } from "@/resources/deals.ts";

export function Kanban(props: KanbanProps<Deal>) {
  return (
    <_Kanban
      data={props.data}
      options={props.options}
    />
  );
}
