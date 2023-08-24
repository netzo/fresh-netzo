import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "netzo/components/ui/alert.tsx";

export default () => {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  );
};
