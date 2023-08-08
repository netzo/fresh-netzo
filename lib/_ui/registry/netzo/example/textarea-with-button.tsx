import { Button } from "netzo/_ui/registry/netzo/ui/button.tsx";
import { Textarea } from "netzo/_ui/registry/netzo/ui/textarea.tsx";

export default function TextareaWithButton() {
  return (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  );
}
