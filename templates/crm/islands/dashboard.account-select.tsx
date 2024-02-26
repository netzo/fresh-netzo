import { useSignal } from "@preact/signals";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "netzo/components/avatar.tsx";
import { Button } from "netzo/components/button.tsx";
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

type PopoverTriggerProps = ComponentProps<typeof PopoverTrigger>;

interface DashboardAccountSelectProps extends PopoverTriggerProps {
  accounts: Account[];
}

export function DashboardAccountSelect(
  { className, accounts, account }: DashboardAccountSelectProps,
) {
  const open = useSignal(false);
  const selectedAccount = useSignal<Account>(account);

  const groups = [
    {
      name: "Teams",
      items: [{ id: "sales-team", name: "Sales Team" }],
    },
    { name: "Personal", items: accounts },
  ];

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
            <AvatarImage
              src={`https://avatar.vercel.sh/${selectedAccount.value.id}.png`}
              alt={selectedAccount.value.name}
              className="grayscale"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          {selectedAccount.value.name}
          <i className="mdi-unfold-more-horizontal ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search by name" />
            <CommandEmpty>No account found.</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup key={group.name} heading={group.name}>
                {group.items.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => {
                      if (["Teams"].includes(group.name)) {
                        selectedAccount.value = undefined;
                        window.location.href = "";
                      } else {
                        selectedAccount.value = item;
                        window.location.href = `?accountId=${item.id}`;
                      }
                      open.value = false;
                    }}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${item.id}.png`}
                        alt={item.name}
                        className="grayscale"
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    {item.name}
                    <i
                      className={cn(
                        "mdi-check ml-auto h-4 w-4",
                        selectedAccount.value.id === item.id
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
                  window.location.href = "/accounts";
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
