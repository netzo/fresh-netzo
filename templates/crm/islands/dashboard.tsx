import { useSignal } from "@preact/signals";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "netzo/components/avatar.tsx";
import * as Plot from "netzo/components/blocks/plot.tsx";
import { Button } from "netzo/components/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "netzo/components/card.tsx";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "netzo/components/command.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "netzo/components/popover.tsx";
import { cn } from "netzo/components/utils.ts";
import type { ComponentProps } from "preact";
import type { Account } from "../data/accounts.ts";
import type { Metric } from "../data/metrics.ts";
import { toPercent, toUSD } from "../data/mod.ts";

type PopoverTriggerProps = ComponentProps<typeof PopoverTrigger>;

interface DashboardAccountSelectProps extends PopoverTriggerProps {
  accounts: Account[];
  account: Account;
}

export function AccountSelect({
  accounts,
  account,
  className,
}: DashboardAccountSelectProps) {
  const open = useSignal(false);
  const selectedAccount = useSignal<Account | null>(account);

  const groups = [
    { name: "Accounts", items: accounts },
  ];

  const onSelect = (item: Account) => {
    open.value = false;
    selectedAccount.value = item;
    globalThis.location.href = `?accountId=${item.id}`;
  };

  return (
    <Popover
      open={open.value}
      onOpenChange={(value) => open.value = value}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open.value}
          aria-label="Select a account"
          className={cn("w-auto justify-between", className)}
        >
          <Avatar className="mr-2 h-5 w-5">
            {selectedAccount.value
              ? (
                <>
                  <AvatarImage
                    src={selectedAccount.value?.image}
                    alt={selectedAccount.value?.name}
                    className="grayscale"
                  />
                  <AvatarFallback>
                    {selectedAccount.value?.name?.[0]}
                  </AvatarFallback>
                </>
              )
              : <i className="mdi-storefront h-5 w-5" />}
          </Avatar>
          {selectedAccount.value?.name ?? "All accounts"}
          <i className="mdi-unfold-more-horizontal ml-3 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search by name" />
            <CommandItem
              onSelect={() => {
                selectedAccount.value = null;
                globalThis.location.href = "/";
                open.value = false;
              }}
              className="text-sm"
            >
              <Avatar className="mr-2 h-5 w-5">
                <i className="mdi-storefront h-5 w-5" />
              </Avatar>
              All accounts
              <i
                className={cn(
                  "mdi-check ml-auto h-4 w-4",
                  selectedAccount.value === null ? "opacity-100" : "opacity-0",
                )}
              />
            </CommandItem>
            <CommandEmpty>No account found.</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup key={group.name} heading={group.name}>
                {group.items.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => onSelect(item)}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={item.image}
                        alt={item.name}
                        className="grayscale"
                      />
                      <AvatarFallback>
                        {selectedAccount.value?.name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    {item.name}
                    <i
                      className={cn(
                        "mdi-check ml-auto h-4 w-4",
                        selectedAccount.value?.id === item.id
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  open.value = false;
                  globalThis.location.href = "/accounts";
                }}
              >
                <i className="mdi-plus-circle-outline mr-2 h-5 w-5" />
                Create Account
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function Cards(props: { data: Metric; account: Account }) {
  const { amount, count, deals } = props.data;
  const activeCount = props.account ? count.ofAccount : count.all;
  const dealAverageValue = props.account
    ? amount.ofAccount / count.ofAccount
    : amount.all / count.all;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Deals
          </CardTitle>
          <div className="w-4 h-4 mdi-tag text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {activeCount}
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="text-primary">
              {toPercent(activeCount / count.all)}
            </span>{" "}
            of all deals
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Deals won
          </CardTitle>
          <div className="w-4 h-4 mdi-currency-usd text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{count.ofAccount}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-primary">
              {toPercent(count.perStatus.won / count.all)}
            </span>{" "}
            of all deals
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Deals won amount
          </CardTitle>
          <div className="w-4 h-4 mdi-currency-usd text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{toUSD(amount.ofAccount)}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-primary">
              {toPercent(amount.perStatus.won / amount.all)}
            </span>{" "}
            of all deals
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Deal average value
          </CardTitle>
          <div className="w-4 h-4 mdi-currency-usd-circle text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{toUSD(dealAverageValue)}</div>
          <p className="text-xs text-muted-foreground">
            {/* {props.account ? "of account deals" : "of all deals"} */}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function ChartDealsPerMonth(props: { data: Metric }) {
  const { dealsPerMonth = [] } = props.data;
  const data = dealsPerMonth.map((d) => ({ ...d, amount: Number(d.amount) }));

  return (
    <Plot.Figure
      options={{
        x: { tickFormat: Plot.formatMonth(), ticks: 12 },
        marks: [
          Plot.barY(data, { x: "month", y: "amount", tip: true }),
          Plot.ruleY([0]),
        ],
      }}
    />
  );
}

export function ChartDealsPerStatus(props: { data: Metric }) {
  const { deals } = props.data;
  const data = deals.map((d) => ({ ...d, amount: Number(d.amount) }));

  return (
    <Plot.Figure
      options={{
        color: { legend: true },
        marks: [
          Plot.barY(
            data,
            Plot.groupX({ y: "count" }, {
              x: "status",
              fill: "status",
              tip: true,
            }),
          ),
          Plot.ruleY([0]),
        ],
      }}
    />
  );
}

export function ChartDealsThroughTime(props: { data: Metric }) {
  const { dealsAmountThroughTime = [] } = props.data;
  const currentYear = new Date().getFullYear();
  const data = dealsAmountThroughTime.map((d) => ({
    createdAt: new Date(d.createdAt),
    amount: Number(d.amount),
  }));
  return (
    <Plot.Figure
      options={{
        marks: [
          Plot.lineX(data, { x: "createdAt", y: "amount", tip: true }),
          Plot.crosshair(data, { x: "createdAt", y: "amount" }),
        ],
      }}
    />
  );
}

function PlotPlaceholder() {
  return (
    <div className="text-muted-foreground text-center">
      No deals created yet
    </div>
  );
}
