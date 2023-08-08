import { Button } from "netzo/_ui/registry/netzo/ui/button.tsx";
import { ToastAction } from "netzo/_ui/registry/netzo/ui/toast.tsx";
import { useToast } from "netzo/_ui/registry/netzo/ui/use-toast.ts";

export default function ToastWithAction() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }}
    >
      Show Toast
    </Button>
  );
}
