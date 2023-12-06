import type { UIOptions } from "./mod.ts";

export const Footer = (props: UIOptions["footer"]) => {
  return (
    <footer className="flex items-center justify-center p-4">
      <a href="https://netzo.io/" target="_blank">
        <img
          src="https://netzo.io/logos/built-with-netzo-light.svg"
          alt="Built with Netzo"
          class="h-[36px]"
        />
      </a>
    </footer>
  );
};
