import { cn } from "../../utils.ts";
import { Button } from "../../components/button.tsx";
import { layout } from "./table.tsx";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/dropdown-menu.tsx";
import type { Table } from "./use-table.ts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/card.tsx";
import { Input } from "../../components/input.tsx";
import { Label } from "../../components/label.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/tabs.tsx";

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

type TableOptionsProps<TData> = {
  table: Table<TData>;
};

export const LAYOUTS = {
  grid: "mdi-table",
  gallery: "mdi-view-grid",
  kanban: "mdi-view-column",
};

export function TableOptions<TData>({
  table,
}: TableOptionsProps<TData>) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-3 hidden lg:flex"
          >
            <div className={cn("h-4 w-4", LAYOUTS[layout.value])} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Table Layout</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={layout.value}
            onValueChange={(e) => layout.value = e}
          >
            <DropdownMenuRadioItem value="grid">
              Grid
              <div className={cn("h-4 w-4", LAYOUTS.table)} />
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="gallery">
              Gallery
              <div className={cn("h-4 w-4", LAYOUTS.gallery)} />
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="kanban">
              <div className={cn("h-4 w-4", LAYOUTS.kanban)} />
              Kanban
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-3 hidden lg:flex"
          >
            <i className="mdi-tune-variant h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>
            Toggle columns
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <TabsDemo />
          {
            /* {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => {
                    const toggleColumn = (column) => {
                      column.toggleVisibility(!!value);
                      if (column.columns) column.columns.forEach(toggleColumn);
                    };
                    toggleColumn(column);
                  }}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })} */
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
