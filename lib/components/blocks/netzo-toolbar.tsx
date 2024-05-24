// @deno-types="npm:@types/react@18.2.60"
import * as React from "react";

import { useSignal } from "@preact/signals";
import { IS_BROWSER } from "fresh/runtime.ts";
import { AuthUser } from "../../plugins/auth/utils/db.ts";
import { ButtonDarkMode } from "../button-dark-mode.tsx";
import { Button } from "../button.tsx";
import { cn } from "../utils.ts";

// created using v0 by Vercel see https://v0.dev/t/aLUPWlh

export type NetzoToolbarProps = JSX.IntrinsicElements["menu"] & {
  sessionUser?: AuthUser;
};

export function NetzoToolbar({ className }: NetzoToolbarProps) {
  if (!IS_BROWSER) return null;

  const expanded = useSignal<boolean>(globalThis?.innerWidth >= 768);

  const styles = {
    toolbarButton:
      "text-zinc-100 rounded-full hover:bg-gray-600 hover:text-zinc-100",
  };

  const onClickShare = () => {
    globalThis.navigator.share({
      title: globalThis.document.title,
      text: "Open in Netzo",
      url: globalThis.location.href,
    });
  };

  const onClickFeedback = () => {
    const url =
      "https://github.com/netzo/netzo/issues/new?title=[templates/crm]%20general%20feedback";
    globalThis.open(url, "_blank").focus();
  };

  return (
    <menu
      className={cn(
        "flex items-center justify-center",
        "rounded-full bg-zinc-800 p-2 max-w-max",
        "fixed bottom-20px -translate-x-2/4 translate-y-0 left-2/4",
        className,
      )}
    >
      {expanded.value && (
        <>
          <div className="flex space-x-1 pr-2 border-r border-zinc-600">
            <ButtonDarkMode
              size="icon"
              variant="ghost"
              title="Toggle dark mode"
              className={cn(styles.toolbarButton)}
            />
            <Button
              size="icon"
              variant="ghost"
              title="Share"
              className={cn(styles.toolbarButton)}
              onClick={onClickShare}
            >
              <i className="mdi-share-variant h-6 w-6" />
              <span className="sr-only">Share</span>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              title="Feedback"
              className={cn(styles.toolbarButton)}
              onClick={onClickFeedback}
            >
              <i className="mdi-comment-question h-6 w-6" />
              <span className="sr-only">Feedback</span>
            </Button>
          </div>

          <div className="flex space-x-1 px-2 border-r border-zinc-600">
            <img
              alt="Avatar 1"
              className="rounded-full border-2 border-red-500 bg-gray-500"
              height="32"
              src="https://v0.dev/placeholder.svg"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            />
            <img
              alt="Avatar 2"
              className="rounded-full border-2 border-green-500 bg-gray-500"
              height="32"
              src="https://v0.dev/placeholder.svg"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            />
            <div className="relative">
              <img
                alt="Avatar 3"
                className="rounded-full border-2 border-[#666666] bg-gray-700 opacity-50"
                height="32"
                src="https://v0.dev/placeholder.svg"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
              <span className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-white text-xs font-bold">
                9+
              </span>
            </div>
          </div>
        </>
      )}
      <div className={cn("flex", expanded.value ? "pl-2" : "")}>
        <Button
          size="icon"
          variant="ghost"
          title={expanded.value ? "Collapse toolbar" : "Expand toolbar"}
          className={cn(styles.toolbarButton)}
          onClick={() => expanded.value = !expanded.value}
        >
          <i className="mdi-menu h-6 w-6" />
          <span className="sr-only">Expand</span>
        </Button>
      </div>
    </menu>
  );
}
