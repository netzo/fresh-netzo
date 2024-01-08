import { useState } from "preact/hooks";
import { useForm } from "netzo/deps/react-hook-form.ts";
import { zodResolver } from "netzo/deps/@hookform/resolvers/zod.ts";
import { renderCheckbox } from "netzo/components/blocks/render.tsx";
import { Button } from "netzo/components/ui/button.tsx";
import { Input } from "netzo/components/ui/input.tsx";
import { Checkbox } from "netzo/components/ui/checkbox.tsx";
import {
  RadioGroup,
  RadioGroupItem,
} from "netzo/components/ui/radio-group.tsx";
import { Account, accountSchema } from "@/data/accounts.ts";
import { ALIASES } from "@/data/accounts.ts";
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
  data?: Account;
  url: string;
  method: "POST" | "PATCH";
}

export function FormAccount({ data, method, url }: FormProps) {
  const [defaultValues, setDefaultValues] = useState(data);

  const form = useForm<Account>({
    resolver: zodResolver(accountSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(inputValues: Account) {
    const updatedAt = new Date().toISOString();
    const createdAt = data?.createdAt || updatedAt;
    try {
      await fetch(url, {
        method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...inputValues,
          createdAt,
          updatedAt,
        }),
      });
      window.location.href = "/accounts";
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
          <div className="sticky top-0 flex flex-row justify-between py-5">
            {data && (
              <Button
                variant="secondary"
                type="button"
                onClick={() => form.reset(defaultValues)}
              >
                Reset
              </Button>
            )}
            <Button type="submit">
              {method === "POST" ? "Create" : "Update"}
            </Button>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{ALIASES.name}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{ALIASES.type}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{ALIASES.status}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="active" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Active
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="inactive" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Inactive
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="web"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{ALIASES.web}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{ALIASES.phone}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <fieldset className="p-3 border rounded">
            <legend>Address</legend>
            <FormField
              control={form.control}
              name="address.streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{ALIASES.address.streetAddress}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{ALIASES.address.number}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{ALIASES.address.city}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.postCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{ALIASES.address.postCode}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </fieldset>
          <fieldset className="p-3 border rounded">
            <legend>Notifications</legend>
            <div className="flex flex-col gap-1">
              <FormField
                control={form.control}
                name="notifications.payments"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={renderCheckbox(field.value)}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        {ALIASES.notifications.payments}
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notifications.accounts"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={renderCheckbox(field.value)}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        {ALIASES.notifications.accounts}
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notifications.promotions"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={renderCheckbox(field.value)}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        {ALIASES.notifications.promotions}
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notifications.marketing"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={renderCheckbox(field.value)}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        {ALIASES.notifications.marketing}
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </fieldset>
        </form>
      </Form>
    </>
  );
}