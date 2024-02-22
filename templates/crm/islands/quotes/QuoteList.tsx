import { Badge } from "netzo/components/badge.tsx";
import { ScrollArea } from "netzo/components/scroll-area.tsx";
import { cn } from "netzo/components/utils.ts";
import formatDistanceToNow from "npm:date-fns/formatDistanceToNow";
import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";
import { Quote } from "../../data/quotes.ts";

interface QuoteListProps {
  items: Quote[];
}

export function QuoteList({ items }: QuoteListProps) {
  const [quote, setQuote] = useState(items[0]);

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              quote.selected === item.id && "bg-muted",
            )}
            onClick={() =>
              setQuote({
                ...quote,
                selected: item.id,
              })}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.name}</div>
                  {!item.read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    quote.selected === item.id
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">{item.subject}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item.text.substring(0, 300)}
            </div>
            {item.labels.length
              ? (
                <div className="flex items-center gap-2">
                  {item.labels.map((label) => (
                    <Badge
                      key={label}
                      variant={getBadgeVariantFromLabel(label)}
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
              )
              : null}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

function getBadgeVariantFromLabel(
  label: string,
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}
