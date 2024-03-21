import { useSignal } from "@preact/signals";
import { Badge } from "netzo/components/badge.tsx";
import {
  TableActionsReload,
  TableFilters,
  TablePagination,
  TableRowActions,
  TableSearch,
  TableView,
  useTable,
} from "netzo/components/blocks/table/table.tsx";
import { Button } from "netzo/components/button.tsx";
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
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "netzo/components/resizable.tsx";
import { type Option } from "netzo/components/select-multiple.tsx";
import { Separator } from "netzo/components/separator.tsx";
import { Textarea } from "netzo/components/textarea.tsx";
import { cn } from "netzo/components/utils.ts";
import type { Account } from "../data/accounts.ts";
import {
  type Activity,
  activitySchema,
  getActivity,
} from "../data/activities.ts";
import type { Contact } from "../data/contacts.ts";
import type { Deal } from "../data/deals.ts";
import { I18N, toDateTime } from "../data/mod.ts";

const defaultLayout = [50, 50];

export function PageActivities(props: {
  activity: Activity;
  accounts: Account[];
  contacts: Contact[];
  deals: Deal[];
  activities: Activity[];
}) {
  const activity = useSignal(props.activity);

  const width = globalThis?.innerWidth; // const { width = 0 } = useWindowSize(); causes unnecessary re-renders

  const table = useTable<Activity>(props.activities, {
    endpoint: "/api/activities",
    idField: "id",
    search: {
      column: "name",
      placeholder: "Search by name...",
    },
    sorting: [
      { id: "updatedAt", desc: false },
      { id: "name", desc: true },
    ],
    filters: [
      {
        column: "type",
        title: I18N.type,
        options: [...new Set(props.activities.map((item) => item.type).flat())]
          .sort()
          .map((
            value,
          ) => (value
            ? { label: I18N[`type.${value}`], value }
            : { label: "*no data", value: "" })
          ),
      },
      {
        column: "accountIds",
        title: I18N.accountIds,
        options: props.accounts
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((
            { id, name },
          ) => (id
            ? { label: name, value: id }
            : { label: "*no data", value: "" })
          ),
      },
    ],
    // IMPORTANT: columns are required for search and filters
    columns: [
      {
        id: "name",
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },
      {
        accessorKey: "type",
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },
      {
        accessorKey: "accountIds",
        filterFn: (row, id, value) =>
          value.some((v) => row.getValue(id).includes(v)),
      },
    ],
  });

  const onClickSelect = (value: Activity) => activity.value = value;

  const onClickCreate = async () => {
    const name = globalThis.prompt("Enter activity name");
    if (name) {
      const response = await fetch(`/api/activities`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(getActivity({ name })),
      });
      if (response.ok) {
        const data = await response.json();
        globalThis.location.href = "/activities"; // `/activities/${props.id}`;
      }
    }
  };

  return (
    <ResizablePanelGroup
      direction={(!width || width > 768) ? "horizontal" : "vertical"}
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        minSize={30}
        className="flex flex-col h-screen"
      >
        <header className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1 space-x-2">
              <TableActionsReload table={table} />
              <TableSearch table={table} />
            </div>
            <div className="flex items-center space-x-2">
              <Button className="ml-2" onClick={onClickCreate}>
                Create
              </Button>
            </div>
          </div>
          <div className="flex items-center flex-1 space-x-2">
            <TableFilters table={table} />
          </div>
        </header>

        <Separator />

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <TableView table={table}>
                {(table) =>
                  table.getRowModel().rows?.length
                    ? table.getRowModel().rows.map((row) => (
                      <div
                        key={`activities-${row.original.id}`}
                        className={cn(
                          "space-y-2 rounded-lg border p-3 text-sm hover:bg-accent hover:cursor-pointer",
                          activity.value.id === row.original.id &&
                            "bg-muted",
                        )}
                        onClick={() => onClickSelect(row.original)}
                      >
                        <div className="flex gap-4 items-center pb-2">
                          <h4 className="font-semibold line-clamp-1">
                            {row.original.name}
                          </h4>
                          <span
                            className={cn(
                              "ml-auto text-xs min-w-fit",
                              activity.value.id === row.original.id
                                ? "text-foreground"
                                : "text-muted-foreground",
                            )}
                          >
                            {toDateTime(row.original.updatedAt)}
                          </span>
                        </div>
                        <p className="line-clamp-2 text-xs text-muted-foreground">
                          {row.original.notes.substring(0, 300)}
                        </p>
                        <div className="flex gap-2">
                          <ActivityIcon type={row.original.type} />
                          {row.original.accountIds.map((id: string) => (
                            <Badge variant="secondary">
                              {props.accounts.find((account) =>
                                account.id === id
                              )?.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))
                    : (
                      <div className="grid place-items-center h-full w-full">
                        No results.
                      </div>
                    )}
              </TableView>
            </div>
          </div>
        </div>

        <footer className="flex items-center justify-between p-4">
          <TablePagination table={table} />
        </footer>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={defaultLayout[1]}>
        <div className="grid h-full overflow-y-auto">
          <FormUpdate
            {...props}
            key={activity.value.id}
            activity={activity.value}
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

function FormUpdate(props: {
  activity: Activity;
  accounts: Account[];
  contacts: Contact[];
  deals: Deal[];
  activities: Activity[];
}) {
  const form = useForm<Activity>({
    resolver: zodResolver(activitySchema),
    defaultValues: getActivity(props.activity),
  });

  const onSubmit = async (data: Activity) => {
    const response = await fetch(`/api/activities/${props.activity.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(getActivity(data)),
    });

    if (response.ok) globalThis.location.reload();
  };

  const toOptions = ({ id, name }): Option => ({ value: id, label: name });
  const accountOptions = props.accounts.map(toOptions);
  const contactOptions = props.contacts.map(toOptions);
  const dealOptions = props.deals.map(toOptions);

  return (
    <Form {...form}>
      <form
        id="activities.patch"
        className="space-y-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <header className="flex items-center justify-between p-4">
          <div className="flex items-center flex-1 space-x-2">
            <h3 className="text-lg font-semibold line-clamp-1 mr-4">
              {props.activity.name}
            </h3>
            <ActivityIcon type={props.activity.type} />
          </div>
          <div className="flex items-center space-x-2">
            <TableRowActions
              row={{ original: form.getValues() }}
              endpoint="/api/activities"
            />
            <Button
              form="activities.patch"
              variant="secondary"
              type="reset"
              disabled={!form.formState.isDirty}
            >
              Discard
            </Button>
            <Button
              form="activities.patch"
              type="submit"
              disabled={!form.formState.isDirty}
            >
              {form.formState.isLoading
                ? <i className="mdi-loading h-4 w-4 animate-spin" />
                : "Save"}
            </Button>
          </div>
        </header>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-6 px-4">
              <FormLabel className="w-[100px]">{I18N["name"]}</FormLabel>
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
            <FormItem className="flex items-center space-x-6 px-4">
              <FormLabel className="w-[100px]">{I18N["type"]}</FormLabel>
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
            <FormItem className="flex items-center space-x-6 px-4">
              <FormLabel className="w-[100px]">{I18N["accountIds"]}</FormLabel>
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
            <FormItem className="flex items-center space-x-6 px-4">
              <FormLabel className="w-[100px]">{I18N["contactIds"]}</FormLabel>
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
            <FormItem className="flex items-center space-x-6 px-4">
              <FormLabel className="w-[100px]">{I18N["dealIds"]}</FormLabel>
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
          name="notes"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-6 px-4">
              <FormLabel className="w-[100px]">{I18N["notes"]}</FormLabel>
              <FormControl>
                <Textarea {...field} rows="20" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

function ActivityIcon({ type }: { type: string }) {
  const props = ({
    email: {
      icon: "mdi-email",
      text: "Email",
      className: `bg-red hover:bg-red bg-opacity-80 text-white`,
    },
    call: {
      icon: "mdi-phone",
      text: "Call",
      className: `bg-purple hover:bg-purple bg-opacity-80 text-white`,
    },
    videocall: {
      icon: "mdi-video",
      text: "Videocall",
      className: `bg-purple hover:bg-purple bg-opacity-80 text-white`,
    },
    meeting: {
      icon: "mdi-account-group",
      text: "Meeting",
      className: `bg-yellow hover:bg-yellow bg-opacity-80 text-white`,
    },
    "whatsapp": {
      icon: "mdi-whatsapp",
      text: "WhatsApp",
      className: `bg-green hover:bg-green bg-opacity-80 text-white`,
    },
    "livechat": {
      icon: "mdi-chat",
      text: "Livechat",
      className: `bg-green hover:bg-green bg-opacity-80 text-white`,
    },
    "facebook": {
      icon: "mdi-facebook",
      text: "Facebook",
      className: `bg-blue hover:bg-blue bg-opacity-80 text-white`,
    },
    "instagram": {
      icon: "mdi-instagram",
      text: "Instagram",
      className: `bg-blue hover:bg-blue bg-opacity-80 text-white`,
    },
    "linkedin": {
      icon: "mdi-linkedin",
      text: "LinkedIn",
      className: `bg-blue hover:bg-blue bg-opacity-80 text-white`,
    },
    "twitter": {
      icon: "mdi-twitter",
      text: "Twitter",
      className: `bg-blue hover:bg-blue bg-opacity-80 text-white`,
    },
    other: {
      icon: "mdi-help",
      text: "Other",
      className: `bg-gray hover:bg-gray bg-opacity-80 text-white`,
    },
  })?.[type];

  return (
    <Badge variant="default" className={`${props.className}`}>
      <i className={`${props.icon} mr-1`} />
      {props.text}
    </Badge>
  );
}
