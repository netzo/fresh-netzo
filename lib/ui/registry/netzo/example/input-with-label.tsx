import { Input } from "netzo/ui/registry/netzo/ui/input.tsx";
import { Label } from "netzo/ui/registry/netzo/ui/label.tsx";

export default function InputWithLabel() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  );
}
