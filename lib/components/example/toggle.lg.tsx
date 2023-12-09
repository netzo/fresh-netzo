import { FontItalicIcon } from "netzo/deps/@radix-ui/react-icons.ts";

import { Toggle } from "netzo/components/ui/toggle.tsx";

export default () => {
  return (
    <Toggle size="lg" aria-label="Toggle italic">
      <FontItalicIcon className="h-4 w-4" />
    </Toggle>
  );
};
