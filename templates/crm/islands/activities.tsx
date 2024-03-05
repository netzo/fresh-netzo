import { useSignal } from "@preact/signals";
import { Badge } from "netzo/components/badge.tsx";
import { FetchForm } from "netzo/components/blocks/fetch-form/fetch-form.tsx";
import type { Editor } from "netzo/components/blocks/prose-editor/prose-editor.tsx";
import * as ProseEditor from "netzo/components/blocks/prose-editor/prose-editor.tsx";
import { useProseEditor } from "netzo/components/blocks/prose-editor/use-prose-editor.tsx";
import {
  TableActionsReload,
  TableFilters,
  TablePagination,
  TableSearch,
  TableView,
  TableViewOptions,
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
import { cn } from "netzo/components/utils.ts";
import type { Account } from "netzo/data/accounts.ts";
import type { Contact } from "netzo/data/contacts.ts";
import {
  activitySchema,
  getActivity,
  type Activity,
} from "../data/activities.ts";
import type { Deal } from "../data/deals.ts";
import { I18N, toDateTime } from "../data/mod.ts";

export function Main({ data, defaultLayout = [40, 60] }: {
  data: {
    activity: Activity;
    accounts: Account[];
    contacts: Contact[];
    deals: Deal[];
    activities: Activity[];
  };
  defaultLayout?: [number, number];
}) {
  const { accounts, contacts, deals, activities } = data;
  const activity = useSignal(data.activity);

  // const { width = 0 } = useWindowSize(); causes unnecessary re-renders
  const width = globalThis?.innerWidth;

  const table = useTable<Activity>(data.activities, {
    resource: "activities",
    idField: "id",
    search: {
      column: "name",
      placeholder: "Search by name...",
    },
    filters: [
      {
        column: "type",
        title: I18N.type,
        options: [...new Set(data.activities.map((item) => item.type).flat())]
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
        options: data.accounts
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

  const editor = useProseEditor({ content: activity.value?.content });

  const onClickSelect = (value: Activity) => {
    activity.value = value;
    editor?.commands?.setContent?.(value.content);
  };

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
        globalThis.location.href = `/activities/${data.id}`;
      }
    }
  };

  return (
    <>
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center flex-1 space-x-2">
          <TableActionsReload table={table} />
          <TableSearch table={table} />
          <TableFilters table={table} />
        </div>
        <div className="flex items-center space-x-2">
          <TableViewOptions table={table} />
          <Button
            variant="default"
            className="ml-2"
            onClick={onClickCreate}
          >
            Create
          </Button>
        </div>
      </header>

      <Separator />

      <div className="h-full flex-1 overflow-y-auto">
        <ResizablePanelGroup
          direction={(!width || width > 768) ? "horizontal" : "vertical"}
        >
          <ResizablePanel defaultSize={defaultLayout[0]} minSize={30}>
            <div className="h-full overflow-y-auto p-4">
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
                              {row.original.content.substring(0, 300)}
                            </p>
                            <div className="flex gap-2">
                              <ActivityIcon type={row.original.type} />
                              {row.original.accountIds.map((id: string) => (
                                <Badge variant="secondary">
                                  {data.accounts.find((account) =>
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
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[1]}>
            <div className="grid h-full">
              <ActivitiesCardForm
                key={activity.value.id}
                activity={activity.value}
                accounts={accounts}
                contacts={contacts}
                deals={deals}
                activities={activities}
                editor={editor}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <footer className="flex items-center justify-between p-4">
        <TablePagination table={table} />
      </footer>
    </>
  );
}

export function ActivitiesCardForm(
  props: {
    activity: Activity;
    accounts: Account[];
    contacts: Contact[];
    deals: Deal[];
    activities: Activity[];
    editor: Editor | null;
  },
) {
  const form = useForm<Activity>({
    resolver: zodResolver(activitySchema),
    defaultValues: activitySchema.parse(props.activity ?? {}), // sets default values
  });

  const toOptions = ({ id, name }): Option => ({ value: id, label: name });
  const accountOptions = props.accounts.map(toOptions);
  const contactOptions = props.contacts.map(toOptions);
  const dealOptions = props.deals.map(toOptions);

  return (
    <Form {...form}>
      <FetchForm
        id="activities.create"
        action={`/api/activities/${props.activity.id}`}
        method="patch"
        className="space-y-2"
      >
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
          name="content"
          render={({ field }) => (
            <FormItem className="pt-4">
              <FormLabel>{I18N["content"]}</FormLabel>
              <FormControl>
                <ActivityEditor
                  editor={props.editor}
                  content={props.activity.content ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FetchForm>
    </Form>
  );
}

export function ActivityEditor({ editor, content }: {
  editor: Editor | null; // set to null on the server and initialize on the client
  content: string; // used to server-side render initial content
}) {
  if (!content) {
    return (
      <div className="grid place-items-center w-full h-full py-20">
        <div className="text-center">
          <i className="mdi-radiobox-marked text-4xl text-muted-foreground mb-2" />
          <h2 className="text-xl font-medium text-muted-foreground mb-1">
            No activity selected
          </h2>
          <p className="text-sm text-muted-foreground">
            Create a new activity to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <Separator />
      <header className="bg-transparent p-1 flex flex-row items-center gap-1">
        <ProseEditor.ToggleBold editor={editor} />
        <ProseEditor.ToggleItalic editor={editor} />
        <ProseEditor.ToggleUnderline editor={editor} />
        <ProseEditor.ToggleStrike editor={editor} />
        <ProseEditor.ToggleHighlight editor={editor} />
        <Separator orientation="vertical" className="w-[1px] h-8" />
        <ProseEditor.ToggleH1 editor={editor} />
        <ProseEditor.ToggleH2 editor={editor} />
        <ProseEditor.ToggleH3 editor={editor} />
        <Separator orientation="vertical" className="w-[1px] h-8" />
        <ProseEditor.ToggleUl editor={editor} />
        <ProseEditor.ToggleOl editor={editor} />
        <Separator
          orientation="vertical"
          className="w-[1px] h-8 ml-auto"
        />
        <ProseEditor.ToggleCodeBlock editor={editor} />
        <ProseEditor.ToggleBlockquote editor={editor} />
        <ProseEditor.ToggleLink editor={editor} />
        <ProseEditor.ToggleImage editor={editor} />
        <ProseEditor.ToggleTable editor={editor} />
        <ProseEditor.ToggleYoutube editor={editor} />
        <Separator orientation="vertical" className="w-[1px] h-8" />
        <ProseEditor.ToggleUndo editor={editor} />
        <ProseEditor.ToggleRedo editor={editor} />
      </header>
      <Separator />
      <ProseEditor.ProseEditor editor={editor} content={content} />
    </div>
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
      text: "Call",
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
