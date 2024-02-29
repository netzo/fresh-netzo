// @deno-types="npm:@types/react@18.2.60"
import * as React from "react";

import { Button } from "netzo/components/button.tsx";
import { cn } from "netzo/components/utils.ts";

// created using v0 by Vercel see https://v0.dev/t/aLUPWlh

export function NetzoToolbar({ className }) {
  return (
    <div
      className={cn(
        "fixed bottom-20px -translate-x-2/4 translate-y-0 left-2/4 ml-auto mr-auto flex items-center justify-between rounded-full bg-zinc-800 p-2 max-w-max",
        className,
      )}
    >
      <div className="flex space-x-2 border-r border-zinc-600 pr-1">
        <Button
          className="text-zinc-100 rounded-full hover:bg-gray-600 hover:text-zinc-100"
          size="icon"
          variant="ghost"
        >
          <i className="mdi-message-text h-6 w-6" />
          <span className="sr-only">Create a comment</span>
        </Button>
        <div className="relative">
          <Button
            className="text-zinc-100 relative rounded-full hover:bg-gray-600 hover:text-zinc-100"
            size="icon"
            variant="ghost"
          >
            <i className="mdi-inbox h-6 w-6" />
            <span className="sr-only">Open inbox</span>
            <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-blue-500" />
          </Button>
        </div>
        <Button
          className="text-zinc-100 rounded-full hover:bg-gray-600 hover:text-zinc-100"
          size="icon"
          variant="ghost"
        >
          <i className="mdi-layers h-6 w-6" />
          <span className="sr-only">Edit</span>
        </Button>
      </div>
      <div className="flex space-x-2 border-r border-zinc-600 px-3">
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
      <div className="flex items-center justify-center space-x-2 pl-1">
        <Button
          className="text-zinc-100 rounded-full hover:bg-gray-600 hover:text-zinc-100"
          size="icon"
          variant="ghost"
        >
          <i className="mdi-export-variant h-6 w-6" />
          <span className="sr-only">Open share UI</span>
        </Button>
        <Button
          className="text-zinc-100 rounded-full hover:bg-gray-600 hover:text-zinc-100"
          size="icon"
          variant="ghost"
        >
          <i className="mdi-menu h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </div>
    </div>
  );
}
