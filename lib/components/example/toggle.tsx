import { FontBoldIcon } from "netzo/deps/@radix-ui/react-icons.ts";

import { Toggle } from "netzo/components/ui/toggle.tsx";

export default () => {
  return (
    <Toggle aria-label="Toggle italic">
      <FontBoldIcon className="h-4 w-4" />
    </Toggle>
  );
};
