import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "netzo/components/avatar.tsx";
import { TableRowActions } from "netzo/components/blocks/table/table.tsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "netzo/components/breadcrumb.tsx";
import { Button } from "netzo/components/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "netzo/components/card.tsx";
import { Combobox } from "netzo/components/combobox.tsx";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "netzo/components/dialog.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
  type UseFormReturn,
  zodResolver,
} from "netzo/components/form.tsx";
import { IconCopy } from "netzo/components/icon-copy.tsx";
import { Input } from "netzo/components/input.tsx";
import { Textarea } from "netzo/components/textarea.tsx";
import { cn } from "netzo/components/utils.ts";
import { type Account, accountSchema, getAccount } from "../data/accounts.ts";
import { Deal, dealSchema, getDeal } from "../data/deals.ts";
import { I18N, toPercent, toUSD } from "../data/mod.ts";
import { GROUPS } from "./deals.tsx";

type PageAccountProps = {
  id: string;
  account: Account;
  deals: Deal[];
};

export function PageAccount(props: PageAccountProps) {
  const form = useForm<Account>({
    resolver: zodResolver(accountSchema),
    defaultValues: getAccount(props.account),
  });

  const onSubmit = async (data: Account) => {
    const response = await fetch(`/api/accounts/${props.account.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(getAccount(data)),
    });
    if (response.ok) globalThis.location.reload();
  };

  return (
    <Form {...form}>
      <form
        id="accounts.patch"
        className="h-full overflow-y-auto"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <AccountHeader form={form} />

        <div className="flex flex-col gap-4 p-4">
          <AccountMetrics {...props} />
          <div className="grid lg:grid-cols-2 gap-4">
            <AccountCardFormUpdate {...props} form={form} />
            <CardDeals
              {...props}
              defaultValues={{ accountId: props.account.id }}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}

function AccountHeader(props: { form: UseFormReturn<Account> }) {
  const original = props.form.getValues();
  const { name, image } = original;
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex flex-row items-center justify-between gap-4">
        <Breadcrumb className="text-xl font-bold">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <a href="/accounts">Accounts</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Avatar className="h-6 w-6">
                <AvatarImage src={image} />
                <AvatarFallback>
                  {name?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {name}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-row items-center gap-4">
        <TableRowActions
          row={{ original }}
          endpoint="/api/accounts"
        />
        <Button
          type="reset"
          variant="secondary"
          disabled={!props.form.formState.isDirty}
        >
          Discard
        </Button>
        <Button
          type="submit"
          disabled={!props.form.formState.isDirty}
        >
          {props.form.formState.isLoading
            ? <i className="mdi-loading h-4 w-4 animate-spin" />
            : "Save"}
        </Button>
      </div>
    </header>
  );
}

function AccountMetrics(props: PageAccountProps) {
  const metrics = getMetricsAccount(props.deals);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle
            title="The total number of deals associated with the data."
            className="text-sm font-medium"
          >
            Total Deals
          </CardTitle>
          <div className="w-4 h-4 mdi-tag text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics.totalDeals}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle
            title="The total value of all deals associated with the data."
            className="text-sm font-medium"
          >
            Total Sales
          </CardTitle>
          <div className="w-4 h-4 mdi-currency-usd text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {toUSD(metrics.totalSales)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle
            title="The average value of each deal made by the data."
            className="text-sm font-medium"
          >
            Average Sale Value
          </CardTitle>
          <div className="w-4 h-4 mdi-currency-usd-circle text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {toUSD(metrics.averageSaleValue)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle
            title="The percentage of leads that have been successfully converted into won deals."
            className="text-sm font-medium"
          >
            Conversion Rate
          </CardTitle>
          <div className="w-4 h-4 mdi-history text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {toPercent(metrics.dealConversionRate)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getMetricsAccount(deals: Deal[]) {
  // Total Number of Deals: represents the total number of deals associated with the data.
  const totalDeals = deals.length;

  // Total Sales Value: calculates the total value of all deals associated with the data.
  const totalSales = deals.reduce((acc, deal) => acc + Number(deal.amount), 0);

  // Average Sale Value: provides the average value of each deal made by the data.
  const averageSaleValue = totalSales / totalDeals;

  // Deal Conversion Rate: indicates the percentage of leads that have been successfully converted into won deals.
  const totalWonDeals = deals.filter((deal) => deal.status === "won").length;
  const dealConversionRate = (totalWonDeals / totalDeals) * 100;

  // Average Time to Close Deals: calculates the average time taken to close deals from creation to completion.
  const dealCloseTimes = deals.map((deal) =>
    new Date(deal.updatedAt) - new Date(deal.createdAt)
  );
  const averageTimeToClose =
    dealCloseTimes.reduce((acc, time) => acc + time, 0) / totalDeals;

  // Deal Win Rate: represents the percentage of won deals out of all deals that were not lost.
  const totalLostDeals = deals.filter((deal) => deal.status === "lost").length;
  const dealWinRate = (totalWonDeals / (totalDeals - totalLostDeals)) * 100;

  // Sales Pipeline Value: calculates the total value of deals currently in the sales pipeline.
  const pipelineValue = deals.reduce(
    (acc, deal) =>
      deal.status !== "won" && deal.status !== "lost"
        ? acc + Number(deal.amount)
        : acc,
    0,
  );

  // Number of Active Deals: represents the number of deals that are currently in progress or in negotiation.
  const activeDeals =
    deals.filter((deal) => deal.status !== "won" && deal.status !== "lost")
      .length;

  // Sales Velocity: measures how quickly deals are being closed, indicating the efficiency of the sales process.
  const averageDealCloseTime = averageTimeToClose / (1000 * 3600 * 24); // Convert milliseconds to days
  const salesVelocity = totalWonDeals / averageDealCloseTime;

  // Deal Success Distribution: provides a breakdown of the distribution of deals based on their success status.
  const dealSuccessDistribution = {
    won: totalWonDeals,
    lost: totalLostDeals,
    inProgress: totalDeals - (totalWonDeals + totalLostDeals),
  };

  return {
    totalDeals,
    totalSales,
    averageSaleValue,
    dealConversionRate,
    averageTimeToClose,
    dealWinRate,
    pipelineValue,
    activeDeals,
    salesVelocity,
    dealSuccessDistribution,
  };
}

function AccountCardFormUpdate({ form }: { form: UseFormReturn<Account> }) {
  return (
    <CardContent>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{I18N["name"]}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{I18N["description"]}</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{I18N["image"]}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{I18N["email"]}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{I18N["phone"]}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <fieldset>
        <FormField
          control={form.control}
          name="links.website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{I18N["links.website"]}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="links.facebook"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{I18N["links.facebook"]}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="links.linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{I18N["links.linkedin"]}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="links.twitter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{I18N["links.twitter"]}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="links.other"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{I18N["links.other"]}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </fieldset>
    </CardContent>
  );
}

export function CardDeals(
  props: PageAccountProps & { defaultValues: Deal },
) {
  const form = useForm<Deal>({
    resolver: zodResolver(dealSchema),
    defaultValues: getDeal(props.defaultValues),
  });

  const onSubmit = async (data: Deal) => {
    const response = await fetch(`/api/deals`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(getAccount(data)),
    });

    if (response.ok) globalThis.location.reload();
  };

  // NOTE: must manually invoke submit because submit button isteleported
  // by dialog out of form (see https://github.com/shadcn-ui/ui/issues/709)
  return (
    <Dialog>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pt-2">
          <CardTitle>
            Account Deals
          </CardTitle>
          <DialogTrigger asChild>
            <Button variant="default" size="sm" className="ml-2">
              Create Deal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="text-left">
              <DialogTitle>Create Deal</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form
                id="deals.create"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{I18N["name"]}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{I18N["description"]}</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{I18N["status"]}</FormLabel>
                      <FormControl>
                        <Combobox
                          {...field}
                          options={[
                            "lead",
                            "qualified",
                            "negotiation",
                            "won",
                            "lost",
                          ].map((value) => ({
                            label: I18N[`status.${value}`],
                            value,
                          }))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{I18N["amount"]}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currencyCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{I18N["currencyCode"]}</FormLabel>
                      <FormControl>
                        <Combobox
                          {...field}
                          options={[{ label: "USD", value: "USD" }]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>

            <DialogFooter>
              <Button form="deals.create" type="submit">
                {form.formState.isLoading
                  ? <i className="mdi-loading h-4 w-4 animate-spin" />
                  : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </CardHeader>
        <CardContent>
          <CardDealsList {...props} />
        </CardContent>
      </Card>
    </Dialog>
  );
}

function CardDealsList(props: PageAccountProps) {
  const getGroup = (deal: Deal) => {
    return GROUPS.find((group) => group.id === deal.status);
  };

  if (!props.deals.length) {
    return (
      <div className="grid place-items-center w-full h-full py-20">
        <div className="text-center">
          <i className="mdi-tag text-4xl text-muted-foreground mb-2" />
          <h2 className="text-xl font-medium text-muted-foreground mb-1">
            No deals found
          </h2>
          <p className="text-sm text-muted-foreground">
            <a href="/deals">Create a new deal</a> to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {props.deals.map((deal, index) => (
        <div
          className={cn(
            "flex items-center",
            (index < props.deals.length - 1) && "b-b-1 pb-4",
          )}
        >
          <div
            {...getGroup(deal)?.icon}
            className={cn("w-6 h-6 mr-3", getGroup(deal)?.icon?.className)}
          />
          <div className="ml-4 space-y-1">
            <div className="flex items-center py-1">
              <a
                href={`/deals/${deal.id}`}
                className="whitespace-nowrap text-center font-medium text-primary hover:underline"
              >
                {deal.name}
              </a>
              <IconCopy value={deal.id} tooltip="Copy ID" />
            </div>
          </div>
          <div className="ml-auto">
            {toUSD(deal.amount)}
          </div>
        </div>
      ))}
    </div>
  );
}
