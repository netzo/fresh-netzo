import { useState } from "preact/hooks";
import { useForm } from "netzo/deps/react-hook-form.ts";
import { zodResolver } from "netzo/deps/@hookform/resolvers/zod.ts";
import { Button } from "netzo/components/ui/button.tsx";
import { Input } from "netzo/components/ui/input.tsx";
import { Checkbox } from "netzo/components/ui/checkbox.tsx";
import { Switch } from "netzo/components/ui/switch.tsx";
import { renderFormCheckbox } from "@/utils.tsx";
import {
  Contact,
  contactSchema,
} from "@/components/tables/contacts/data/schema.ts";
import { aliases } from "@/components/tables/contacts/data/options.tsx";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "netzo/components/ui/select.tsx";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "netzo/components/ui/form.tsx";

interface FormProps {
  data?: Contact;
  url: string;
}

export function FormContact({ data, url }: FormProps) {
  const [defaultValues, setDefaultValues] = useState(data);

  const form = useForm<Contact>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(inputValues: Contact) {
    await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputValues),
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{aliases.id}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Created automatically"
                    disabled
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {aliases.name}
                </FormLabel>
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
                <FormLabel>{aliases.email}</FormLabel>
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
                <FormLabel>{aliases.phone}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <fieldset className="p-3 border border-gray-400 border-solid rounded">
            <legend>Notifications</legend>
            <FormField
              control={form.control}
              name="notifications.new"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm">
                      {aliases.notifications.new}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notifications.promotions"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm">
                      {aliases.notifications.promotions}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notifications.marketing"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm">
                      {aliases.notifications.marketing}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </fieldset>

          <FormField
            control={form.control}
            name="contactId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{aliases.contactId}</FormLabel>
                <div className="flex justify-between">
                  <FormDescription>
                    Write the ID of the contact
                  </FormDescription>
                  <a
                    href="/contacts"
                    className="text-[hsl(var(--primary))] text-xs"
                  >
                    See contacts
                  </a>
                </div>
                <FormControl>
                  <Input
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{aliases.avatar}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="createdAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{aliases.createdAt}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Created automatically"
                    disabled
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="updatedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{aliases.updatedAt}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Created automatically"
                    disabled
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row justify-between pt-5">
            {data && (
              <Button
                variant="secondary"
                type="button"
                onClick={() => form.reset(defaultValues)}
              >
                Reset
              </Button>
            )}
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
