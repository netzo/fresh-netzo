import { type Signal, useSignal } from "@preact/signals";
import { Badge } from "netzo/components/badge.tsx";
import {
  type Table,
  TableActionsReload,
  TableFilters,
  TablePagination,
  TableRowActions,
  TableSearch,
  TableView,
  useTable,
} from "netzo/components/blocks/table/table.tsx";
import { Button } from "netzo/components/button.tsx";
import {
  FormFieldCombobox,
  FormFieldInput,
  FormFieldSelectMultiple,
  FormFieldTextarea,
} from "netzo/components/form-fields.tsx";
import { Form, useForm } from "netzo/components/form.tsx";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "netzo/components/resizable.tsx";
import { cn } from "netzo/components/utils.ts";
import { useState } from "preact/hooks";
import type { Account } from "../data/accounts.ts";
import { type Activity, getActivity } from "../data/activities.ts";
import type { Contact } from "../data/contacts.ts";
import type { Deal } from "../data/deals.ts";
import { I18N, toDateTime } from "../data/mod.ts";

const defaultLayout = [50, 50];

export function PageActivities(props: {
  activities: Activity[];
  activity: Activity;
  accounts: Account[];
  contacts: Contact[];
  deals: Deal[];
}) {
  const [data, setData] = useState<Activity[]>(props.activities ?? []);
  const activity = useSignal<Activity>(props.activity ?? getActivity());

  const width = globalThis?.innerWidth; // const { width = 0 } = useWindowSize(); causes unnecessary re-renders

  const toOptions = ({ id, name }) => ({ value: id, label: name });

  const table = useTable<Activity>({
    data,
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
    meta: {
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
          options: [
            ...new Set(props.activities.map((item) => item.type).flat()),
          ]
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
      select: (value: Activity) => activity.value = value,
      create: async () => {
        const name = globalThis.prompt("Enter activity name");
        if (name) {
          const response = await fetch("/api/activities", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(getActivity({ name })),
          });
          if (response.ok) {
            const result = await response.json();
            setData([result, ...data]);
            activity.value = result;
            return result;
          }
        }
      },
      update: async (value: Activity) => {
        const response = await fetch(`/api/activities/${value.id}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(value),
        });
        const result = await response.json();
        activity.value = result;
        setData(data.map((value) => value.id === result.id ? result : value));
        return result;
      },
      remove: async ({ id }: Activity) => {
        const response = await fetch(`/api/activities/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          const result = await response.json();
          setData(data.filter((value) => value.id !== id));
          activity.value = undefined;
          return result;
          // if (globalThis.location.href.includes(`/${id}`)) {
          //   globalThis.location.href = globalThis.location.href.replace(`/${id}`, "");
          // } else globalThis.location.reload();
        }
      },
      duplicate: async ({ id, ...value }: Activity) => {
        const response = await fetch("/api/activities", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(value),
        });
        if (response.ok) {
          const result = await response.json();
          setData([result, ...data]);
          activity.value = result;
          return result;
          // if (globalThis.location.href.includes(id)) {
          //   // href.replaceAll to handle cases where id might be in pathname and/or search
          //   const href = globalThis.location.href.replaceAll(id, result.id);
          //   globalThis.location.href = href;
          // } else globalThis.location.reload();
        }
      },
      copyId: ({ id }: Activity) => navigator.clipboard.writeText(id),
      accountOptions: props.accounts.map(toOptions),
      contactOptions: props.contacts.map(toOptions),
      dealOptions: props.deals.map(toOptions),
    },
  });

  return (
    <ResizablePanelGroup
      direction={(!width || width > 768) ? "horizontal" : "vertical"}
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        minSize={30}
        className="grid grid-rows-[min-content_auto_min-content]"
      >
        <header className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1 space-x-2">
              <TableActionsReload table={table} />
              <TableSearch table={table} />
            </div>
            <div className="flex items-center space-x-2">
              <Button className="ml-2" onClick={table.options.meta!.create}>
                Create
              </Button>
            </div>
          </div>
          <div className="flex items-center flex-1 space-x-2">
            <TableFilters table={table} />
          </div>
        </header>

        <div className="overflow-y-auto p-4">
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
                        onClick={() => table.options.meta!.select(row.original)}
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
                      <div className="grid place-items-center w-full h-full py-20">
                        <div className="text-center">
                          <i className="mdi-radiobox-marked text-4xl text-muted-foreground mb-2" />
                          <h2 className="text-xl font-medium text-muted-foreground mb-1">
                            No activities found
                          </h2>
                        </div>
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
        {activity.value?.id
          ? (
            <div className="grid h-full overflow-y-auto">
              <FormUpdate
                key={activity.value?.id}
                table={table}
                activity={activity}
              />
            </div>
          )
          : (
            <div className="grid place-items-center w-full h-full py-20">
              <div className="text-center">
                <i className="mdi-radiobox-marked text-4xl text-muted-foreground mb-2" />
                <h2 className="text-xl font-medium text-muted-foreground mb-1">
                  Selecciona una actividad
                </h2>
              </div>
            </div>
          )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

function FormUpdate(props: {
  table: Table<Account>;
  activity: Signal<Activity>;
}) {
  const form = useForm<Activity>({
    defaultValues: getActivity(props.activity.value),
  });

  const onSubmit = async (data: Activity) => {
    const result = await props.table.options.meta!.update(data);
    form.reset(result);
  };

  const FIELD = "grid grid-cols-[100px_auto] items-center px-4";

  return (
    <Form {...form}>
      <form
        id="activities.patch"
        className="space-y-2"
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={() => form.reset(getActivity(props.activity.value))}
      >
        <header className="flex items-center justify-between p-4">
          <div className="flex items-center flex-1 space-x-2">
            <h3 className="text-lg font-semibold line-clamp-1 mr-4">
              {props.activity.value.name}
            </h3>
            <ActivityIcon type={props.activity.value.type} />
          </div>
          <div className="flex items-center space-x-2">
            <TableRowActions
              row={{ original: form.getValues() }}
              endpoint="/api/activities"
              actions={["duplicate", "copyId", "remove"]}
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

        <FormFieldInput
          name="name"
          label="Name"
          form={form}
          className={FIELD}
        />
        <FormFieldCombobox
          name="type"
          label="Type"
          form={form}
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
            "x",
            "other",
          ].map((value) => ({
            label: ({/* TODO */})?.[value] ?? value,
            value,
          }))}
          className={FIELD}
        />
        <FormFieldSelectMultiple
          name="accountIds"
          label="Accounts"
          form={form}
          className={FIELD}
          options={props.table.options.meta!.accountOptions}
        />
        <FormFieldSelectMultiple
          name="contactIds"
          label="Contacts"
          form={form}
          className={FIELD}
          options={props.table.options.meta!.contactOptions}
        />
        <FormFieldSelectMultiple
          name="dealIds"
          label="Deals"
          form={form}
          className={FIELD}
          options={props.table.options.meta!.dealOptions}
        />
        <FormFieldTextarea
          name="notes"
          label="Notes"
          form={form}
          className={FIELD}
          rows="20"
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
    "x": {
      icon: "mdi-twitter",
      text: "X (Twitter)",
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
