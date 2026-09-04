import { useSyncEngine } from "../../../../core/sync/SyncEngine";
import { formatBytes, Label, cn } from "@jqbtx/ui";

export function LiveTransferStats({ className = "" }: { className?: string }) {
  const { serverState } = useSyncEngine();

  const downSpeed = serverState?.dl_info_speed
    ? `${formatBytes(serverState.dl_info_speed)}/s`
    : "0 B/s";
  const upSpeed = serverState?.up_info_speed
    ? `${formatBytes(serverState.up_info_speed)}/s`
    : "0 B/s";
  const freeSpace = serverState?.free_space_on_disk
    ? formatBytes(serverState.free_space_on_disk)
    : "Unknown";

  return (
    <div className={cn("flex items-center gap-6 text-sm shrink-0", className)}>
      <Label variant="info" icon="↓">
        {downSpeed}
      </Label>
      <Label variant="success" icon="↑">
        {upSpeed}
      </Label>
      <div className="border-l border-border/50 pl-4 hidden md:block">
        <Label variant="muted">Free space: {freeSpace}</Label>
      </div>
    </div>
  );
}
