import { Label } from "netzo/ui/components/ui/label.tsx";
import { Textarea } from "netzo/ui/components/ui/textarea.tsx";

export default () => {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  );
};
