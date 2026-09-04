import * as React from "react";
import { cn } from "../lib/utils";
import { Label } from "./Label";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  containerClassName?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, containerClassName, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;

    const textareaElement = (
      <textarea
        id={textareaId}
        className={cn(
          "flex min-h-[100px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
          className,
        )}
        ref={ref}
        {...props}
      />
    );

    if (!label) return textareaElement;

    return (
      <div className={cn("w-full space-y-2", containerClassName)}>
        <Label
          htmlFor={textareaId}
          className="block opacity-80 uppercase tracking-wider text-xs"
        >
          {label}
        </Label>
        {textareaElement}
      </div>
    );
  },
);
TextArea.displayName = "Textarea";
export { TextArea };
