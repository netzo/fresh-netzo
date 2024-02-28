import { useSignal } from "@preact/signals";
import { Button } from "netzo/components/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "netzo/components/dialog.tsx";
import { Input } from "netzo/components/input.tsx";
import { Label } from "netzo/components/label.tsx";
import type { Event } from "../data/events.ts";

export function EventsFormCreate() {
  const data = useSignal<Partial<Event>>({ name: "" });

  const onClickCreate = async () => {
    const response = await fetch(`/api/events`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data.value),
    });
    if (response.ok) {
      const data = await response.json();
      globalThis.location.href = `/events/${data.id}`;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="ml-2">Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-left">
          <DialogTitle>Create New</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              className="col-span-3"
              value={data.value.name}
              onInput={(e) => data.value.name = e.target.value}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClickCreate}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
