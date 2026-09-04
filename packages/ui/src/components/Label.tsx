import * as React from "react";
import { cn } from "../lib/utils";

type LabelVariant =
  | "default"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "muted";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  variant?: LabelVariant;
  icon?: React.ReactNode;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, variant = "default", icon, className, ...props }, ref) => {
    const baseColors = {
      default: "text-text",
      info: "text-info",
      success: "text-success",
      warning: "text-warning",
      danger: "text-danger",
      muted: "text-muted",
    };

    return (
      <label
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 font-medium transition-colors",
          baseColors[variant],
          className,
        )}
        {...props}
      >
        {icon && (
          <span className="flex-shrink-0 flex items-center">{icon}</span>
        )}
        {children}
      </label>
    );
  },
);

Label.displayName = "Label";

export { Label };
