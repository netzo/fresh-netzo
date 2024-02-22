import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "netzo/components/avatar.tsx";
import { Button } from "netzo/components/button.tsx";
import { Calendar } from "netzo/components/calendar.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "netzo/components/dropdown-menu.tsx";
import { Label } from "netzo/components/label.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "netzo/components/popover.tsx";
import { Separator } from "netzo/components/separator.tsx";
import { Switch } from "netzo/components/switch.tsx";
import { Textarea } from "netzo/components/textarea.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "netzo/components/tooltip.tsx";
import addDays from "npm:date-fns/addDays";
import addHours from "npm:date-fns/addHours";
import format from "npm:date-fns/format";
import nextSaturday from "npm:date-fns/nextSaturday";
import { Quote } from "../../data/quotes.ts";

interface QuoteDisplayProps {
  quote: Quote | null;
}

export function QuoteDisplay({ quote }: QuoteDisplayProps) {
  const today = new Date();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!quote}>
                <i className="mdi-archive h-4 w-4" />
                <span className="sr-only">Archive</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Archive</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!quote}>
                <i className="mdi-unarchive-remove h-4 w-4" />
                <span className="sr-only">Move to junk</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move to junk</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!quote}>
                <i className="mdi-delete h-4 w-4" />
                <span className="sr-only">Move to trash</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move to trash</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Tooltip>
            <Popover>
              <PopoverTrigger asChild>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" disabled={!quote}>
                    <i className="mdi-clock h-4 w-4" />
                    <span className="sr-only">Snooze</span>
                  </Button>
                </TooltipTrigger>
              </PopoverTrigger>
              <PopoverContent className="flex w-[535px] p-0">
                <div className="flex flex-col gap-2 border-r px-2 py-4">
                  <div className="px-4 text-sm font-medium">Snooze until</div>
                  <div className="grid min-w-[250px] gap-1">
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      Later today{" "}
                      <span className="ml-auto text-muted-foreground">
                        {format(addHours(today, 4), "E, h:m b")}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      Tomorrow
                      <span className="ml-auto text-muted-foreground">
                        {format(addDays(today, 1), "E, h:m b")}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      This weekend
                      <span className="ml-auto text-muted-foreground">
                        {format(nextSaturday(today), "E, h:m b")}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      Next week
                      <span className="ml-auto text-muted-foreground">
                        {format(addDays(today, 7), "E, h:m b")}
                      </span>
                    </Button>
                  </div>
                </div>
                <div className="p-2">
                  <Calendar />
                </div>
              </PopoverContent>
            </Popover>
            <TooltipContent>Snooze</TooltipContent>
          </Tooltip>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!quote}>
                <i className="mdi-reply h-4 w-4" />
                <span className="sr-only">Reply</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!quote}>
                <i className="mdi-reply-all h-4 w-4" />
                <span className="sr-only">Reply all</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply all</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!quote}>
                <i className="mdi-forward h-4 w-4" />
                <span className="sr-only">Forward</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Forward</TooltipContent>
          </Tooltip>
        </div>
        <Separator orientation="vertical" className="mx-2 h-6" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={!quote}>
              <i className="mdi-dots-vertical h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Mark as unread</DropdownMenuItem>
            <DropdownMenuItem>Star thread</DropdownMenuItem>
            <DropdownMenuItem>Add label</DropdownMenuItem>
            <DropdownMenuItem>Mute thread</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
      {quote
        ? (
          <div className="flex flex-1 flex-col">
            <div className="flex items-start p-4">
              <div className="flex items-start gap-4 text-sm">
                <Avatar>
                  <AvatarImage alt={quote.name} />
                  <AvatarFallback>
                    {quote.name
                      .split(" ")
                      .map((chunk) => chunk[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-semibold">{quote.name}</div>
                  <div className="line-clamp-1 text-xs">{quote.subject}</div>
                  <div className="line-clamp-1 text-xs">
                    <span className="font-medium">Reply-To:</span>{" "}
                    {quote.equote}
                  </div>
                </div>
              </div>
              {quote.date && (
                <div className="ml-auto text-xs text-muted-foreground">
                  {format(new Date(quote.date), "PPpp")}
                </div>
              )}
            </div>
            <Separator />
            <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
              {quote.text}
            </div>
            <Separator className="mt-auto" />
            <div className="p-4">
              <form>
                <div className="grid gap-4">
                  <Textarea
                    className="p-4"
                    placeholder={`Reply ${quote.name}...`}
                  />
                  <div className="flex items-center">
                    <Label
                      htmlFor="mute"
                      className="flex items-center gap-2 text-xs font-normal"
                    >
                      <Switch id="mute" aria-label="Mute thread" />{" "}
                      Mute this thread
                    </Label>
                    <Button
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                      className="ml-auto"
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )
        : (
          <div className="p-8 text-center text-muted-foreground">
            No message selected
          </div>
        )}
    </div>
  );
}
