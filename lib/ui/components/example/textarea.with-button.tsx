import { Button } from "netzo/ui/components/ui/button.tsx";
import { Textarea } from "netzo/ui/components/ui/textarea.tsx";

export default () => {
  return (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  );
};
