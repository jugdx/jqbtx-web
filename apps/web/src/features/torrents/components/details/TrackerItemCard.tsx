import { Badge } from "@jqbtx/ui";
import { type TorrentTrackerView } from "../../model/useTorrentDetails";

export function TrackerItemCard({ tracker }: { tracker: TorrentTrackerView }) {
  const isWorking = tracker.status === "Working";

  return (
    <div className="flex flex-col p-3 bg-background rounded-md border border-border">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-mono text-text truncate pr-4">
          {tracker.url}
        </span>
        <Badge variant={isWorking ? "success" : "default"}>
          {tracker.status}
        </Badge>
      </div>
      <div className="flex gap-4 text-xs text-muted">
        <span>Peers: {tracker.peers}</span>
        <span>Seeds: {tracker.seeds}</span>
      </div>
    </div>
  );
}
