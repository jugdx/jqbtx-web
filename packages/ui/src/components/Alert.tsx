import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const alertVariants = cva(
  "relative w-full rounded-md border p-4 text-sm font-medium flex items-center gap-3",
  {
    variants: {
      variant: {
        default: "bg-background border-border text-text",
        danger: "bg-danger/10 border-danger/20 text-danger",
        info: "bg-info/10 border-info/20 text-info",
        warning: "bg-warning/10 border-warning/20 text-warning",
        success: "bg-success/10 border-success/20 text-success",
      },
      size: {
        default: "p-4",
        sm: "p-3 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface AlertProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant, size }), className)}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <div className="flex-1">{children}</div>
    </div>
  ),
);
Alert.displayName = "Alert";

export { Alert, alertVariants };
