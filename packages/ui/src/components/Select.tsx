import * as React from "react";
import { cn } from "../lib/utils";
import { Label } from "./Label";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: React.ReactNode;
  containerClassName?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, containerClassName, label, id, children, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;

    const selectElement = (
      <div className="relative w-full">
        <select
          id={selectId}
          className={cn(
            "flex h-9 w-full appearance-none rounded-md border border-border bg-background px-3 py-1 pr-8 text-sm text-text shadow-sm transition-colors cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-panel",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    );

    if (!label) return selectElement;

    return (
      <div className={cn("w-full space-y-2", containerClassName)}>
        <Label
          htmlFor={selectId}
          className="block opacity-80 uppercase tracking-wider text-xs"
        >
          {label}
        </Label>
        {selectElement}
      </div>
    );
  },
);
Select.displayName = "Select";
export { Select };
