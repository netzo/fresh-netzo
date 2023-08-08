import { Input } from "netzo/_ui/registry/netzo/ui/input.tsx";
import { Label } from "netzo/_ui/registry/netzo/ui/label.tsx";

export default function InputFile() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
    </div>
  );
}
