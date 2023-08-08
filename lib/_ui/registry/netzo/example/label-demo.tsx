import { Checkbox } from "netzo/_ui/registry/netzo/ui/checkbox.tsx";
import { Label } from "netzo/_ui/registry/netzo/ui/label.tsx";

export default function LabelDemo() {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </div>
  );
}
