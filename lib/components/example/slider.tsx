import { type ComponentProps } from "../../deps/preact/compat.ts";
import { cn } from "../utils.ts";
import { Slider } from "../ui/slider.tsx";

type SliderProps = ComponentProps<typeof Slider>;

export default ({ className, ...props }: SliderProps) => {
  return (
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      className={cn("w-[60%]", className)}
      {...props}
    />
  );
};
