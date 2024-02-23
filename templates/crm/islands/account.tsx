import { useSignal } from "@preact/signals";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "netzo/components/avatar.tsx";
import { Badge } from "netzo/components/badge.tsx";
import { AutoForm } from "netzo/components/blocks/auto-form/auto-form.tsx";
import { Button } from "netzo/components/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "netzo/components/card.tsx";
import { useForm, zodResolver } from "netzo/components/form.tsx";
import { Separator } from "netzo/components/separator.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "netzo/components/tabs.tsx";
import { Account, accountSchema } from "../data/accounts.ts";

export function Account(props: { id: string; data: Account }) {
  const data = useSignal(props.data ?? { id: props.id });

  const form = useForm<Account>({
    resolver: zodResolver(accountSchema),
    defaultValues: props.data,
  });

  return (
    <>
      <AccountHeader values={data.value} />
      <Tabs defaultValue="general">
        <TabsList variant="outline">
          <TabsTrigger value="general" variant="outline">General</TabsTrigger>
          <TabsTrigger value="notes" variant="outline">Notes</TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="general" className="grid md:grid-cols-2 py-2 px-4">
          <Card className="border-none">
            <CardHeader>
              <CardTitle>
                General
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AutoForm
                values={data.value}
                formSchema={accountSchema.pick({
                  type: true,
                  name: true,
                  tags: true,
                })}
                onValuesChange={(value) => data.value = value}
              />
            </CardContent>
          </Card>
          <Card className="border-none">
            <CardHeader>
              <CardTitle>
                General
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AutoForm
                values={data.value}
                formSchema={accountSchema.pick({
                  emails: true,
                  phones: true,
                  links: true,
                })}
                onValuesChange={(value) => data.value = value}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notes" className="py-2 px-4">
          TODO:
          {/* <Notes data={props.data.notes} /> */}
        </TabsContent>
      </Tabs>
    </>
  );
}

function AccountHeader(props: { values: Account }) {
  const isLoading = useSignal(false);

  const { name = "", tags, image } = props.values;
  const [first = "", last = ""] = name.split(" ");
  const initials = `${first[0]}${last[0]}`?.toUpperCase();

  const onClickDelete = async () => {
    if (confirm("Are you sure you want to delete this account?")) {
      isLoading.value = true;
      await fetch(`/api/accounts/${props.values.id}`, { method: "DELETE" });
      isLoading.value = false;
      window.location.href = "/accounts";
    }
  };

  const onSubmit = async () => {
    isLoading.value = true;
    // ✅ This will be type-safe and validated.
    await fetch(`/api/accounts/${props.values.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(props.values),
    });
    isLoading.value = false;
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
        <Button
          variant="default"
          onClick={onSubmit}
        >
          {isLoading.value
            ? <i className="mdi-reload mr-2 h-4 w-4 animate-spin" />
            : "Save"}
        </Button>
      </div>
    </header>
  );
}
