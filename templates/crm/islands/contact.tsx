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
import { Contact, contactSchema } from "../data/contacts.ts";
// import { I18N } from "../../data/contacts.ts";

export function Header(props: { data: Contact }) {
  const { name = "", description, tags, image } = props.data;
  const [first = "", last = ""] = name.split(" ");
  const initials = `${first[0]}${last[0]}`?.toUpperCase();

  const onClickDelete = async () => {
    if (confirm("Are you sure you want to delete this contact?")) {
      await fetch(`/api/contacts/${props.data.id}`, { method: "DELETE" });
      window.location.href = "/contacts";
    }
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
            {name || "Create an Contact"}
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
        <Button variant="destructive">Delete</Button>
      </div>
    </header>
  );
}

export function CardFormGeneral(props: {
  data: Contact;
  action: string;
  method: "POST" | "PATCH";
}) {
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>
          {props.method === "POST" ? "Create" : "Update"} Contact
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form
          values={props.data}
          formSchema={contactSchema.omit({
            id: true,
            updatedAt: true,
            createdAt: true,
          })}
          onSubmit={createOnSubmit(props.method, props.action)}
        >
          <Button type="submit" className="mt-8">
            {props.method === "POST" ? "Create" : "Update"}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
