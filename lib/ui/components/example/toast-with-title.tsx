import { Button } from "netzo/ui/components/ui/button.tsx";
import { useToast } from "netzo/ui/components/ui/use-toast.ts";

export default function ToastWithTitle() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }}
    >
      Show Toast
    </Button>
  );
}
