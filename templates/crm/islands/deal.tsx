import { useSignal } from "@preact/signals";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "netzo/components/avatar.tsx";
import { TableRowActions } from "netzo/components/blocks/table/table.tsx";
import { Button } from "netzo/components/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "netzo/components/card.tsx";
import { Combobox } from "netzo/components/combobox.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
  zodResolver,
} from "netzo/components/form.tsx";
import { Input } from "netzo/components/input.tsx";
import { type Option } from "netzo/components/select-multiple.tsx";
import { Textarea } from "netzo/components/textarea.tsx";
import { cn } from "netzo/components/utils.ts";
import type { Account } from "netzo/data/accounts.ts";
import type { Contact } from "netzo/data/contacts.ts";
import { Deal, dealSchema, getDeal } from "../data/deals.ts";
import { I18N } from "../data/mod.ts";
import { GROUPS } from "./deals.tsx";

export function PageDeal(props: {
  id: string;
  deal: Deal;
  deals: Deal[];
  accounts: Account[];
  contacts: Contact[];
}) {
  return (
    <div className="h-full overflow-y-auto">
      <DealHeader deal={props.deal} />
      <div className="flex flex-col gap-4 p-4">
        <DealStatusStepper deal={props.deal} deals={props.deals} />
        <div className="grid lg:grid-cols-2 gap-4">
          <DealCardFormUpdate
            deal={props.deal}
            accounts={props.accounts}
            contacts={props.contacts}
          />
        </div>
      </div>
    </div>
  );
}

function DealHeader(props: { deal: Deal }) {
  const { name = "", image, email, phone } = props.deal;
  const [first = "", last = ""] = name.split(" ");
  const initials = `${first[0]}${last[0]}`?.toUpperCase();

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
          row={{ original: props.deal }}
          resource="deals"
          actions={["duplicate", "copyId", "remove"]}
        />
      </div>
    </header>
  );
}

function DealStatusStepper(props: { deal: Deal; deals: Deal[] }) {
  return (
    <ol
      className={cn(
        "my-6 mb-4 mx-6",
        "flex justify-around gap-6 border-l-0 border-t",
      )}
    >
      {GROUPS.map((group) => (
        <li className="-mt-[14px]">
          <div className="block items-center pt-0 text-center">
            <i
              {...group.icon}
              className={cn(
                "rounded-full h-[24px] w-[24px] ml-0 mr-0",
                props.deal.status === group.id ? group.badge.className : "",
                group.icon.className,
                props.deal.status !== group.id &&
                  "!bg-gray-200 dark:!bg-gray-700",
              )}
            />
            <h5
              className={cn(
                "mt-2 text-sm",
                props.deal.status === group.id
                  ? "text-primary-500 dark:text-primary-300 font-semibold"
                  : "text-neutral-500 dark:text-neutral-300",
              )}
            >
              {group.title}
            </h5>
          </div>
        </li>
      ))}
    </ol>
  );
}

function DealCardFormUpdate(
  props: {
    deal: Deal;
    accounts: Account[];
    contacts: Contact[];
  },
) {
  const status = useSignal<"disabled" | "loading">("disabled");

  const form = useForm<Deal>({
    resolver: zodResolver(dealSchema),
    defaultValues: getDeal(props.deal),
  });

  const toOptions = ({ id, name }): Option => ({ value: id, label: name });
  const accountOptions = props.accounts.map(toOptions);
  const contactOptions = props.contacts.map(toOptions);

  const onSubmit = async (data: Deal) => {
    status.value = "loading";
    await fetch(`/api/deals/${data.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    setTimeout(() => status.value = "disabled", 500);
  };

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pt-2">
            <CardTitle>
              General
            </CardTitle>
            <Button type="submit" className="ml-auto">
              {["loading"].includes(status.value)
                ? <i className="mdi-loading h-4 w-4 animate-spin" />
                : "Save"}
            </Button>
          </CardHeader>
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
            <FormField
              control={form.control}
              name="accountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{I18N["accountId"]}</FormLabel>
                  <FormControl>
                    <Combobox {...field} options={accountOptions} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{I18N["contactIds"]}</FormLabel>
                  <FormControl>
                    <Combobox
                      {...field}
                      multiple="true"
                      options={contactOptions}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
