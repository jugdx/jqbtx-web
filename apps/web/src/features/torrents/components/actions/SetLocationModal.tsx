import { useState, useEffect } from "react";
import { Modal, Button, Input } from "@jqbtx/ui";

interface SetLocationModalProps {
  isOpen: boolean;
  count: number;
  currentPath?: string;
  onClose: () => void;
  onConfirm: (newPath: string) => void;
}

export function SetLocationModal({
  isOpen,
  count,
  currentPath = "",
  onClose,
  onConfirm,
}: SetLocationModalProps) {
  const [path, setPath] = useState("");

  useEffect(() => {
    if (isOpen) {
      setPath(currentPath);
    }
  }, [isOpen, currentPath]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (path.trim()) {
      onConfirm(path.trim());
    }
  };

  const modalFooter = (
    <>
      <Button type="button" variant="ghost" onClick={onClose}>
        Cancel
      </Button>
      <Button
        type="submit"
        form="set-location-form"
        disabled={!path.trim() || path === currentPath}
      >
        Move Files
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Set Location"
      footer={modalFooter}
    >
      <p className="text-text/80 mb-6 text-sm">
        Change the save path for the{" "}
        <span className="font-bold text-text">{count}</span> selected{" "}
        {count > 1 ? "transfers" : "transfer"}.
      </p>

      <form id="set-location-form" onSubmit={handleSubmit}>
        <Input
          label="New Save Path"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          placeholder="/downloads/movies"
          autoFocus
        />
      </form>
    </Modal>
  );
}
