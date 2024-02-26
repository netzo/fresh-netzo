import { useSignal } from "@preact/signals";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "netzo/components/avatar.tsx";
import { AutoForm } from "netzo/components/blocks/auto-form/auto-form.tsx";
import { TableRowActions } from "netzo/components/blocks/table/table.tsx";
import { Button } from "netzo/components/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "netzo/components/card.tsx";
import { useForm, zodResolver } from "netzo/components/form.tsx";
import { Deal, dealSchema } from "../data/deals.ts";

export function DealHeader(props: { deal: Deal }) {
  const { name = "", image, email, phone } = props.deal;
  const [first = "", last = ""] = name.split(" ");
  const initials = `${first[0]}${last[0]}`?.toUpperCase();

  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex flex-row items-center justify-between gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={image} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="grid gap-2">
          <CardTitle className="text-xl">
            {name}
          </CardTitle>
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <TableRowActions
          row={{ original: props.deal }}
          resource="deals"
          actions={["duplicate", "copyId", "remove"]}
        />
      </div>
    </header>
  );
}

export function DealCardForm(props: { deal: Deal }) {
  const deal = useSignal(props.deal);
  const status = useSignal<"disabled" | "enabled" | "loading">("disabled");

  const form = useForm<Deal>({
    resolver: zodResolver(dealSchema),
    defaultValues: deal.value,
  });

  const onValuesChange = (values: Deal) => {
    if (!["enabled"].includes(status.value)) status.value = "enabled";
    deal.value = values;
  };

  const onClickUpdate = async () => {
    status.value = "loading";
    try {
      // ✅ This will be type-safe and validated.
      await fetch(`/api/deals/${deal.value.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(deal.value),
      });
      setTimeout(() => status.value = "disabled", 1000);
    } catch (error) {
      setTimeout(() => status.value = "enabled", 1000);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pt-2">
        <CardTitle>
          General
        </CardTitle>
        <Button
          variant="default"
          size="sm"
          disabled={status.value === "disabled"}
          onClick={onClickUpdate}
        >
          {["loading"].includes(status.value)
            ? <i className="mdi-loading h-4 w-4 animate-spin" />
            : "Update"}
        </Button>
      </CardHeader>
      <CardContent>
        <AutoForm
          values={deal.value}
          formSchema={dealSchema.pick({
            name: true,
            status: true,
            amount: true,
            currencyCode: true,
            accountId: true,
            contactIds: true,
            userIds: true,
          })}
          onValuesChange={onValuesChange}
        />
      </CardContent>
    </Card>
  );
}
