import { Button } from "../ui/button.tsx";
import { ToastAction } from "../ui/toast.tsx";
import { useToast } from "../ui/use-toast.ts";

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
