import { Button } from "netzo/_ui/registry/netzo/ui/button.tsx";
import { Input } from "netzo/_ui/registry/netzo/ui/input.tsx";

export default function InputWithButton() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit">Subscribe</Button>
    </div>
  );
}
