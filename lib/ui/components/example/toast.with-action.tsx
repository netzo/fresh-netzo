import { Button } from "netzo/ui/components/ui/button.tsx";
import { ToastAction } from "netzo/ui/components/ui/toast.tsx";
import { useToast } from "netzo/ui/components/ui/use-toast.ts";

export default () => {
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
};
