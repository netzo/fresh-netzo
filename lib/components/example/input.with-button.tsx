import { Button } from "../ui/button.tsx";
import { Input } from "../ui/input.tsx";

export default () => {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit">Subscribe</Button>
    </div>
  );
};
