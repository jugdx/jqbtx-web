import { useSyncEngine } from "../../../../core/sync/SyncEngine";
import { cn } from "@jqbtx/ui";

export interface ContextMenuPosition {
  x: number;
  y: number;
}

interface TorrentContextMenuProps {
  position: ContextMenuPosition | null;
  targetCount: number;
  currentCategory?: string;
  onClose: () => void;
  onPause: () => void;
  onResume: () => void;
  onRecheck: () => void;
  onForceReannounce: () => void;
  onSetLocation: () => void;
  onSpeedLimit: () => void;
  onDelete: () => void;
  onSetCategory: (category: string) => void;
  onManageTags: () => void;
}

export function TorrentContextMenu({
  position,
  targetCount,
  currentCategory,
  onClose,
  onPause,
  onResume,
  onRecheck,
  onForceReannounce,
  onSetLocation,
  onSpeedLimit,
  onDelete,
  onSetCategory,
  onManageTags,
}: TorrentContextMenuProps) {
  const { categories } = useSyncEngine();
  const sortedCategories = Object.values(categories).sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  if (!position) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[100]"
        onClick={onClose}
        onContextMenu={(e) => {
          e.preventDefault();
          onClose();
        }}
      />
      <div
        className="fixed z-[101] w-56 bg-panel border border-border rounded-lg shadow-2xl py-1 animate-in fade-in zoom-in-95 duration-100"
        style={{ top: position.y, left: position.x }}
      >
        <div className="px-3 py-2 border-b border-border mb-1">
          <span className="text-xs font-semibold text-muted uppercase">
            Action for {targetCount} item{targetCount > 1 ? "s" : ""}
          </span>
        </div>

        <button
          onClick={() => {
            onResume();
            onClose();
          }}
          className="w-full text-left px-3 py-1.5 text-sm hover:bg-primary/20 hover:text-primary transition-colors"
        >
          Resume
        </button>
        <button
          onClick={() => {
            onPause();
            onClose();
          }}
          className="w-full text-left px-3 py-1.5 text-sm hover:bg-primary/20 hover:text-primary transition-colors mb-1"
        >
          Pause
        </button>

        <div className="h-px bg-border my-1" />

        <button
          onClick={() => {
            onForceReannounce();
            onClose();
          }}
          className="w-full text-left px-3 py-1.5 text-sm hover:bg-primary/20 hover:text-primary transition-colors"
        >
          Force Reannounce
        </button>
        <button
          onClick={() => {
            onRecheck();
            onClose();
          }}
          className="w-full text-left px-3 py-1.5 text-sm hover:bg-primary/20 hover:text-primary transition-colors mb-1"
        >
          Force Recheck
        </button>

        <div className="h-px bg-border my-1" />

        <button
          onClick={() => {
            onSetLocation();
            onClose();
          }}
          className="w-full text-left px-3 py-1.5 text-sm hover:bg-primary/20 hover:text-primary transition-colors"
        >
          Set Location...
        </button>
        <button
          onClick={() => {
            onSpeedLimit();
            onClose();
          }}
          className="w-full text-left px-3 py-1.5 text-sm hover:bg-primary/20 hover:text-primary transition-colors"
        >
          Speed Limits...
        </button>

        <div className="h-px bg-border my-1" />

        <div className="relative group">
          <button className="w-full px-3 py-1.5 text-sm hover:bg-primary/20 hover:text-primary transition-colors flex justify-between items-center">
            <span>Category</span>
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
              className="opacity-50"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          <div className="absolute left-full top-0 hidden group-hover:block pl-1">
            <div className="bg-panel border border-border rounded-md shadow-xl py-1 min-w-[160px] animate-in fade-in zoom-in-95">
              <button
                onClick={() => {
                  onSetCategory("");
                  onClose();
                }}
                className={cn(
                  "w-full text-left px-3 py-1.5 text-sm transition-colors",
                  !currentCategory
                    ? "text-primary font-bold bg-primary/10"
                    : "hover:bg-primary/20",
                )}
              >
                None
              </button>
              {sortedCategories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => {
                    onSetCategory(cat.name);
                    onClose();
                  }}
                  className={cn(
                    "w-full text-left px-3 py-1.5 text-sm transition-colors",
                    currentCategory === cat.name
                      ? "text-primary font-bold bg-primary/10"
                      : "hover:bg-primary/20",
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            onManageTags();
            onClose();
          }}
          className="w-full text-left px-3 py-1.5 text-sm hover:bg-primary/20 hover:text-primary transition-colors mb-1"
        >
          Manage Tags...
        </button>

        <div className="h-px bg-border my-1" />

        <button
          onClick={() => {
            onDelete();
            onClose();
          }}
          className="w-full text-left px-3 py-1.5 text-sm text-red-400 hover:bg-red-950 hover:text-red-300 transition-colors"
        >
          Delete...
        </button>
      </div>
    </>
  );
}
