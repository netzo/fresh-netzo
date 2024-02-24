import { useSignal } from "@preact/signals";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "netzo/components/avatar.tsx";
import { Badge } from "netzo/components/badge.tsx";
import { AutoForm } from "netzo/components/blocks/auto-form/auto-form.tsx";
import { Button } from "netzo/components/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "netzo/components/card.tsx";
import { useForm, zodResolver } from "netzo/components/form.tsx";
import { Separator } from "netzo/components/separator.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "netzo/components/tabs.tsx";
import { AccountDeals } from "../components/account.deals.tsx";
import { Account, accountSchema } from "../data/accounts.ts";
import type { Deal } from "../data/deals.ts";
import { Notes } from "./notes.tsx";

export function Account(
  props: { id: string; account: Account; deals: Deal[] },
) {
  const values = useSignal(props.account ?? { id: props.id });

  return (
    <div className="px-4">
      <AccountHeader values={values} />
      <Tabs defaultValue="overview">
        <TabsList variant="outline">
          <TabsTrigger value="overview" variant="outline">Overview</TabsTrigger>
          <TabsTrigger value="notes" variant="outline">Notes</TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="overview">
          <AccountOverview values={values} deals={props.deals} />
        </TabsContent>
        <TabsContent value="notes" className="py-2 px-4">
          <Notes data={values.value?.notes ?? []} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AccountHeader(props: { values: Signal<Account> }) {
  const isLoading = useSignal(false);

  const { name = "", tags, image } = props.values.value;
  const [first = "", last = ""] = name.split(" ");
  const initials = `${first[0]}${last[0]}`?.toUpperCase();

  const onClickDelete = async () => {
    if (confirm("Are you sure you want to delete this account?")) {
      isLoading.value = true;
      await fetch(`/api/accounts/${props.values.value.id}`, {
        method: "DELETE",
      });
      isLoading.value = false;
      window.location.href = "/accounts";
    }
  };

  const onSubmit = async () => {
    e.preventDefault();
    isLoading.value.value = true;
    // ✅ This will be type-safe and validated.
    await fetch(`/api/accounts/${props.values.value.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(props.values.value),
    });
    isLoading.value = false;
  };

  return (
    <header className="flex align-center justify-between py-4 px-2">
      <div className="flex flex-row align-center justify-between gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={image} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="grid gap-2">
          <CardTitle className="text-xl">
            {name}
          </CardTitle>
          {tags?.length && (
            <div className="flex gap-1">
              {tags?.map((tag, index) => (
                <Badge key={`${tag}-${index}`} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row align-center gap-4">
        <Button variant="destructive" onClick={onClickDelete}>Delete</Button>
        <Button
          variant="default"
          onClick={onSubmit}
        >
          {isLoading.value
            ? <i className="mdi-reload mr-2 h-4 w-4 animate-spin" />
            : "Save"}
        </Button>
      </div>
    </header>
  );
}

function AccountOverview(props: { values: Signal<Account>; deals: Deal[] }) {
  const form = useForm<Account>({
    resolver: zodResolver(accountSchema),
    defaultValues: props.values.value,
  });

  return (
    <div class="flex flex-col gap-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
            <CardTitle className="text-sm font-medium">
              Total Sales
            </CardTitle>
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

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>
              General
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AutoForm
              values={props.values.value}
              formSchema={accountSchema.pick({
                name: true,
                tags: true,
                image: true,
                email: true,
                phone: true,
                links: true,
              })}
              onValuesChange={(value) => props.values.value = value}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              Account Deals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AccountDeals deals={props.deals} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
