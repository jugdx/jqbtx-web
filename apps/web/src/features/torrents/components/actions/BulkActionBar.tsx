import { Button, Badge } from "@jqbtx/ui";

interface BulkActionBarProps {
  selectedCount: number;
  onClear: () => void;
  onPause: () => void;
  onResume: () => void;
  onDelete: () => void;
}

export function BulkActionBar({
  selectedCount,
  onClear,
  onPause,
  onResume,
  onDelete,
}: BulkActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-8 left-64 right-0 z-50 flex justify-center pointer-events-none animate-in slide-in-from-bottom-8 fade-in duration-200">
      <div className="flex items-center gap-4 px-6 py-3 bg-panel border border-border shadow-2xl rounded-full pointer-events-auto">
        <div className="flex items-center gap-3 pr-4 border-r border-border/50">
          <Badge className="bg-primary/20 text-primary border-transparent px-2 py-1 text-xs">
            {selectedCount}
          </Badge>
          <span className="text-sm font-medium text-text whitespace-nowrap">
            Selected
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClear}
            className="ml-1 h-6 w-6 text-muted hover:text-text"
            title="Clear selection"
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
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onPause}
            className="h-8"
          >
            Pause
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={onResume}
            className="h-8"
          >
            Resume
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onDelete}
            className="h-8 ml-2"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
