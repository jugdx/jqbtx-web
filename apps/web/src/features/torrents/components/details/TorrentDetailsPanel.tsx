import { Tabs, Tab, Button, cn } from "@jqbtx/ui";
import { useTorrentDetails } from "../../model/useTorrentDetails";
import { FileItemCard } from "./FileItemCard";
import { TrackerItemCard } from "./TrackerItemCard";

interface TorrentDetailsPanelProps {
  hash: string | null;
  torrentName?: string;
  onClose: () => void;
}

export function TorrentDetailsPanel({
  hash,
  torrentName,
  onClose,
}: TorrentDetailsPanelProps) {
  const { isLoading, properties, files, trackers, updateFilePriority } =
    useTorrentDetails(hash);

  return (
    <>
      {hash && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <div
        className={cn(
          "fixed top-0 right-0 h-screen w-[450px] bg-panel border-l border-border z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out",
          hash ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
          <div className="truncate pr-4">
            <h2 className="text-lg font-bold text-text truncate">
              {torrentName || "Details"}
            </h2>
            <span className="text-xs text-muted font-mono">{hash}</span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            title="Close panel"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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

        <div className="flex-1 overflow-y-auto">
          {isLoading && !properties ? (
            <div className="flex items-center justify-center h-full text-muted animate-pulse">
              Loading details...
            </div>
          ) : (
            <Tabs variant="underline" defaultValue="general">
              <Tab title="General" value="general">
                <div className="p-6 grid grid-cols-2 gap-4">
                  <DetailItem
                    label="Save Path"
                    value={properties?.savePath || ""}
                    className="col-span-2"
                  />
                  <DetailItem
                    label="Creation Date"
                    value={properties?.creationDate || ""}
                  />
                  <DetailItem
                    label="Share Ratio"
                    value={properties?.shareRatio || ""}
                  />
                  <DetailItem
                    label="Downloaded"
                    value={properties?.downloaded || ""}
                  />
                  <DetailItem
                    label="Uploaded"
                    value={properties?.uploaded || ""}
                  />
                  <DetailItem label="Seeds" value={properties?.seeds || ""} />
                  <DetailItem label="Peers" value={properties?.peers || ""} />
                  <DetailItem
                    label="Piece Size"
                    value={properties?.pieceSize || ""}
                  />
                  <DetailItem
                    label="Total Pieces"
                    value={properties?.totalPieces || ""}
                  />
                </div>
              </Tab>

              <Tab title="Files" value="files">
                <div className="p-6 space-y-4">
                  {files.map((file) => (
                    <FileItemCard
                      key={file.id}
                      file={file}
                      onPriorityChange={updateFilePriority}
                    />
                  ))}
                </div>
              </Tab>

              <Tab title="Trackers" value="trackers">
                <div className="p-6 space-y-3">
                  {trackers.map((tracker, idx) => (
                    <TrackerItemCard key={idx} tracker={tracker} />
                  ))}
                </div>
              </Tab>
            </Tabs>
          )}
        </div>
      </div>
    </>
  );
}

function DetailItem({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col bg-background p-3 rounded-md border border-border",
        className,
      )}
    >
      <span className="text-xs text-muted uppercase tracking-wider mb-1">
        {label}
      </span>
      <span className="text-sm font-medium text-text">{value}</span>
    </div>
  );
}
