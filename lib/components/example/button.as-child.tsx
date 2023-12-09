import { Button } from "../ui/button.tsx";

export default () => {
  return (
    <Button asChild>
      <a href="/login">Login</a>
    </Button>
  );
};
