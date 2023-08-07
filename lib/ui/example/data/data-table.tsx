import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "netzo/ui/components/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "netzo/ui/components/dropdown-menu.tsx";
import { Checkbox } from "netzo/ui/components/checkbox.tsx";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Item = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Item>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(item.id)}
            >
              Copy item ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View item details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const data: Item[] = [
  {
    "id": "728ed52f",
    "amount": 100,
    "status": "pending",
    "email": "m@example.com",
  },
  {
    "id": "61ad863c",
    "amount": 75,
    "status": "success",
    "email": "john.doe@example.com",
  },
  {
    "id": "9f8be2a1",
    "amount": 50,
    "status": "failed",
    "email": "jane.doe@example.com",
  },
  {
    "id": "22e6aaf3",
    "amount": 200,
    "status": "pending",
    "email": "test@example.com",
  },
  {
    "id": "3c7858b7",
    "amount": 300,
    "status": "success",
    "email": "info@example.com",
  },
  {
    "id": "b31a0c12",
    "amount": 150,
    "status": "pending",
    "email": "user@example.com",
  },
  {
    "id": "4b5d11c6",
    "amount": 120,
    "status": "pending",
    "email": "support@example.com",
  },
  {
    "id": "a9cd81d0",
    "amount": 80,
    "status": "success",
    "email": "customer@example.com",
  },
  {
    "id": "36226a23",
    "amount": 250,
    "status": "failed",
    "email": "admin@example.com",
  },
  {
    "id": "29841db1",
    "amount": 175,
    "status": "pending",
    "email": "hello@example.com",
  },
  {
    "id": "b6efad90",
    "amount": 50,
    "status": "success",
    "email": "world@example.com",
  },
  {
    "id": "e1ee3982",
    "amount": 300,
    "status": "pending",
    "email": "testuser@example.com",
  },
  {
    "id": "a3c61d16",
    "amount": 200,
    "status": "pending",
    "email": "mock@example.com",
  },
  {
    "id": "e4da2dc1",
    "amount": 90,
    "status": "failed",
    "email": "randomuser@example.com",
  },
  {
    "id": "2f49b2a3",
    "amount": 80,
    "status": "success",
    "email": "sample@example.com",
  },
  {
    "id": "7a22ea86",
    "amount": 120,
    "status": "pending",
    "email": "infouser@example.com",
  },
  {
    "id": "26c42843",
    "amount": 150,
    "status": "success",
    "email": "example@example.com",
  },
  {
    "id": "d1f81bb0",
    "amount": 220,
    "status": "failed",
    "email": "user1@example.com",
  },
  {
    "id": "c5d0388b",
    "amount": 130,
    "status": "pending",
    "email": "user2@example.com",
  },
  {
    "id": "6b7d43e3",
    "amount": 180,
    "status": "pending",
    "email": "user3@example.com",
  },
  {
    "id": "f63b9940",
    "amount": 50,
    "status": "success",
    "email": "user4@example.com",
  },
  {
    "id": "968b4349",
    "amount": 270,
    "status": "pending",
    "email": "user5@example.com",
  },
  {
    "id": "d26c4654",
    "amount": 300,
    "status": "pending",
    "email": "user6@example.com",
  },
  {
    "id": "c2679135",
    "amount": 80,
    "status": "success",
    "email": "user7@example.com",
  },
  {
    "id": "b3968d92",
    "amount": 100,
    "status": "failed",
    "email": "user8@example.com",
  },
  {
    "id": "78449a2b",
    "amount": 120,
    "status": "pending",
    "email": "user9@example.com",
  },
  {
    "id": "ad0bacec",
    "amount": 150,
    "status": "success",
    "email": "user10@example.com",
  },
  {
    "id": "a2e5c176",
    "amount": 200,
    "status": "pending",
    "email": "user11@example.com",
  },
  {
    "id": "d12d65ef",
    "amount": 90,
    "status": "pending",
    "email": "user12@example.com",
  },
  {
    "id": "a5cd3de1",
    "amount": 70,
    "status": "success",
    "email": "user13@example.com",
  },
  {
    "id": "f4a1d2c6",
    "amount": 180,
    "status": "pending",
    "email": "user14@example.com",
  },
  {
    "id": "e0a601d2",
    "amount": 50,
    "status": "failed",
    "email": "user15@example.com",
  },
  {
    "id": "33de8b99",
    "amount": 120,
    "status": "pending",
    "email": "user16@example.com",
  },
  {
    "id": "303d8c3b",
    "amount": 90,
    "status": "success",
    "email": "user17@example.com",
  },
  {
    "id": "2cbaf22a",
    "amount": 200,
    "status": "pending",
    "email": "user18@example.com",
  },
  {
    "id": "84890c9d",
    "amount": 150,
    "status": "pending",
    "email": "user19@example.com",
  },
  {
    "id": "4b1663a9",
    "amount": 70,
    "status": "success",
    "email": "user20@example.com",
  },
  {
    "id": "7b61f004",
    "amount": 280,
    "status": "pending",
    "email": "user21@example.com",
  },
  {
    "id": "7d8b44b7",
    "amount": 300,
    "status": "pending",
    "email": "user22@example.com",
  },
  {
    "id": "7f516d11",
    "amount": 80,
    "status": "success",
    "email": "user23@example.com",
  },
  {
    "id": "ae56543e",
    "amount": 90,
    "status": "failed",
    "email": "user24@example.com",
  },
  {
    "id": "9814f6d0",
    "amount": 100,
    "status": "pending",
    "email": "user25@example.com",
  },
  {
    "id": "8fbc8796",
    "amount": 200,
    "status": "success",
    "email": "user26@example.com",
  },
  {
    "id": "4f5e5096",
    "amount": 120,
    "status": "pending",
    "email": "user27@example.com",
  },
  {
    "id": "24575c05",
    "amount": 160,
    "status": "pending",
    "email": "user28@example.com",
  },
  {
    "id": "ce76d20c",
    "amount": 50,
    "status": "success",
    "email": "user29@example.com",
  },
  {
    "id": "1c0e8cf0",
    "amount": 190,
    "status": "pending",
    "email": "user30@example.com",
  },
  {
    "id": "1ee8c39b",
    "amount": 110,
    "status": "pending",
    "email": "user31@example.com",
  },
  {
    "id": "8cbbf78d",
    "amount": 50,
    "status": "success",
    "email": "user32@example.com",
  },
  {
    "id": "f03b504b",
    "amount": 130,
    "status": "pending",
    "email": "user33@example.com",
  },
  {
    "id": "5b1e2b01",
    "amount": 100,
    "status": "failed",
    "email": "user34@example.com",
  },
  {
    "id": "c84dd4f5",
    "amount": 120,
    "status": "pending",
    "email": "user35@example.com",
  },
  {
    "id": "d94d6612",
    "amount": 250,
    "status": "success",
    "email": "user36@example.com",
  },
  {
    "id": "67bc6c10",
    "amount": 200,
    "status": "pending",
    "email": "user37@example.com",
  },
  {
    "id": "45c06a7b",
    "amount": 90,
    "status": "pending",
    "email": "user38@example.com",
  },
  {
    "id": "e49be5a7",
    "amount": 70,
    "status": "success",
    "email": "user39@example.com",
  },
  {
    "id": "8ea360a9",
    "amount": 180,
    "status": "pending",
    "email": "user40@example.com",
  },
  {
    "id": "70de70b5",
    "amount": 50,
    "status": "pending",
    "email": "user41@example.com",
  },
  {
    "id": "47ccedf0",
    "amount": 220,
    "status": "success",
    "email": "user42@example.com",
  },
  {
    "id": "d1504d04",
    "amount": 200,
    "status": "pending",
    "email": "user43@example.com",
  },
  {
    "id": "d6f9e99b",
    "amount": 90,
    "status": "failed",
    "email": "user44@example.com",
  },
  {
    "id": "4f9bb93e",
    "amount": 70,
    "status": "success",
    "email": "user45@example.com",
  },
  {
    "id": "c42a1e99",
    "amount": 180,
    "status": "pending",
    "email": "user46@example.com",
  },
  {
    "id": "1979f33c",
    "amount": 50,
    "status": "pending",
    "email": "user47@example.com",
  },
  {
    "id": "d9aa76a7",
    "amount": 210,
    "status": "success",
    "email": "user48@example.com",
  },
  {
    "id": "2ee77813",
    "amount": 200,
    "status": "pending",
    "email": "user49@example.com",
  },
  {
    "id": "5795615a",
    "amount": 90,
    "status": "pending",
    "email": "user50@example.com",
  },
  {
    "id": "e534fc0f",
    "amount": 70,
    "status": "success",
    "email": "user51@example.com",
  },
  {
    "id": "94edffcd",
    "amount": 180,
    "status": "pending",
    "email": "user52@example.com",
  },
  {
    "id": "9d1bb6bf",
    "amount": 50,
    "status": "failed",
    "email": "user53@example.com",
  },
  {
    "id": "2af38062",
    "amount": 160,
    "status": "pending",
    "email": "user54@example.com",
  },
  {
    "id": "68a7c2c6",
    "amount": 90,
    "status": "success",
    "email": "user55@example.com",
  },
  {
    "id": "b2201cda",
    "amount": 200,
    "status": "pending",
    "email": "user56@example.com",
  },
  {
    "id": "ba1a72ac",
    "amount": 150,
    "status": "pending",
    "email": "user57@example.com",
  },
  {
    "id": "de6144a4",
    "amount": 70,
    "status": "success",
    "email": "user58@example.com",
  },
  {
    "id": "9743ac4e",
    "amount": 280,
    "status": "pending",
    "email": "user59@example.com",
  },
  {
    "id": "ea7a8b32",
    "amount": 300,
    "status": "pending",
    "email": "user60@example.com",
  },
  {
    "id": "729a7557",
    "amount": 80,
    "status": "success",
    "email": "user61@example.com",
  },
  {
    "id": "bfdf73f1",
    "amount": 90,
    "status": "failed",
    "email": "user62@example.com",
  },
  {
    "id": "54850f84",
    "amount": 100,
    "status": "pending",
    "email": "user63@example.com",
  },
  {
    "id": "e5b8b2b8",
    "amount": 200,
    "status": "success",
    "email": "user64@example.com",
  },
  {
    "id": "55da73f7",
    "amount": 120,
    "status": "pending",
    "email": "user65@example.com",
  },
  {
    "id": "1f8b06a0",
    "amount": 160,
    "status": "pending",
    "email": "user66@example.com",
  },
  {
    "id": "e380128e",
    "amount": 50,
    "status": "success",
    "email": "user67@example.com",
  },
  {
    "id": "7f8fb7d3",
    "amount": 190,
    "status": "pending",
    "email": "user68@example.com",
  },
  {
    "id": "7a792bb1",
    "amount": 110,
    "status": "pending",
    "email": "user69@example.com",
  },
  {
    "id": "67c9e59a",
    "amount": 50,
    "status": "success",
    "email": "user70@example.com",
  },
  {
    "id": "ab050bb3",
    "amount": 130,
    "status": "pending",
    "email": "user71@example.com",
  },
  {
    "id": "7e93b6b7",
    "amount": 100,
    "status": "failed",
    "email": "user72@example.com",
  },
  {
    "id": "1d8b0da0",
    "amount": 120,
    "status": "pending",
    "email": "user73@example.com",
  },
  {
    "id": "d98e7a87",
    "amount": 250,
    "status": "success",
    "email": "user74@example.com",
  },
  {
    "id": "d7d3c5a4",
    "amount": 200,
    "status": "pending",
    "email": "user75@example.com",
  },
  {
    "id": "9c883275",
    "amount": 90,
    "status": "pending",
    "email": "user76@example.com",
  },
  {
    "id": "43a4ac96",
    "amount": 70,
    "status": "success",
    "email": "user77@example.com",
  },
  {
    "id": "ca00e650",
    "amount": 180,
    "status": "pending",
    "email": "user78@example.com",
  },
  {
    "id": "243570f3",
    "amount": 50,
    "status": "pending",
    "email": "user79@example.com",
  },
  {
    "id": "f3f77899",
    "amount": 220,
    "status": "success",
    "email": "user80@example.com",
  },
  {
    "id": "4d81d161",
    "amount": 200,
    "status": "pending",
    "email": "user81@example.com",
  },
  {
    "id": "d1f1634f",
    "amount": 90,
    "status": "failed",
    "email": "user82@example.com",
  },
  {
    "id": "d8ea7929",
    "amount": 70,
    "status": "success",
    "email": "user83@example.com",
  },
  {
    "id": "82e7ea3e",
    "amount": 180,
    "status": "pending",
    "email": "user84@example.com",
  },
  {
    "id": "3d388685",
    "amount": 50,
    "status": "failed",
    "email": "user85@example.com",
  },
  {
    "id": "0a5b4c52",
    "amount": 170,
    "status": "pending",
    "email": "user86@example.com",
  },
  {
    "id": "ff2ec8b0",
    "amount": 90,
    "status": "success",
    "email": "user87@example.com",
  },
  {
    "id": "e843c46d",
    "amount": 200,
    "status": "pending",
    "email": "user88@example.com",
  },
  {
    "id": "b03415a7",
    "amount": 150,
    "status": "pending",
    "email": "user89@example.com",
  },
  {
    "id": "297123a2",
    "amount": 70,
    "status": "success",
    "email": "user90@example.com",
  },
  {
    "id": "cd122dc9",
    "amount": 280,
    "status": "pending",
    "email": "user91@example.com",
  },
  {
    "id": "76216396",
    "amount": 300,
    "status": "pending",
    "email": "user92@example.com",
  },
  {
    "id": "6d68437d",
    "amount": 80,
    "status": "success",
    "email": "user93@example.com",
  },
  {
    "id": "27686d2f",
    "amount": 90,
    "status": "failed",
    "email": "user94@example.com",
  },
  {
    "id": "c8164403",
    "amount": 100,
    "status": "pending",
    "email": "user95@example.com",
  },
  {
    "id": "6c2c9f97",
    "amount": 200,
    "status": "success",
    "email": "user96@example.com",
  },
  {
    "id": "72f8cb8f",
    "amount": 120,
    "status": "pending",
    "email": "user97@example.com",
  },
  {
    "id": "9eaefedc",
    "amount": 160,
    "status": "pending",
    "email": "user98@example.com",
  },
  {
    "id": "982dd17c",
    "amount": 50,
    "status": "success",
    "email": "user99@example.com",
  },
  {
    "id": "5b53d6fc",
    "amount": 190,
    "status": "pending",
    "email": "user100@example.com",
  },
];
