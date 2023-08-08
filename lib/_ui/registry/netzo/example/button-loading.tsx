import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "netzo/_ui/registry/netzo/ui/button.tsx";

export default function ButtonLoading() {
  return (
    <Button disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  );
}
