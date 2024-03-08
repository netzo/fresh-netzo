import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "netzo/components/avatar.tsx";
import { TableRowActions } from "netzo/components/blocks/table/table.tsx";
import { Button } from "netzo/components/button.tsx";
import { CardContent, CardTitle } from "netzo/components/card.tsx";
import { Combobox } from "netzo/components/combobox.tsx";
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
import { Input } from "netzo/components/input.tsx";
import { Textarea } from "netzo/components/textarea.tsx";
import { cn } from "netzo/components/utils.ts";
import type { Account } from "../data/accounts.ts";
import type { Contact } from "../data/contacts.ts";
import { Deal, dealSchema, getDeal } from "../data/deals.ts";
import { I18N } from "../data/mod.ts";
import { GROUPS } from "./deals.tsx";

type PageDealProps = {
  id: string;
  deal: Deal;
  deals: Deal[];
  accounts: Account[];
  contacts: Contact[];
};

export function PageDeal(props: PageDealProps) {
  const form = useForm<Deal>({
    resolver: zodResolver(dealSchema),
    defaultValues: getDeal(props.deal),
  });

  const onSubmit = async (data: Deal) => {
    const response = await fetch(`/api/deals/${props.deal.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(getDeal(data)),
    });
    if (response.ok) globalThis.location.reload();
  };

  return (
    <Form {...form}>
      <form
        id="deals.patch"
        className="h-full overflow-y-auto"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <DealHeader form={form} />

        <div className="flex flex-col gap-4 p-4">
          <DealStatusStepper {...props} form={form} />
          <div className="grid lg:grid-cols-2 gap-4">
            <DealCardFormUpdate {...props} form={form} />
          </div>
        </div>
      </form>
    </Form>
  );
}

function DealHeader(props: { form: UseFormReturn<Deal> }) {
  const original = props.form.getValues();
  const { name, image } = original;
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex flex-row items-center justify-between gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={image} />
          <AvatarFallback>
            {name?.[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="grid gap-2">
          <CardTitle className="text-xl">
            {name}
          </CardTitle>
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <TableRowActions
          row={{ original }}
          resource="deals"
          actions={["duplicate", "copyId", "remove"]}
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

function DealStatusStepper(
  props: PageDealProps & { form: UseFormReturn<Deal> },
) {
  const { status } = props.form.getValues();
  const onSelect = (status: string) => {
    const config = { shouldDirty: true, shouldTouch: true };
    props.form.setValue("status", status, config);
  };
  return (
    <ol
      className={cn(
        "my-6 mb-4 mx-6",
        "flex justify-around gap-6 border-l-0 border-t",
      )}
    >
      {GROUPS.map((group) => (
        <li className="-mt-[14px]">
          <div
            className={cn(
              "block items-center pt-0 text-center",
              "hover:cursor-pointer hover:font-semibold",
            )}
            onClick={() => onSelect(group.id)}
          >
            <i
              {...group.icon}
              className={cn(
                "rounded-full h-[24px] w-[24px] ml-0 mr-0",
                status === group.id ? group.badge.className : "",
                group.icon.className,
                status !== group.id &&
                  "!bg-gray-200 dark:!bg-gray-700",
              )}
            />
            <h5
              className={cn(
                "mt-2 text-sm",
                status === group.id
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
  { form, ...props }: PageDealProps & { form: UseFormReturn<Deal> },
) {
  const toOptions = ({ id, name }): Option => ({ value: id, label: name });
  const accountOptions = props.accounts.map(toOptions);
  const contactOptions = props.contacts.map(toOptions);

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
  );
}
