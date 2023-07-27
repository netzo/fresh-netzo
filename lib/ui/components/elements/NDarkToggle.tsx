import { NSwitch, NSwitchProps } from "../mod.ts";
import { n } from "../../utils/mod.ts";
import { useTheme } from "../../../composables/browser/useTheme.ts";

export interface NDarkToggleProps extends NSwitchProps {
  checked?: boolean;
}

export const NDarkToggle = (props: NDarkToggleProps) => {
  const ui = (extra?: string) => ({
    ...props,
    class: n([props.class, extra]),
  });

  const theme = props.checked === true
    ? "dark"
    : props.checked === false
    ? "light"
    : undefined;
  const { isDark } = useTheme(theme);

  const onClick = () => {
    isDark.value = !isDark.value;
  };

  return (
    <NSwitch {...ui()} checked={isDark} onClick={onClick}>
      {isDark.value ? "Dark" : "Light"}
    </NSwitch>
  );
};
