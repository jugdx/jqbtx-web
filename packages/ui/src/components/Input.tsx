import { forwardRef, useState, useId } from "react";
import { cn } from "../lib/utils";
import { Button } from "./Button";
import { Label } from "./Label";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, containerClassName, type, label, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const generatedId = useId();
    const inputId = id || generatedId;

    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    const inputWrapper = (
      <div className="relative w-full">
        <input
          id={inputId}
          type={inputType}
          className={cn(
            "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
            isPassword && "pr-10",
            className,
          )}
          ref={ref}
          {...props}
        />
        {isPassword && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted hover:text-text hover:bg-transparent focus-visible:ring-0"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                <line x1="2" y1="2" x2="22" y2="22" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </Button>
        )}
      </div>
    );

    if (!label) return inputWrapper;

    return (
      <div className={cn("w-full space-y-2", containerClassName)}>
        <Label
          htmlFor={inputId}
          className="block opacity-80 uppercase tracking-wider text-xs"
        >
          {label}
        </Label>
        {inputWrapper}
      </div>
    );
  },
);
Input.displayName = "Input";
