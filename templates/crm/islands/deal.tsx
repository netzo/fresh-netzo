import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "netzo/components/avatar.tsx";
import { FetchForm } from "netzo/components/blocks/fetch-form/fetch-form.tsx";
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
import type { Account } from "netzo/data/accounts.ts";
import type { Contact } from "netzo/data/contacts.ts";
import type { User } from "netzo/data/users.ts";
import { Deal, dealSchema } from "../data/deals.ts";
import { I18N } from "../data/mod.ts";

export function DealHeader(props: { deal: Deal }) {
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

export function DealCardForm(
  props: {
    deal: Deal;
    accounts: Account[];
    contacts: Contact[];
    users: User[];
  },
) {
  const form = useForm<Deal>({
    resolver: zodResolver(dealSchema),
    defaultValues: dealSchema.parse(props.deal), // sets default values
  });

  const toOptions = ({ id, name }): Option => ({ value: id, label: name });
  const accountOptions = props.accounts.map(toOptions);
  const contactOptions = props.contacts.map(toOptions);
  const userOptions = props.users.map(toOptions);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pt-2">
        <CardTitle>
          General
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <FetchForm
            id="deals.patch"
            action={`/api/deals/${props.deal.id}`}
            method="patch"
            className="space-y-8"
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
            <FormField
              control={form.control}
              name="userIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{I18N["userIds"]}</FormLabel>
                  <FormControl>
                    <Combobox
                      {...field}
                      multiple="true"
                      options={userOptions}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="default"
              size="sm"
              type="submit"
              form="deals.patch"
            >
              Update
            </Button>
          </FetchForm>
        </Form>
      </CardContent>
    </Card>
  );
}
