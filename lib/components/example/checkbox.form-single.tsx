import { zodResolver } from "../../deps/@hookform/resolvers/zod.ts";
import { useForm } from "../../deps/react-hook-form.ts";
import * as z from "../../deps/zod/mod.ts";

import { Button } from "../ui/button.tsx";
import { Checkbox } from "../ui/checkbox.tsx";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form.tsx";
import { toast } from "../ui/use-toast.ts";

const FormSchema = z.object({
  mobile: z.boolean().default(false).optional(),
});

export default () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mobile: true,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Use different settings for my mobile devices
                </FormLabel>
                <FormDescription>
                  You can manage your mobile notifications in the{" "}
                  <a href="/examples/forms">mobile settings</a> page.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
