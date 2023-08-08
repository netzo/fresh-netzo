import { Label } from "netzo/_ui/registry/netzo/ui/label.tsx";
import { Textarea } from "netzo/_ui/registry/netzo/ui/textarea.tsx";

export default function TextareaWithLabel() {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  );
}