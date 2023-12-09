import { type ComponentProps } from "netzo/deps/preact/compat.ts";
import { cn } from "netzo/components/utils.ts";
import { Slider } from "netzo/components/ui/slider.tsx";

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
