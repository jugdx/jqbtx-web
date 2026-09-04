import * as React from "react";
import { cn } from "../lib/utils";

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    const checkboxElement = (
      <div className="relative flex items-center justify-center shrink-0 mt-[2px]">
        <input
          type="checkbox"
          id={checkboxId}
          className={cn(
            "peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-border bg-panel transition-all",
            "hover:border-primary/50",
            "checked:border-primary checked:bg-primary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-50",
            !label && className,
          )}
          ref={ref}
          {...props}
        />
        <div className="pointer-events-none absolute text-[#1a1b26] opacity-0 transition-opacity peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
    );

    if (!label && !description) return checkboxElement;

    return (
      <div className={cn("flex items-start gap-3", className)}>
        {checkboxElement}
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={checkboxId}
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
Checkbox.displayName = "Checkbox";
export { Checkbox };
