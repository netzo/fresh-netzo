import { FetchForm } from "netzo/components/blocks/fetch-form/fetch-form.tsx";
import { Button } from "netzo/components/button.tsx";
import { Combobox } from "netzo/components/combobox.tsx";
import {
  Dialog,
  DialogContent,
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
  zodResolver,
} from "netzo/components/form.tsx";
import { Input } from "netzo/components/input.tsx";
import { type Option } from "netzo/components/select-multiple.tsx";
import type { Account } from "netzo/data/accounts.ts";
import type { Contact } from "netzo/data/contacts.ts";
import type { User } from "netzo/data/users.ts";
import { Deal } from "../data/deals.ts";
import { type Event, eventSchema } from "../data/events.ts";
import { I18N } from "../data/mod.ts";

export function EventsFormCreate(
  props: {
    event: Event;
    accounts: Account[];
    contacts: Contact[];
    deals: Deal[];
    events: Event[];
    users: User[];
  },
) {
  const form = useForm<Event>({
    resolver: zodResolver(eventSchema),
    defaultValues: eventSchema.parse(props.event ?? {}), // sets default values
  });

  const toOptions = ({ id, name }): Option => ({ value: id, label: name });
  const accountOptions = props.accounts.map(toOptions);
  const contactOptions = props.contacts.map(toOptions);
  const dealOptions = props.deals.map(toOptions);
  const userOptions = props.users.map(toOptions);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="ml-2">Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-left">
          <DialogTitle>Create New</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <FetchForm
            id="events.create"
            action={`/api/events/${props.event.id}`}
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{I18N["type"]}</FormLabel>
                  <FormControl>
                    <Combobox
                      {...field}
                      options={[
                        "email",
                        "call",
                        "videocall",
                        "meeting",
                        "whatsapp",
                        "livechat",
                        "facebook",
                        "instagram",
                        "linkedin",
                        "twitter",
                        "other",
                      ].map((value) => ({
                        label: I18N[`type.${value}`],
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
              name="accountIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{I18N["accountIds"]}</FormLabel>
                  <FormControl>
                    <Combobox
                      {...field}
                      multiple="true"
                      options={accountOptions}
                    />
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
              name="dealIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{I18N["dealIds"]}</FormLabel>
                  <FormControl>
                    <Combobox
                      {...field}
                      multiple="true"
                      options={dealOptions}
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
      </DialogContent>
    </Dialog>
  );
}
