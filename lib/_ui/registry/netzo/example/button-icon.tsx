import { ChevronRightIcon } from "@radix-ui/react-icons";

import { Button } from "netzo/_ui/registry/netzo/ui/button.tsx";

export default function ButtonIcon() {
  return (
    <Button variant="outline" size="icon">
      <ChevronRightIcon className="h-4 w-4" />
    </Button>
  );
}
