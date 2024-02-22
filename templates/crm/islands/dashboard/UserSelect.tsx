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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "netzo/components/dialog.tsx";
import { Input } from "netzo/components/input.tsx";
import { Label } from "netzo/components/label.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "netzo/components/popover.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "netzo/components/select.tsx";
import { cn } from "netzo/components/utils.ts";
import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";
import type { User } from "../../data/users.ts";

type PopoverTriggerProps = ComponentProps<typeof PopoverTrigger>;

interface UserSelectProps extends PopoverTriggerProps {
  users: User[];
}

export function UserSelect({ className, users }: UserSelectProps) {
  const [open, setOpen] = useState(false);
  const [showNewUserDialog, setShowNewUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>(users[0]);

  const groups = [{ name: "Team Members", users }];

  return (
    <Dialog open={showNewUserDialog} onOpenChange={setShowNewUserDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a user"
            className={cn("w-auto justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/${selectedUser.id}.png`}
                alt={selectedUser.name}
                className="grayscale"
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {selectedUser.name}
            <i className="mdi-unfold-more-horizontal ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search by name" />
              <CommandEmpty>No user found.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.name} heading={group.name}>
                  {group.users.map((user) => (
                    <CommandItem
                      key={user.id}
                      onSelect={() => {
                        setSelectedUser(user);
                        setOpen(false);
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${user.id}.png`}
                          alt={user.name}
                          className="grayscale"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {user.name}
                      <i
                        className={cn(
                          "mdi-check ml-auto h-4 w-4",
                          selectedUser.id === user.id
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
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewUserDialog(true);
                    }}
                  >
                    <i className="mdi-plus-circle-outline mr-2 h-5 w-5" />
                    Create User
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create user</DialogTitle>
          <DialogDescription>
            Add a new user to the team.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">
                    <span className="font-medium">Admin</span> -{" "}
                    <span className="text-muted-foreground">
                      access workspace modules but not workspace settings
                    </span>
                  </SelectItem>
                  <SelectItem value="edit">
                    <span className="font-medium">Edit</span> -{" "}
                    <span className="text-muted-foreground">
                      full access to workspace except billing and deletion
                    </span>
                  </SelectItem>
                  <SelectItem value="view">
                    <span className="font-medium">View</span> -{" "}
                    <span className="text-muted-foreground">
                      full access to workspace
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewUserDialog(false)}>
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
