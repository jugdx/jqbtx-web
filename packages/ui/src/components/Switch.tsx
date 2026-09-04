import * as React from "react";
import { cn } from "../lib/utils";

export interface SwitchProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const generatedId = React.useId();
    const switchId = id || generatedId;

    const switchElement = (
      <label
        htmlFor={switchId}
        className={cn(
          "relative inline-flex items-center shrink-0",
          props.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          !label && className,
        )}
      >
        <input
          type="checkbox"
          id={switchId}
          className="peer sr-only"
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            "h-6 w-11 rounded-full bg-panel border border-border transition-colors",
            "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-panel",
            "peer-checked:bg-primary peer-checked:border-primary",
          )}
        ></div>
        <div
          className={cn(
            "absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-text transition-transform",
            "peer-checked:translate-x-5 peer-checked:bg-[#1a1b26]",
          )}
        ></div>
      </label>
    );

    if (!label && !description) return switchElement;

    return (
      <div className={cn("flex items-start gap-3", className)}>
        {switchElement}
        <div className="flex flex-col justify-center min-h-[24px]">
          {label && (
            <label
              htmlFor={switchId}
              className={cn(
                "text-sm font-medium text-text transition-colors",
                props.disabled
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:text-primary",
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <span
              className={cn(
                "text-xs text-muted",
                props.disabled && "opacity-50",
              )}
            >
              {description}
            </span>
          )}
        </div>
      </div>
    );
  },
);
Switch.displayName = "Switch";
export { Switch };
