import { useState } from "preact/hooks";
import { useForm } from "netzo/deps/react-hook-form.ts";
import { zodResolver } from "netzo/deps/@hookform/resolvers/zod.ts";
import { Button } from "netzo/components/ui/button.tsx";
import { Input } from "netzo/components/ui/input.tsx";
import { Textarea } from "netzo/components/ui/textarea.tsx";
import { Invoice, invoiceSchema } from "@/data/invoices.ts";
import { ALIASES } from "@/data/invoices.ts";
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
import { CalendarIcon } from "netzo/deps/@radix-ui/react-icons.ts";
import { format } from "netzo/deps/date-fns.ts";
import { cn } from "netzo/components/utils.ts";
import { Calendar } from "netzo/components/ui/calendar.tsx";

interface FormProps {
  data?: Invoice;
  method: "POST" | "PATCH";
  url: string;
}

export function FormInvoice({ data, method, url }: FormProps) {
  const [defaultValues, setDefaultValues] = useState(data);
  const [showCalendar, setShowCalendar] = useState(false);

  const form = useForm<Invoice>({
    resolver: zodResolver(invoiceSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(inputValues: Invoice) {
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
            name="invoiceNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {ALIASES.invoiceNumber}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{ALIASES.description}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Invoice description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{ALIASES.dueDate}</FormLabel>
                <FormControl>
                  <Button
                    type="button"
                    onClick={() => setShowCalendar(!showCalendar)}
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value
                      ? (
                        format(new Date(field.value), "PP")
                      )
                      : <span>Pick a date</span>}
                    <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                  </Button>
                </FormControl>
                {showCalendar &&
                  (
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date.toISOString());
                        setShowCalendar(false); // Close the calendar when a date is selected
                      }}
                      initialFocus
                    />
                  )}
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{ALIASES.status}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={data ? field.value : undefined}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pending">pending</SelectItem>
                    <SelectItem value="paid">paid</SelectItem>
                    <SelectItem value="cancelled">cancelled</SelectItem>
                    <SelectItem value={undefined}>No selection</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subtotal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {ALIASES.subtotal}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {ALIASES.tax}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="total"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {ALIASES.total}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="invoiceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{ALIASES.invoiceId}</FormLabel>
                <div className="flex justify-between">
                  <FormDescription>
                    Write the ID of the invoice
                  </FormDescription>
                  <a
                    href="/invoices"
                    className="text-[hsl(var(--primary))] text-xs"
                  >
                    See invoices
                  </a>
                </div>
                <FormControl>
                  <Input
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
}
