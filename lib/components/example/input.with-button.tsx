import { Button } from "netzo/components/ui/button.tsx";
import { Input } from "netzo/components/ui/input.tsx";

export default () => {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit">Subscribe</Button>
    </div>
  );
};
