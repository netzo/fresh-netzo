import { Badge } from "netzo/components/badge.tsx";
import { IconCopy } from "netzo/components/icon-copy.tsx";
import { cn } from "netzo/components/utils.ts";
import { GROUPS } from "../islands/deals.tsx";

export function AccountDeals(props: { deals: Deal[] }) {
  const getGroup = (deal: Deal) => {
    return GROUPS.find((group) => group.id === deal.status);
  };
  return (
    <div className="space-y-4">
      {props.deals.map((deal, index) => (
        <div
          className={cn(
            "flex items-center",
            (index < props.deals.length - 1) && "b-b-1 pb-4",
          )}
        >
          <div
            {...getGroup(deal)?.icon}
            className={cn("w-6 h-6 mr-3", getGroup(deal)?.icon?.className)}
          />
          <div className="ml-4 space-y-1">
            <div className="flex items-center py-1">
              <a
                href={`/deals/${deal.id}`}
                className="whitespace-nowrap text-center font-medium text-primary hover:underline"
              >
                {deal.name}
              </a>
              <IconCopy value={deal.id} tooltip="Copy ID" />
            </div>
            {deal?.tags?.length && (
              <div className="flex gap-1">
                {deal.tags.map((tag) => (
                  <Badge variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="ml-auto font-medium">{deal.amount}</div>
        </div>
      ))}
    </div>
  );
}
