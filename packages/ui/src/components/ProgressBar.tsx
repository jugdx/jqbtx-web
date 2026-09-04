import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const progressBarVariants = cva(
  "h-full w-full flex-1 transition-all duration-500 ease-in-out",
  {
    variants: {
      variant: {
        inProgress: "bg-primary",
        completed: "bg-success",
        seeding: "bg-info",
        paused: "bg-warning",
        error: "bg-danger",
      },
    },
    defaultVariants: {
      variant: "inProgress",
    },
  },
);

export interface ProgressBarProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressBarVariants> {
  value: number;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, variant, ...props }, ref) => {
    const boundedValue = Math.min(100, Math.max(0, value));

    return (
      <div
        ref={ref}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-panel border border-border",
          className,
        )}
        {...props}
      >
        <div
          className={cn(progressBarVariants({ variant }))}
          style={{ transform: `translateX(-${100 - boundedValue}%)` }}
        />
      </div>
    );
  },
);

ProgressBar.displayName = "ProgressBar";

export { ProgressBar, progressBarVariants };
