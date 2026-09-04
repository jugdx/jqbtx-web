import { useState, useEffect } from "react";
import { Button } from "@jqbtx/ui";
import { useAddTorrent } from "../../model/useAddTorrent";
import { AddTorrentModal } from "./AddTorrentModal";

export function AddTorrentAction({ className = "" }: { className?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialFiles, setInitialFiles] = useState<FileList | null>(null);
  const { addTorrents, isAdding, error } = useAddTorrent();

  useEffect(() => {
    const handleGlobalDrop = (e: Event) => {
      const customEvent = e as CustomEvent<{ files: FileList }>;
      setInitialFiles(customEvent.detail.files);
      setIsModalOpen(true);
    };

    window.addEventListener("jqbtx:add-torrents", handleGlobalDrop);
    return () =>
      window.removeEventListener("jqbtx:add-torrents", handleGlobalDrop);
  }, []);

  const handleAddSubmit = (urls: string, files: FileList | null) => {
    addTorrents(urls, files, () => {
      setIsModalOpen(false);
      setInitialFiles(null);
    });
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setInitialFiles(null);
  };

  return (
    <div className={className}>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="shrink-0 whitespace-nowrap"
      >
        + Add Torrent
      </Button>

      <AddTorrentModal
        isOpen={isModalOpen}
        isAdding={isAdding}
        error={error}
        initialFiles={initialFiles}
        onClose={handleClose}
        onAdd={handleAddSubmit}
      />
    </div>
  );
}
