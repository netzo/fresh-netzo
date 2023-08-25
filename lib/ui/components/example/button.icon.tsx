import { ChevronRightIcon } from "@radix-ui/react-icons";

import { Button } from "netzo/ui/components/ui/button.tsx";

export default () => {
  return (
    <Button variant="outline" size="icon">
      <ChevronRightIcon className="h-4 w-4" />
    </Button>
  );
};
