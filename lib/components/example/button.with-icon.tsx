import { EnvelopeOpenIcon } from "@radix-ui/react-icons";

import { Button } from "netzo/components/ui/button.tsx";

export default () => {
  return (
    <Button>
      <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Login with Email
    </Button>
  );
};
