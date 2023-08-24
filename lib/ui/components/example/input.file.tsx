import { Input } from "netzo/ui/components/ui/input.tsx";
import { Label } from "netzo/ui/components/ui/label.tsx";

export default () => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
    </div>
  );
};
