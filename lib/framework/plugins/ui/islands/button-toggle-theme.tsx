import { Fragment } from "preact";
import { Head } from "$fresh/src/runtime/head.ts";

export default function ButtonToggleTheme() {
  function changeTheme() {
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      localStorage.setItem("color-theme", "light");
    } else {
      localStorage.setItem("color-theme", "dark");
    }
    // @ts-ignore - defined in <head> below
    setTheme();
  }

  return (
    <Fragment>
      <Head>
        <style>
          {`html body {visibility: hidden; opacity: 0;}`}
        </style>
        <noscript>
          <style>
            {`body {visibility: visible; opacity: 1;}`}
          </style>
        </noscript>
        <script>
          {
            /* To prevent white flash on page load where a dark theme is to be applied, this script
                must exist in the Head to be processed prior to the page rendering.  The odd layout of
                the conditions is due to the inability to prevent && from rendering as &amp;&amp;*/
          }
          {`
              function setTheme() {
                let isDark = false;
                if (localStorage.getItem('color-theme') === 'dark') {
                  isDark = true;
                } else if (!('color-theme' in localStorage)) {
                  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    isDark = true;
                  }
                }
                if (isDark) {
                  document.getElementsByTagName('html')[0].classList.add('dark');
                } else {
                  document.getElementsByTagName('html')[0].classList.remove('dark');
                }
              }
              setTheme();
            `}
        </script>
      </Head>
      <script>
        {`
                document.body.style.visibility = 'visible';
                document.body.style.opacity = '1';
            `}
      </script>
      <button
        id="theme-toggle"
        aria-label="Toggle between dark and light mode"
        type="button"
        onClick={changeTheme}
        class="border(2 dark:[#909090] [#b0b0b0]) focus:(outline-1) rounded-lg text-sm p-2"
      >
        <svg
          id="theme-dark-icon"
          class="w-5 h-5 hidden dark:block"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z">
          </path>
        </svg>
        <svg
          id="theme-light-icon"
          class="w-5 h-5 block dark:hidden"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            fill-rule="evenodd"
            clip-rule="evenodd"
          >
          </path>
        </svg>
      </button>
    </Fragment>
  );
}
