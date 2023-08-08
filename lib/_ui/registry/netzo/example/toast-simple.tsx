import { Button } from "netzo/_ui/registry/netzo/ui/button.tsx";
import { useToast } from "netzo/_ui/registry/netzo/ui/use-toast.ts";

export default function ToastSimple() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          description: "Your message has been sent.",
        });
      }}
    >
      Show Toast
    </Button>
  );
}
