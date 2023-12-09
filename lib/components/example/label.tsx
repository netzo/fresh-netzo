import { Checkbox } from "../ui/checkbox.tsx";
import { Label } from "../ui/label.tsx";

export default () => {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </div>
  );
};
