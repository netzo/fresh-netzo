import { FontBoldIcon } from "@radix-ui/react-icons";

import { Toggle } from "netzo/components/ui/toggle.tsx";

export default () => {
  return (
    <Toggle aria-label="Toggle italic">
      <FontBoldIcon className="h-4 w-4" />
    </Toggle>
  );
};
