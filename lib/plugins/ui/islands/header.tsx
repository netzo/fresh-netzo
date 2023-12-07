import type { User } from "netzo/plugins/portal/utils/db.ts";
import { NavItemUser } from "./nav-item.tsx";
import { UIOptions } from "../mod.ts";

export type HeaderProps = UIOptions["header"] & {
  sessionUser?: User;
  url: URL;
};

export default (props: HeaderProps) => {
  return (
    <header className="flex items-center justify-between px-4 py-4 space-y-2">
      {/* NOTE: use dark:filter-invert (in image.class) to invert color on dark */}
      {props?.image && (
        <img src={props?.image} class="w-auto h-12 my-auto mr-3" />
      )}
      <div>
        {props?.title && (
          <h1 className="text-2xl font-bold tracking-tight">
            {props?.title}
          </h1>
        )}
        {props?.description && (
          <p className="text-sm text-muted-foreground">
            {props?.description}
          </p>
        )}
      </div>

      {/* CENTER CONTENT HERE */}

      {/* RIGHT CONTENT HERE */}
    </header>
  );
};
