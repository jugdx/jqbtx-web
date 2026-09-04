import { type TableColumn, Badge, ProgressBar, Checkbox, cn } from "@jqbtx/ui";
import type { TorrentViewData } from "../types";

export type SortDirection = "asc" | "desc";
export interface SortConfig {
  key: string;
  direction: SortDirection;
}

const SortIcon = ({ direction }: { direction: SortDirection }) => (
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
    {direction === "asc" ? (
      <path d="m18 15-6-6-6 6" />
    ) : (
      <path d="m6 9 6 6 6-6" />
    )}
  </svg>
);

export const getTorrentColumns = (
  sortConfig: SortConfig | null,
  selectedIds: Set<string>,
  isAllSelected: boolean,
  onToggleOne: (id: string) => void,
  onToggleAll: () => void,
): TableColumn<TorrentViewData>[] => {
  const getHeaderIcon = (colKey: string) => {
    return sortConfig?.key === colKey ? (
      <SortIcon direction={sortConfig.direction} />
    ) : undefined;
  };

  return [
    {
      key: "select",
      header: (
        <div onClick={(e) => e.stopPropagation()} className="flex items-center">
          <Checkbox
            id="select-all"
            checked={isAllSelected}
            onChange={onToggleAll}
            aria-label="Select all"
          />
        </div>
      ),
      render: (row) => (
        <div onClick={(e) => e.stopPropagation()} className="flex items-center">
          <Checkbox
            id={`select-${row.id}`}
            checked={selectedIds.has(row.id)}
            onChange={() => onToggleOne(row.id)}
            aria-label={`Select ${row.name}`}
          />
        </div>
      ),
      className: "w-[32px] md:w-[40px] pl-2 md:pl-4",
    },
    {
      key: "name",
      header: "Name",
      isClickable: true,
      headerIcon: getHeaderIcon("name"),
      className:
        "w-full min-w-[100px] max-w-[130px] sm:max-w-[200px] md:max-w-[300px] lg:max-w-[400px]",
      render: (row) => (
        <div className="truncate" title={row.name}>
          <span
            className={cn(
              "font-medium text-sm",
              row.isInactive ? "text-muted" : "text-text",
            )}
          >
            {row.name}
          </span>
        </div>
      ),
    },
    {
      key: "size",
      header: "Size",
      isClickable: true,
      headerIcon: getHeaderIcon("size"),
      className: "text-muted text-sm hidden lg:table-cell whitespace-nowrap",
    },
    {
      key: "progress",
      header: "Progress",
      isClickable: true,
      headerIcon: getHeaderIcon("progress"),
      className: "min-w-[140px] w-[140px] sm:min-w-[160px] md:min-w-[200px]",
      render: (row) => (
        <div className="flex items-center gap-2 md:gap-3">
          <ProgressBar
            value={row.progress}
            className={cn("w-full", row.isInactive && "opacity-50")}
          />
          <span className="text-xs text-muted w-8 text-right shrink-0">
            {row.progress}%
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      isClickable: true,
      headerIcon: getHeaderIcon("status"),
      className: "hidden md:table-cell",
      render: (row) => <Badge variant={row.uiVariant}>{row.uiLabel}</Badge>,
    },
    {
      key: "downSpeed",
      header: "DL",
      isClickable: true,
      headerIcon: getHeaderIcon("downSpeed"),
      className: "text-right whitespace-nowrap",
      render: (row) => (
        <span
          className={cn(
            "text-xs md:text-sm",
            row.isInactive || row.downSpeed === "0 B/s"
              ? "text-muted"
              : "text-text",
          )}
        >
          {row.downSpeed}
        </span>
      ),
    },
    {
      key: "upSpeed",
      header: "UP",
      isClickable: true,
      headerIcon: getHeaderIcon("upSpeed"),
      className: "text-right whitespace-nowrap hidden sm:table-cell",
      render: (row) => (
        <span
          className={cn(
            "text-xs md:text-sm",
            row.isInactive || row.upSpeed === "0 B/s"
              ? "text-muted"
              : "text-text",
          )}
        >
          {row.upSpeed}
        </span>
      ),
    },
    {
      key: "addedDate",
      header: "Added",
      isClickable: true,
      headerIcon: getHeaderIcon("addedDate"),
      className: "text-right text-muted whitespace-nowrap hidden lg:table-cell",
      render: (row) => (
        <span className="text-xs md:text-sm">{row.addedDate}</span>
      ),
    },
    {
      key: "seeds",
      header: "Seeds",
      isClickable: true,
      headerIcon: getHeaderIcon("seeds"),
      className: "hidden lg:table-cell text-right whitespace-nowrap",
      render: (row) => (
        <div
          className="flex items-baseline justify-end gap-1.5"
          title={`${row.connectedSeeds} seeders connected out of ${row.totalSeeds} in the swarm`}
        >
          <span
            className={cn(
              "text-sm",
              row.isInactive || row.connectedSeeds === 0
                ? "text-muted"
                : "text-text font-medium",
            )}
          >
            {row.connectedSeeds}
          </span>
          <span className="text-xs text-muted/50">/ {row.totalSeeds}</span>
        </div>
      ),
    },
    {
      key: "peers",
      header: "Peers",
      isClickable: true,
      headerIcon: getHeaderIcon("peers"),
      className: "hidden lg:table-cell text-right whitespace-nowrap",
      render: (row) => (
        <div
          className="flex items-baseline justify-end gap-1.5"
          title={`${row.connectedPeers} peers connected out of ${row.totalPeers} in the swarm`}
        >
          <span
            className={cn(
              "text-sm",
              row.isInactive || row.connectedPeers === 0
                ? "text-muted"
                : "text-text font-medium",
            )}
          >
            {row.connectedPeers}
          </span>
          <span className="text-xs text-muted/50">/ {row.totalPeers}</span>
        </div>
      ),
    },
  ];
};
