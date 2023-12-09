import { EnvelopeOpenIcon } from "netzo/deps/@radix-ui/react-icons.ts";

import { Button } from "netzo/components/ui/button.tsx";

export default () => {
  return (
    <Button>
      <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Login with Email
    </Button>
  );
};
