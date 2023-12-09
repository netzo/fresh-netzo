import { ReloadIcon } from "../../deps/@radix-ui/react-icons.ts";

import { Button } from "../ui/button.tsx";

export default () => {
  return (
    <Button disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  );
};
