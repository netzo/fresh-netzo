import { Button } from "netzo/components/ui/button.tsx";
import { ToastAction } from "netzo/components/ui/toast.tsx";
import { useToast } from "netzo/components/ui/use-toast.ts";

export default () => {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          variant: "destructive",
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
