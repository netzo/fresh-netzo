import { type Signal } from "@preact/signals";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "netzo/components/avatar.tsx";
import { AutoForm } from "netzo/components/blocks/auto-form/auto-form.tsx";
import { TableRowActions } from "netzo/components/blocks/table/table.tsx";
import { Button } from "netzo/components/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "netzo/components/card.tsx";
import { Form, useForm, zodResolver, type UseFormReturn } from "netzo/components/form.tsx";
import { Contact, contactSchema, getContact } from "../data/contacts.ts";
import type { Deal } from "../data/deals.ts";
import { toPercent, toUSD } from "../data/mod.ts";
import { useFormState } from "../utils.ts";
import { CardDeals } from "./account.tsx";

type PageContactProps = {
  id: string;
  contact: Contact;
  deals: Deal[];
};

export function PageContact(props: PageContactProps) {
  const form = useForm<Contact>({
    resolver: zodResolver(contactSchema),
    defaultValues: getContact(props.contact),
  });

  const { values, status, onInput, onReset, onSubmit } = useFormState<Contact>(
    form,
    (data) =>
      fetch(`/api/contacts/${props.contact.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      }),
  );

  return (
    <Form {...form}>
      <form
        id="contacts.patch"
        className="h-full overflow-y-auto"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <ContactHeader form={form} values={values} />

        <div className="flex flex-col gap-4 p-4">
          <ContactMetrics {...props} />
          <div className="grid lg:grid-cols-2 gap-4">
            <ContactCardFormUpdate values={values} />
            <CardDeals
              {...props}
              defaultValues={{
                accountId: props.contact.accountId,
                contactIds: [props.contact.id],
              }}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}

function ContactHeader(props: {
  form: UseFormReturn<Contact>;
  values: Signal<Contact>;
}) {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex flex-row items-center justify-between gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={props.values.value.image} />
          <AvatarFallback>
            {props.values.value.name[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="grid gap-2">
          <CardTitle className="text-xl">
            {props.values.value.name}
          </CardTitle>
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <TableRowActions
          row={{ original: props.values.value }}
          resource="contacts"
          actions={["duplicate", "copyId", "remove"]}
        />
        <Button
          form="contacts.patch"
          variant="secondary"
          type="reset"
          disabled={!props.form.formState.isDirty}
        >
          Discard
        </Button>
        <Button
          form="contacts.patch"
          type="submit"
          disabled={!props.form.formState.isDirty}
        >
          {["loading"].includes(props.status.value)
            ? <i className="mdi-loading h-4 w-4 animate-spin" />
            : "Save"}
        </Button>
      </div>
    </header>
  );
}

function ContactMetrics(props: PageContactProps) {
  const metrics = getMetricsContact(props.deals);

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

function getMetricsContact(deals: Deal[]) {
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

function ContactCardFormUpdate(props: { values: Signal<Contact> }) {
  return (
    <CardContent>
      <AutoForm
        values={props.values.value}
        formSchema={contactSchema.pick({
          name: true,
          image: true,
          position: true,
          department: true,
          accountId: true,
          emails: true,
          phones: true,
          links: true,
        })}
        onValuesChange={(v: Contact) => props.values.value = v}
      />
    </CardContent>
  );
}
