import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "netzo/ui/components/ui/avatar.tsx";

export default function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
