import { Button } from "netzo/components/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "netzo/components/card.tsx";
import { Overview } from "../../components/dashboard/overview.tsx";
import { RecentSales } from "../../components/dashboard/recent-sales.tsx";
import { UserSelect } from "./UserSelect.tsx";

export function Dashboard(props: { data: unknown[][] }) {
  const [accounts, contacts, deals, quotes, users] = props.data;

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center">
        <UserSelect users={users} />
        {/* <MainNav className="mx-6" /> */}
        <div className="ml-auto flex items-center space-x-4">
          <Button onClick={() => window.print()}>
            <i className="mdi-printer w-4 h-4 mr-2" />
            Print PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Deals
            </CardTitle>
            <div className="w-4 h-4 mdi-tag text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14/28</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+19.6%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <div className="w-4 h-4 mdi-currency-usd text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500">+20.1%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Average Sale Value
            </CardTitle>
            <div className="w-4 h-4 mdi-currency-usd-circle text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3230.85</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500">-5.1%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Interactions
            </CardTitle>
            <div className="w-4 h-4 mdi-history text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+53</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              You made 265 sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
