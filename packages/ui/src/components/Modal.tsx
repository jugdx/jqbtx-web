import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "./Button";

export interface ModalProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  footer,
  children,
  className,
  ...props
}: ModalProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div
        role="dialog"
        className={cn(
          "relative z-50 w-full max-w-lg rounded-xl border border-border bg-panel p-6 shadow-lg flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200",
          className,
        )}
        {...props}
      >
        {(title || description) && (
          <div className="flex flex-col space-y-1 pr-6">
            {title && (
              <h2 className="text-xl font-bold tracking-tight text-primary">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-muted mt-1.5">{description}</p>
            )}
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute right-4 top-4 h-8 w-8 text-muted hover:text-primary opacity-70 hover:opacity-100"
          title="Fermer"
        >
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
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Button>

        <div className="flex-1 py-2">{children}</div>

        {footer && (
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t border-border/50 pt-4 mt-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
