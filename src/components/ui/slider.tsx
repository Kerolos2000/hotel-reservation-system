import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";
import { cn } from "src/lib";

export function Slider({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
        <SliderPrimitive.Range className="absolute h-full bg-neutral-500" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full bg-white border border-gray-300 shadow hover:scale-105 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-transform" />
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full bg-white border border-gray-300 shadow hover:scale-105 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-transform" />
    </SliderPrimitive.Root>
  );
}
