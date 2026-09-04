import * as React from "react";
import { cn } from "../lib/utils";

export interface TableColumn<T> {
  key: string;
  header: React.ReactNode;
  render?: (row: T) => React.ReactNode;
  className?: string;
  isClickable?: boolean;
  headerIcon?: React.ReactNode;
}

export interface TableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string;
  onRowClick?: (row: T) => void;
  onHeaderClick?: (key: string) => void;
  onRowContextMenu?: (e: React.MouseEvent, row: T) => void;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  onHeaderClick,
  onRowContextMenu,
  className,
  ...props
}: TableProps<T>) {
  return (
    <div
      className={cn(
        "relative w-full overflow-auto rounded-md border border-border/50 bg-background/50",
        className,
      )}
      {...props}
    >
      <table className="w-full caption-bottom text-sm">
        <thead className="bg-panel/50 [&_tr]:border-b border-border/50">
          <tr className="border-b border-border/30 transition-colors">
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() =>
                  col.isClickable && onHeaderClick && onHeaderClick(col.key)
                }
                className={cn(
                  "h-10 px-4 align-middle font-medium text-muted whitespace-nowrap transition-colors",
                  col.isClickable &&
                    "cursor-pointer hover:text-text select-none",
                  col.className,
                )}
              >
                <div
                  className={cn(
                    "flex items-center gap-2",
                    col.className?.includes("text-right")
                      ? "justify-end"
                      : "justify-start",
                  )}
                >
                  {col.header}
                  {col.headerIcon && (
                    <span className="flex-shrink-0 flex items-center">
                      {col.headerIcon}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="p-8 text-center text-muted"
              >
                No data available.
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={keyExtractor(row, index)}
                onClick={() => onRowClick && onRowClick(row)}
                onContextMenu={(e) => onRowContextMenu?.(e, row)}
                className={cn(
                  "border-b border-border/30 transition-colors hover:bg-muted/10",
                  onRowClick && "cursor-pointer",
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      "p-4 align-middle whitespace-nowrap",
                      col.className,
                    )}
                  >
                    {col.render
                      ? col.render(row)
                      : String((row as any)[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
