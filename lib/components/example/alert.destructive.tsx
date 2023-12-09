import { ExclamationTriangleIcon } from "netzo/deps/@radix-ui/react-icons.ts";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "netzo/components/ui/alert.tsx";

export default () => {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="w-4 h-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  );
};
