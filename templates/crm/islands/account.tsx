import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "netzo/components/avatar.tsx";
import { Badge } from "netzo/components/badge.tsx";
import { createOnSubmit, Form } from "netzo/components/blocks/form/form.tsx";
import { Button } from "netzo/components/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "netzo/components/card.tsx";
import { Separator } from "netzo/components/separator.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "netzo/components/tabs.tsx";
import type { ComponentChildren } from "preact";
import { Account, accountSchema } from "../data/accounts.ts";
// import { I18N } from "../../data/accounts.ts";

export function Header(props: { id: string; data: Account }) {
  const { name = "", description, tags, image } = props.data;
  const [first = "", last = ""] = name.split(" ");
  const initials = `${first[0]}${last[0]}`?.toUpperCase();

  const onClickDelete = async () => {
    if (confirm("Are you sure you want to delete this account?")) {
      await fetch(`/api/accounts/${props.data.id}`, { method: "DELETE" });
      window.location.href = "/accounts";
    }
  };

  const onClickSave = async () => {
    await fetch(`/api/accounts/${props.data.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "Updated Name" }),
    });
  };

  return (
    <header className="flex align-center justify-between py-4 px-6">
      <div className="flex flex-row align-center justify-between gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={image} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="grid gap-2">
          <CardTitle className="text-xl">
            {name || "Create an Account"}
          </CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
          {tags?.length && (
            <div className="flex gap-1">
              {tags?.map((tag, index) => (
                <Badge key={`${tag}-${index}`} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row align-center gap-4">
        <Button variant="destructive" onClick={onClickDelete}>Delete</Button>
        <Button variant="default" onClick={onClickSave}>Save</Button>
      </div>
    </header>
  );
}

export function Content(props: { id: string; data: Account }) {
  return (
    <Tabs defaultValue="general">
      <TabsList variant="outline">
        <TabsTrigger value="general" variant="outline">General</TabsTrigger>
        <TabsTrigger value="notes" variant="outline">Notes</TabsTrigger>
      </TabsList>
      <Separator />
      <TabsContent value="general">
        <CardForm title="Update Account">
          <Form
            values={props.data}
            formSchema={accountSchema.omit({
              id: true,
              updatedAt: true,
              createdAt: true,
            })}
            onSubmit={createOnSubmit("PATCH", `/api/accounts/${props.id}`)}
          />
        </CardForm>
      </TabsContent>
      <TabsContent value="notes">
        <CardForm title="Update Account">
          <Form
            values={props.data}
            formSchema={accountSchema.pick({ notes: true })}
            onSubmit={createOnSubmit("PATCH", `/api/accounts/${props.id}`)}
          />
        </CardForm>
        {/* <Notes data={props.data.notes} /> */}
      </TabsContent>
      <TabsContent value="notes">
        <CardForm title="Update Account">
          <Form
            values={props.data}
            formSchema={accountSchema.pick({ notes: true })}
            onSubmit={createOnSubmit("PATCH", `/api/accounts/${props.id}`)}
          />
        </CardForm>
        {/* <Notes data={props.data.notes} /> */}
      </TabsContent>
    </Tabs>
  );
}

export function CardForm(props: {
  title: string;
  children: ComponentChildren;
}) {
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>
          {props.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {props.children}
      </CardContent>
    </Card>
  );
}
