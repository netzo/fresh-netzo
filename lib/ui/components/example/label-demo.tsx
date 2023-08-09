import { Checkbox } from "netzo/ui/components/ui/checkbox.tsx";
import { Label } from "netzo/ui/components/ui/label.tsx";

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
