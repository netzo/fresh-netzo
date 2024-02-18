// https://github.com/denoland/fresh/pull/1050
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { cmpCssRules } from "../utils.ts";

/**
 * Returns a cssrulelist of styleElement matching the selector.
 */
function getCssRules(selector: string) {
  const elem = document.querySelector(selector) as HTMLStyleElement;
  return elem?.sheet?.cssRules;
}

export default function CheckDuplication() {
  const cssRulesFRSHUNOCSS = useSignal<undefined | CSSRuleList>(undefined);
  const cssRulesClaimed = useSignal<undefined | CSSRuleList>(undefined);

  // Init
  useEffect(() => {
    // get <style>
    cssRulesFRSHUNOCSS.value = getCssRules("style");

    // get <style>
    cssRulesClaimed.value = getCssRules(":not(style)");
  });

  // IMPORTANT: at least one class is required in the islands for hydrate to work.
  return (
    <div class="p-2">
      {/* Status of duplicates */}
      {(() => {
        if (cssRulesFRSHUNOCSS.value != null && cssRulesClaimed.value != null) {
          return (
            <div>
              <p>Error :</p>
              <p id="numDuplicates">
                {`${
                  cmpCssRules(
                    cssRulesFRSHUNOCSS.value,
                    cssRulesClaimed.value,
                  )
                }`}
              </p>
              <p>cssrules are duplicated</p>
            </div>
          );
        } else if (
          cssRulesFRSHUNOCSS.value != null && cssRulesClaimed.value == null
        ) {
          return <p id="okNoDuplicates">Ok : No duplicates</p>;
        } else {
          return <p id="errorNoExistsRules">Error : CssRules does not exist</p>;
        }
      })()}
    </div>
  );
}
