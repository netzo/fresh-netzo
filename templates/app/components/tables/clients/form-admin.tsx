import { useState } from "preact/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { renderFormCheckbox } from "@/utils.tsx";
import { handleFormSubmit } from "@/utils.tsx";
import { Button } from "netzo/components/ui/button.tsx";
import { Input } from "netzo/components/ui/input.tsx";
import { Checkbox } from "netzo/components/ui/checkbox.tsx";
import {
  RadioGroup,
  RadioGroupItem,
} from "netzo/components/ui/radio-group.tsx";
import {
  Client,
  clientSchema,
} from "@/components/tables/clients/data/schema.ts";
import { aliases } from "@/components/tables/clients/data/options.tsx";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "netzo/components/ui/form.tsx";

interface FormAdminProps {
  data?: Client;
  ids?: string[];
}

export function FormAdmin({ data, ids }: FormAdminProps) {
  const [defaultValues, setDefaultValues] = useState(data);

  const form = useForm<Client>({
    resolver: zodResolver(clientSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(inputValues: Client) {
    delete inputValues.client;
    console.log(inputValues);

    handleFormSubmit(
      "clients",
      inputValues,
      data,
      ids,
    );
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
                <FormLabel>{aliases.name}</FormLabel>
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
                <FormLabel>{aliases.type}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{aliases.status}</FormLabel>
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="web"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{aliases.web}</FormLabel>
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

          <fieldset className="border border-solid border-gray-400 rounded p-3">
            <legend>Address</legend>
            <FormField
              control={form.control}
              name="address.streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{aliases.address.streetAddress}</FormLabel>
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
                  <FormLabel>{aliases.address.number}</FormLabel>
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
                  <FormLabel>{aliases.address.city}</FormLabel>
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
                  <FormLabel>{aliases.address.postCode}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </fieldset>
          <fieldset className="border border-solid border-gray-400 rounded p-3">
            <legend>Notifications</legend>
            <div className="flex flex-col gap-1">
              <FormField
                control={form.control}
                name="notifications.payments"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={renderFormCheckbox(field.value)}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        {aliases.notifications.payments}
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notifications.invoices"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={renderFormCheckbox(field.value)}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        {aliases.notifications.invoices}
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
                        checked={renderFormCheckbox(field.value)}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        {aliases.notifications.promotions}
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
                        checked={renderFormCheckbox(field.value)}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        {aliases.notifications.marketing}
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </fieldset>
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
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
