import { IconCopy } from "netzo/components/icon-copy.tsx";
import { cn } from "netzo/components/utils.ts";
import type { Deal } from "../data/deals.ts";
import { GROUPS } from "../islands/deals.tsx";

export function ContactDeals(props: { deals: Deal[] }) {
  const getGroup = (deal: Deal) => {
    return GROUPS.find((group) => group.id === deal.status);
  };

  if (!props.deals.length) {
    return (
      <div className="grid place-items-center w-full h-full py-20">
        <div className="text-center">
          <i className="mdi-tag text-4xl text-muted-foreground mb-2" />
          <h2 className="text-xl font-medium text-muted-foreground mb-1">
            No deals found
          </h2>
          <p className="text-sm text-muted-foreground">
            <a href="/deals">Create a new deal</a> to get started
          </p>
        </div>
      </div>
    );
  }

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
          </div>
          <div className="ml-auto font-medium">{deal.amount}</div>
        </div>
      ))}
    </div>
  );
}
