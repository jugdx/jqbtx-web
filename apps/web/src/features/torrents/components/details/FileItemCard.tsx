import { ProgressBar, Select, cn } from "@jqbtx/ui";
import { type TorrentFileView } from "../../model/useTorrentDetails";

interface FileItemCardProps {
  file: TorrentFileView;
  onPriorityChange: (id: number, priority: number) => void;
}

export function FileItemCard({ file, onPriorityChange }: FileItemCardProps) {
  const getPriorityStyles = () => {
    switch (file.priority) {
      case 0:
        return {
          card: "bg-background/40 border-border/40 opacity-75",
          text: "text-muted line-through",
          icon: (
            <svg
              className="text-muted shrink-0"
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
              <circle cx="12" cy="12" r="10" />
              <line x1="4.93" x2="19.07" y1="4.93" y2="19.07" />
            </svg>
          ),
        };
      case 6:
        return {
          card: "bg-info/5 border-info/30",
          text: "text-info font-semibold",
          icon: (
            <svg
              className="text-info shrink-0"
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
              <path d="m18 15-6-6-6 6" />
            </svg>
          ),
        };
      case 7:
        return {
          card: "bg-warning/5 border-warning/30",
          text: "text-warning font-bold",
          icon: (
            <svg
              className="text-warning shrink-0"
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
              <path d="m18 11-6-6-6 6" />
              <path d="m18 18-6-6-6 6" />
            </svg>
          ),
        };
      default:
        return {
          card: "bg-background border-border",
          text: "text-text font-medium",
          icon: null,
        };
    }
  };

  const styles = getPriorityStyles();

  return (
    <div
      className={cn(
        "p-3 rounded-md border transition-all duration-200",
        styles.card,
      )}
    >
      <div className="flex items-start justify-between mb-2 gap-4">
        <div className="flex items-center gap-2 overflow-hidden">
          {styles.icon}
          <span className={cn("text-sm truncate", styles.text)}>
            {file.name}
          </span>
        </div>
        <span className="text-xs text-muted whitespace-nowrap pt-0.5">
          {file.size}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <ProgressBar value={file.progress} className="flex-1" />
        <span className="text-xs text-muted w-8 text-right shrink-0">
          {file.progress}%
        </span>

        <Select
          value={file.priority}
          onChange={(e) =>
            onPriorityChange(file.id, parseInt(e.target.value, 10))
          }
          containerClassName="w-32 shrink-0"
          className="h-7 py-0 pl-2 pr-7 text-xs bg-panel"
        >
          <option value={0}>Mix / Don't DL</option>
          <option value={1}>Normal</option>
          <option value={6}>High</option>
          <option value={7}>Maximum</option>
        </Select>
      </div>
    </div>
  );
}
