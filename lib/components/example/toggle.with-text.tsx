import { FontItalicIcon } from "netzo/deps/@radix-ui/react-icons.ts";

import { Toggle } from "netzo/components/ui/toggle.tsx";

export default () => {
  return (
    <Toggle aria-label="Toggle italic">
      <FontItalicIcon className="mr-2 h-4 w-4" />
      Italic
    </Toggle>
  );
};
