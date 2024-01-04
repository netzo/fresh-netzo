import { FontItalicIcon } from "../../deps/@radix-ui/react-icons.ts";
import { Toggle } from "../ui/toggle.tsx";

export default () => {
  return (
    <Toggle variant="outline" aria-label="Toggle italic">
      <FontItalicIcon className="h-4 w-4" />
    </Toggle>
  );
};
