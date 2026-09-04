import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";

const tabsListVariants = cva(
  "inline-flex items-center justify-center text-muted",
  {
    variants: {
      variant: {
        pill: "h-10 rounded-md bg-panel p-1 border border-border/50 shadow-inner",
        underline:
          "w-full justify-start border-b border-border bg-transparent p-0",
      },
    },
  },
);

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        pill: "rounded-sm data-[state=active]:bg-background data-[state=active]:text-text data-[state=active]:shadow-sm hover:text-text",
        underline:
          "h-10 border-b-2 border-transparent rounded-none data-[state=active]:border-primary data-[state=active]:text-primary hover:text-text",
      },
    },
  },
);

export interface TabProps {
  title: React.ReactNode;
  children: React.ReactNode;
  value?: string;
}

export function Tab({ children }: TabProps) {
  return <>{children}</>;
}

export interface TabsProps {
  id?: string;
  variant?: "pill" | "underline";
  defaultValue?: string;
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
  className?: string;
}

export function Tabs({
  id,
  variant = "pill",
  defaultValue,
  children,
  className,
}: TabsProps) {
  const tabs = React.Children.toArray(
    children,
  ) as React.ReactElement<TabProps>[];

  const [activeTab, setActiveTab] = React.useState(
    defaultValue || tabs[0]?.props.value || "tab-0",
  );

  return (
    <div id={id} className={cn("w-full", className)}>
      <div className={cn(tabsListVariants({ variant }), "mb-4")} role="tablist">
        {tabs.map((tab, index) => {
          const tabValue = tab.props.value || `tab-${index}`;
          const isActive = activeTab === tabValue;

          return (
            <button
              key={tabValue}
              role="tab"
              data-state={isActive ? "active" : "inactive"}
              onClick={() => setActiveTab(tabValue)}
              className={tabsTriggerVariants({ variant })}
            >
              {tab.props.title}
            </button>
          );
        })}
      </div>

      {tabs.map((tab, index) => {
        const tabValue = tab.props.value || `tab-${index}`;

        if (activeTab !== tabValue) return null;

        return (
          <div
            key={tabValue}
            role="tabpanel"
            className="focus-visible:outline-none"
          >
            {tab.props.children}
          </div>
        );
      })}
    </div>
  );
}
