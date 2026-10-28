"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string
}

function Progress({
  className,
  value = 0,
  max = 100,
  indicatorClassName,
  ...props
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, ((value ?? 0) / (max ?? 100)) * 100))

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      max={max}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-zinc-900/80",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Track className="h-full w-full">
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            "h-full w-full flex-1 bg-[#ff3b00] transition-all duration-300 shadow-[0_0_10px_rgba(255,59,0,0.5)]",
            indicatorClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  )
}

export { Progress }
