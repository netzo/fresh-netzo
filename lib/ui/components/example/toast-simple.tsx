import { Button } from "netzo/ui/components/ui/button.tsx";
import { useToast } from "netzo/ui/components/ui/use-toast.ts";

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
