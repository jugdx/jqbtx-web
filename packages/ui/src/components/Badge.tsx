import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-[#1a1b26] hover:bg-primary/80",
        secondary: "border-border bg-panel text-text hover:bg-border/50",
        success: "border-success/20 bg-success/15 text-success",
        warning: "border-warning/20 bg-warning/15 text-warning",
        danger: "border-danger/20 bg-danger/15 text-danger",
        info: "border-info/20 bg-info/15 text-info",
        outline: "text-text border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
