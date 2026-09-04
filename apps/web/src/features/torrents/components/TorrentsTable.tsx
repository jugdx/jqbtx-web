import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Alert, Button, Select, Table, cn } from "@jqbtx/ui";
import { getTorrentColumns } from "./TorrentsColumns";
import { useTorrents } from "../model/useTorrents";
import { BulkActionBar } from "./actions/BulkActionBar";
import { DeleteModal } from "./delete/DeleteModal";
import { SetLocationModal } from "./actions/SetLocationModal";
import { SpeedLimitModal } from "./actions/SpeedLimitModal";
import { TorrentDetailsPanel } from "./details/TorrentDetailsPanel";
import {
  TorrentContextMenu,
  type ContextMenuPosition,
} from "./actions/TorrentContextMenu";
import { SetTagsModal } from "./actions/SetTagsModal";

export function TorrentsTable() {
  const { statusId, categoryName, tagName } = useParams<{
    statusId?: string;
    categoryName?: string;
    tagName?: string;
  }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSetLocationModalOpen, setIsSetLocationModalOpen] = useState(false);
  const [isSpeedLimitModalOpen, setIsSpeedLimitModalOpen] = useState(false);
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);
  const [activeTorrentDetails, setActiveTorrentDetails] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [contextMenuPos, setContextMenuPos] =
    useState<ContextMenuPosition | null>(null);
  const [contextTargetId, setContextTargetId] = useState<string | null>(null);

  const {
    torrents,
    isLoading,
    error,
    sortConfig,
    onSortChange,
    selectedIds,
    toggleSelection,
    toggleAll,
    clearSelection,
    pauseTorrents,
    resumeTorrents,
    deleteTorrents,
    recheckTorrents,
    forceReannounce,
    setLocation,
    setSpeedLimit,
    assignCategory,
    assignTags,
  } = useTorrents(statusId, categoryName, tagName, searchQuery);

  const isAllSelected =
    torrents.length > 0 && torrents.every((t) => selectedIds.has(t.id));

  const handleToggleAll = () => {
    const currentDisplayedIds = torrents.map((t) => t.id);
    toggleAll(currentDisplayedIds, !isAllSelected);
  };

  const columns = useMemo(
    () =>
      getTorrentColumns(
        sortConfig,
        selectedIds,
        isAllSelected,
        toggleSelection,
        handleToggleAll,
      ),
    [sortConfig, selectedIds, isAllSelected, toggleSelection, handleToggleAll],
  );

  const handleContextMenu = (e: React.MouseEvent, row: any) => {
    e.preventDefault();
    setContextMenuPos({ x: e.clientX, y: e.clientY });
    setContextTargetId(row.id);
  };

  const getContextTargets = () => {
    if (!contextTargetId) return undefined;
    return selectedIds.has(contextTargetId) ? undefined : [contextTargetId];
  };

  const targetCount = getContextTargets()?.length || selectedIds.size;
  const currentTarget = contextTargetId
    ? torrents.find((t) => t.id === contextTargetId)
    : null;
  const currentSavePath = currentTarget?.savePath || "";
  const currentCategory = currentTarget?.category;
  const currentTags = currentTarget?.tags || "";

  const handleConfirmDelete = (deleteFiles: boolean) => {
    deleteTorrents(deleteFiles, getContextTargets());
    setIsDeleteModalOpen(false);
  };

  const handleConfirmSetLocation = (newPath: string) => {
    setLocation(newPath, getContextTargets());
    setIsSetLocationModalOpen(false);
  };

  const handleConfirmSpeedLimit = (dlLimit: number, upLimit: number) => {
    setSpeedLimit(dlLimit, upLimit, getContextTargets());
    setIsSpeedLimitModalOpen(false);
  };

  const handleSetCategory = (category: string) => {
    assignCategory(category, getContextTargets());
  };

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (isLoading && torrents.length === 0)
    return (
      <div className="p-8 text-center text-muted animate-pulse">
        Loading transfers...
      </div>
    );

  return (
    <>
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          selectedIds.size > 0 ? "pb-24" : "pb-0",
        )}
      >
        <div className="flex md:hidden items-center justify-between mb-4 gap-3">
          <span className="text-xs font-semibold text-muted uppercase tracking-wider shrink-0">
            Sort
          </span>
          <div className="flex items-center gap-2">
            <Select
              value={sortConfig?.key || "name"}
              onChange={(e) => {
                if (e.target.value !== sortConfig?.key) {
                  onSortChange(e.target.value);
                }
              }}
              className="w-40"
            >
              <option value="name">Name</option>
              <option value="size">Size</option>
              <option value="progress">Progress</option>
              <option value="status">Status</option>
              <option value="downSpeed">Down Speed</option>
              <option value="upSpeed">Up Speed</option>
              <option value="addedDate">Added</option>
              <option value="seeds">Seeds</option>
              <option value="peers">Peers</option>
            </Select>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSortChange(sortConfig?.key || "name")}
              aria-label="Toggle sort direction"
              className="shrink-0 bg-panel border border-border"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                {sortConfig?.direction === "desc" ? (
                  <>
                    <path d="m3 16 4 4 4-4" />
                    <path d="M7 20V4" />
                    <path d="M14 4h7" />
                    <path d="M14 8h5" />
                    <path d="M14 12h3" />
                  </>
                ) : (
                  <>
                    <path d="m3 8 4-4 4 4" />
                    <path d="M7 4v16" />
                    <path d="M14 4h7" />
                    <path d="M14 8h5" />
                    <path d="M14 12h3" />
                  </>
                )}
              </svg>
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          data={torrents}
          keyExtractor={(row) => row.id}
          onHeaderClick={onSortChange}
          onRowClick={(row) =>
            setActiveTorrentDetails({ id: row.id, name: row.name })
          }
          onRowContextMenu={handleContextMenu}
        />
      </div>

      <BulkActionBar
        selectedCount={selectedIds.size}
        onClear={clearSelection}
        onPause={() => pauseTorrents()}
        onResume={() => resumeTorrents()}
        onDelete={() => {
          setContextTargetId(null);
          setIsDeleteModalOpen(true);
        }}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        count={targetCount}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <SetLocationModal
        isOpen={isSetLocationModalOpen}
        count={targetCount}
        currentPath={currentSavePath}
        onClose={() => setIsSetLocationModalOpen(false)}
        onConfirm={handleConfirmSetLocation}
      />

      <SpeedLimitModal
        isOpen={isSpeedLimitModalOpen}
        count={targetCount}
        onClose={() => setIsSpeedLimitModalOpen(false)}
        onConfirm={handleConfirmSpeedLimit}
      />

      <SetTagsModal
        isOpen={isTagsModalOpen}
        count={targetCount}
        currentTags={currentTags}
        onClose={() => setIsTagsModalOpen(false)}
        onConfirm={(tagsStr) => {
          assignTags(tagsStr, getContextTargets());
          setIsTagsModalOpen(false);
        }}
      />

      <TorrentDetailsPanel
        hash={activeTorrentDetails?.id || null}
        torrentName={activeTorrentDetails?.name}
        onClose={() => setActiveTorrentDetails(null)}
      />

      <TorrentContextMenu
        position={contextMenuPos}
        targetCount={targetCount}
        currentCategory={currentCategory}
        onClose={() => setContextMenuPos(null)}
        onPause={() => pauseTorrents(getContextTargets())}
        onResume={() => resumeTorrents(getContextTargets())}
        onRecheck={() => recheckTorrents(getContextTargets())}
        onForceReannounce={() => forceReannounce(getContextTargets())}
        onSetLocation={() => setIsSetLocationModalOpen(true)}
        onSpeedLimit={() => setIsSpeedLimitModalOpen(true)}
        onDelete={() => setIsDeleteModalOpen(true)}
        onSetCategory={handleSetCategory}
        onManageTags={() => setIsTagsModalOpen(true)}
      />
    </>
  );
}
