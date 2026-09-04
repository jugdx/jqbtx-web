import * as React from "react";
import { cn } from "../lib/utils";

export interface CardProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, title, description, footer, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-border bg-panel text-text shadow-sm flex flex-col",
        className,
      )}
      {...props}
    >
      {(title || description) && (
        <div className="flex flex-col space-y-1.5 p-6">
          {title && (
            <h3 className="text-lg font-semibold leading-none tracking-tight text-primary">
              {title}
            </h3>
          )}
          {description && <p className="text-sm text-muted">{description}</p>}
        </div>
      )}

      <div className={cn("p-6 pt-0 flex-1", !title && !description && "pt-6")}>
        {children}
      </div>

      {footer && (
        <div className="flex items-center p-6 pt-0 border-t border-border/50 mt-auto">
          {footer}
        </div>
      )}
    </div>
  ),
);
Card.displayName = "Card";

export { Card };
