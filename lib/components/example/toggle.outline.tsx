import { FontItalicIcon } from "@radix-ui/react-icons";

import { Toggle } from "netzo/components/ui/toggle.tsx";

export default () => {
  return (
    <Toggle variant="outline" aria-label="Toggle italic">
      <FontItalicIcon className="h-4 w-4" />
    </Toggle>
  );
};
