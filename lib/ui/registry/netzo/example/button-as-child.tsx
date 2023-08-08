import { Button } from "netzo/ui/registry/netzo/ui/button.tsx";

export default function ButtonAsChild() {
  return (
    <Button asChild>
      <a href="/login">Login</a>
    </Button>
  );
}
