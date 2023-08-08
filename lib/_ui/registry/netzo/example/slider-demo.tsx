import { type ComponentProps } from "../../../deps.ts";
import { cn } from "../../../utils/mod.ts";
import { Slider } from "netzo/_ui/registry/netzo/ui/slider.tsx";

type SliderProps = ComponentProps<typeof Slider>;

export default function SliderDemo({ className, ...props }: SliderProps) {
  return (
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      className={cn("w-[60%]", className)}
      {...props}
    />
  );
}
