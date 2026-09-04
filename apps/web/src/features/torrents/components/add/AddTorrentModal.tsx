import { useState, useEffect, useRef } from "react";
import { Modal, Button, Input, TextArea, Alert } from "@jqbtx/ui";

interface AddTorrentModalProps {
  isOpen: boolean;
  isAdding: boolean;
  error: string | null;
  initialFiles?: FileList | null;
  onClose: () => void;
  onAdd: (urls: string, files: FileList | null) => void;
}

export function AddTorrentModal({
  isOpen,
  isAdding,
  error,
  initialFiles,
  onClose,
  onAdd,
}: AddTorrentModalProps) {
  const [urls, setUrls] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialFiles && isOpen) {
      setFiles(initialFiles);

      if (fileInputRef.current) {
        fileInputRef.current.files = initialFiles;
      }
    }
  }, [initialFiles, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(urls, files);
  };

  const resetAndClose = () => {
    setUrls("");
    setFiles(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  const modalFooter = (
    <>
      <Button
        type="button"
        variant="ghost"
        onClick={resetAndClose}
        disabled={isAdding}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        form="add-torrent-form"
        disabled={isAdding || (!urls && !files?.length)}
      >
        {isAdding ? "Adding..." : "Add Torrents"}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={resetAndClose}
      title="Add New Torrents"
      footer={modalFooter}
    >
      {error && (
        <Alert variant="danger" size="sm" className="mb-6">
          {error}
        </Alert>
      )}

      <form id="add-torrent-form" onSubmit={handleSubmit} className="space-y-6">
        <TextArea
          label="Magnet Links or HTTP URLs"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          placeholder="One link per line..."
          disabled={isAdding}
        />

        <div className="flex items-center gap-4">
          <div className="h-px bg-border flex-1"></div>
          <span className="text-xs text-muted uppercase font-bold tracking-wider">
            OR
          </span>
          <div className="h-px bg-border flex-1"></div>
        </div>

        <div>
          <Input
            ref={fileInputRef}
            label="Torrent Files"
            type="file"
            multiple
            accept=".torrent"
            onChange={(e) => setFiles((e.target as HTMLInputElement).files)}
            className="h-auto p-1.5 text-muted file:mr-4 file:py-1.5 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer transition-colors"
            disabled={isAdding}
          />
        </div>
      </form>
    </Modal>
  );
}
