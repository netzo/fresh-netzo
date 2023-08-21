import { useComputed, useSignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface Props {
  src: string;
}

export default function ShowSource(props: Props) {
  const show = useSignal(false);
  const repo = "https://github.com/netzo/netzo/tree/main/lib/ui";
  const url = useComputed(() =>
    `https://emgithub.com/embed-v2.js?target=${
      encodeURIComponent(repo + props.src)
    }&style=default&type=code&showFullPath=on&showFileMeta=on&showCopy=on`
  );

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    if (IS_BROWSER) {
      show.value = !show.value;
      if (show.value) {
        const embed = document.getElementById(props.src)!;
        const script = document.createElement("script");
        script.src = url.value;
        embed.appendChild(script);
      }
    }
  };

  return (
    <div class="mt-2">
      <span
        n="xs"
        class="n-link cursor-pointer text-gray n-transition hover:n-link-hover n-link-base"
        onClick={onClick}
      >
        {show.value ? "Hide" : "Show"} source
      </span>
      <div id={props.src} class="dark:filter-invert-100" />
    </div>
  );
}
