import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "netzo/components/ui/avatar.tsx";

export default () => {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/netzo.png" alt="@netzo" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
