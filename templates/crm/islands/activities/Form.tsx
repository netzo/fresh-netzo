import { useState } from "preact/hooks";
import { useForm } from "netzo/deps/react-hook-form.ts";
import { zodResolver } from "netzo/deps/@hookform/resolvers/zod.ts";
import { Button } from "netzo/components/ui/button.tsx";
import { Input } from "netzo/components/ui/input.tsx";
import { Switch } from "netzo/components/ui/switch.tsx";
import {
  Activity,
  activitySchema,
} from "@/components/tables/activities/data/schema.ts";
import { aliases } from "@/components/tables/activities/data/options.tsx";

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
  data?: Activity;
  url: string;
  method: "POST" | "PATCH";
}

export function FormActivity({ data, method, url }: FormProps) {
  const [defaultValues, setDefaultValues] = useState(data);

  const form = useForm<Activity>({
    resolver: zodResolver(activitySchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(inputValues: Activity) {
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
      window.location.href = "/activities";
    } catch (error) {
      console.error(error);
    }
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
          <fieldset className="p-3 border rounded">
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
            name="activityId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{aliases.activityId}</FormLabel>
                <div className="flex justify-between">
                  <FormDescription>
                    Write the ID of the activity
                  </FormDescription>
                  <a
                    href="/activities"
                    className="text-[hsl(var(--primary))] text-xs"
                  >
                    See activities
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
