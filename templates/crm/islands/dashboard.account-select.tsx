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
import { useState } from "preact/hooks";
import type { Account } from "../data/accounts.ts";

type PopoverTriggerProps = ComponentProps<typeof PopoverTrigger>;

interface DashboardAccountSelectProps extends PopoverTriggerProps {
  accounts: Account[];
}

export function DashboardAccountSelect(
  { className, accounts, account }: DashboardAccountSelectProps,
) {
  const [open, setOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account>(account);

  const groups = [
    {
      name: "Teams",
      items: [{ id: "sales-team", name: "Sales Team" }],
    },
    { name: "Personal", items: accounts },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a account"
          className={cn("w-auto justify-between", className)}
        >
          <Avatar className="mr-2 h-5 w-5">
            <AvatarImage
              src={`https://avatar.vercel.sh/${selectedAccount.id}.png`}
              alt={selectedAccount.name}
              className="grayscale"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          {selectedAccount.name}
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
                        setSelectedAccount(undefined);
                        window.location.href = "";
                      } else {
                        setSelectedAccount(item);
                        window.location.href = `?accountId=${item.id}`;
                      }
                      setOpen(false);
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
                        selectedAccount.id === item.id
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
                  setOpen(false);
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
