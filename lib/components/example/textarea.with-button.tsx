import { Button } from "../ui/button.tsx";
import { Textarea } from "../ui/textarea.tsx";

export default () => {
  return (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  );
};
