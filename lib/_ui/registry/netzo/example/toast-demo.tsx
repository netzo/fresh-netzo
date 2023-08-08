import { Button } from "netzo/_ui/registry/netzo/ui/button.tsx";
import { ToastAction } from "netzo/_ui/registry/netzo/ui/toast.tsx";
import { useToast } from "netzo/_ui/registry/netzo/ui/use-toast.ts";

export default function ToastDemo() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Scheduled: Catch up ",
          description: "Friday, February 10, 2023 at 5:57 PM",
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          ),
        });
      }}
    >
      Add to calendar
    </Button>
  );
}
