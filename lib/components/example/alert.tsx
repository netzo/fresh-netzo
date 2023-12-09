import { RocketIcon } from "../../deps/@radix-ui/react-icons.ts";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert.tsx";

export default () => {
  return (
    <Alert>
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  );
};
