import { type Signal, useSignal } from "@preact/signals";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "netzo/components/avatar.tsx";
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
import { ContactDeals } from "../components/contact.deals.tsx";
import { Contact, contactSchema } from "../data/contacts.ts";
import type { Deal } from "../data/deals.ts";
import { Notes } from "./notes.tsx";

export function Contact(
  props: { id: string; contact: Contact; deals: Deal[] },
) {
  const values = useSignal(props.contact ?? { id: props.id });

  return (
    <div className="px-4">
      <ContactHeader values={values} />
      <Tabs defaultValue="overview">
        <TabsList variant="outline">
          <TabsTrigger value="overview" variant="outline">Overview</TabsTrigger>
          <TabsTrigger value="notes" variant="outline">Notes</TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="overview">
          <ContactOverview values={values} deals={props.deals} />
        </TabsContent>
        <TabsContent value="notes">
          <Notes data={values.value?.notes ?? []} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ContactHeader(props: { values: Signal<Contact> }) {
  const isLoading = useSignal(false);

  const { name = "", image, email, phone } = props.values.value;
  const [first = "", last = ""] = name.split(" ");
  const initials = `${first[0]}${last[0]}`?.toUpperCase();

  const onClickDelete = async () => {
    if (confirm("Are you sure you want to delete this contact?")) {
      isLoading.value = true;
      await fetch(`/api/contacts/${props.values.value.id}`, {
        method: "DELETE",
      });
      isLoading.value = false;
      window.location.href = "/contacts";
    }
  };

  const onSubmit = async () => {
    e.preventDefault();
    isLoading.value.value = true;
    // ✅ This will be type-safe and validated.
    await fetch(`/api/contacts/${props.values.value.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(props.values.value),
    });
    isLoading.value = false;
  };

  return (
    <header className="flex items-center justify-between py-4 px-2">
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

function ContactOverview(props: { values: Signal<Contact>; deals: Deal[] }) {
  const form = useForm<Contact>({
    resolver: zodResolver(contactSchema),
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
              onValuesChange={(value) => props.values.value = value}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              Contact Deals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ContactDeals deals={props.deals} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
