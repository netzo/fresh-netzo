import { ChevronRightIcon } from "../../deps/@radix-ui/react-icons.ts";
import { Button } from "../ui/button.tsx";

export default () => {
  return (
    <Button variant="outline" size="icon">
      <ChevronRightIcon className="h-4 w-4" />
    </Button>
  );
};
