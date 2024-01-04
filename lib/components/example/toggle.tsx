import { FontBoldIcon } from "../../deps/@radix-ui/react-icons.ts";
import { Toggle } from "../ui/toggle.tsx";

export default () => {
  return (
    <Toggle aria-label="Toggle italic">
      <FontBoldIcon className="h-4 w-4" />
    </Toggle>
  );
};
