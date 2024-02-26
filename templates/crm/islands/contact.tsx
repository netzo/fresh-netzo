import { useSignal } from "@preact/signals";
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "netzo/components/dialog.tsx";
import { useForm, zodResolver } from "netzo/components/form.tsx";
import { ContactDeals } from "../components/contact.deals.tsx";
import { Contact, contactSchema } from "../data/contacts.ts";
import { Deal, dealSchema } from "../data/deals.ts";
import { toPercent, toUSD } from "../data/mod.ts";

export function ContactHeader(props: { contact: Contact }) {
  const { name = "", image, email, phone } = props.contact;
  const [first = "", last = ""] = name.split(" ");
  const initials = `${first[0]}${last[0]}`?.toUpperCase();

  const onClickDelete = async () => {
    if (confirm("Are you sure you want to delete this contact?")) {
      await fetch(`/api/contacts/${props.contact.id}`, {
        method: "DELETE",
      });
      globalThis.location.href = "/contacts";
    }
  };

  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex flex-row items-center justify-between gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={image} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="grid gap-2">
          <CardTitle className="text-xl">
            {name}
          </CardTitle>
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <TableRowActions
          row={{ original: props.contact }}
          resource="contacts"
          actions={["duplicate", "copyId", "delete"]}
        />
      </div>
    </header>
  );
}

export function ContactMetrics(props: { contact: Contact; deals: Deal[] }) {
  const metrics = resolveContactMetrics(props.deals);

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

function resolveContactMetrics(deals: Deal[]) {
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

export function ContactCardForm(props: { contact: Contact }) {
  const contact = useSignal(props.contact);
  const status = useSignal<"disabled" | "enabled" | "loading">("disabled");

  const form = useForm<Contact>({
    resolver: zodResolver(contactSchema),
    defaultValues: contact.value,
  });

  const onValuesChange = (values: Contact) => {
    if (!["enabled"].includes(status.value)) status.value = "enabled";
    contact.value = values;
  };

  const onClickUpdate = async () => {
    status.value = "loading";
    try {
      // ✅ This will be type-safe and validated.
      await fetch(`/api/contacts/${contact.value.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(contact.value),
      });
      setTimeout(() => status.value = "disabled", 1000);
    } catch (error) {
      setTimeout(() => status.value = "enabled", 1000);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pt-2">
        <CardTitle>
          General
        </CardTitle>
        <Button
          variant="default"
          size="sm"
          disabled={status.value === "disabled"}
          onClick={onClickUpdate}
        >
          {["loading"].includes(status.value)
            ? <i className="mdi-loading h-4 w-4 animate-spin" />
            : "Update"}
        </Button>
      </CardHeader>
      <CardContent>
        <AutoForm
          values={contact.value}
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
          onValuesChange={onValuesChange}
        />
      </CardContent>
    </Card>
  );
}

export function ContactCardDeals(props: { contact: Contact; deals: Deal[] }) {
  const deal = useSignal<Partial<Deal>>({
    name: "",
    notes: [],
    status: "lead",
    amount: 0,
    currencyCode: "USD",
    contactId: props.contact.id,
    contactIds: [],
    userIds: [],
  });
  const status = useSignal<"disabled" | "enabled" | "loading">("disabled");

  const form = useForm<Deal>({
    resolver: zodResolver(dealSchema),
    defaultValues: deal.value,
  });

  const onValuesChange = (values: Deal) => {
    if (!["enabled"].includes(status.value)) status.value = "enabled";
    deal.value = values;
  };

  const onClickCreate = async () => {
    status.value = "loading";
    try {
      // ✅ This will be type-safe and validated.
      await fetch(`/api/deals`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(deal.value),
      });
      setTimeout(() => status.value = "disabled", 1000);
      globalThis.location.reload();
    } catch (error) {
      setTimeout(() => status.value = "enabled", 1000);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pt-2">
        <CardTitle>
          Contact Deals
        </CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" size="sm" className="ml-2">
              Create Deal
            </Button>
          </DialogTrigger>
          <DialogContent className="h-[calc(100%-70px)] overflow-y-auto">
            <DialogHeader className="text-left">
              <DialogTitle>Create Deal</DialogTitle>
            </DialogHeader>
            <AutoForm
              values={deal.value}
              formSchema={dealSchema.pick({
                name: true,
                status: true,
                amount: true,
              })}
              onValuesChange={onValuesChange}
            />
            <DialogFooter>
              <Button
                variant="default"
                disabled={status.value === "disabled"}
                onClick={onClickCreate}
              >
                {["loading"].includes(status.value)
                  ? <i className="mdi-loading h-4 w-4 animate-spin" />
                  : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <ContactDeals deals={props.deals} />
      </CardContent>
    </Card>
  );
}
