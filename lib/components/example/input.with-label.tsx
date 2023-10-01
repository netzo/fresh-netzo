import { Input } from "netzo/components/ui/input.tsx";
import { Label } from "netzo/components/ui/label.tsx";

export default () => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  );
};