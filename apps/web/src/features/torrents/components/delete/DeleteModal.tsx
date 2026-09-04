import { useState, useEffect } from "react";
import { Modal, Button, Checkbox } from "@jqbtx/ui";

interface DeleteModalProps {
  isOpen: boolean;
  count: number;
  onClose: () => void;
  onConfirm: (deleteFiles: boolean) => void;
}

export function DeleteModal({
  isOpen,
  count,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  const [deleteFiles, setDeleteFiles] = useState(false);

  useEffect(() => {
    if (!isOpen) setDeleteFiles(false);
  }, [isOpen]);

  const modalFooter = (
    <>
      <Button variant="ghost" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="danger" onClick={() => onConfirm(deleteFiles)}>
        Confirm Deletion
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={<span className="text-danger">Delete Torrents</span>}
      footer={modalFooter}
    >
      <p className="text-text/80 mb-6 text-sm">
        Are you sure you want to remove the{" "}
        <span className="font-bold text-text">{count}</span> selected{" "}
        {count > 1 ? "transfers" : "transfer"} from your client?
      </p>

      <div className="mb-2 p-4 rounded-md bg-danger/10 border border-danger/20">
        <Checkbox
          checked={deleteFiles}
          onChange={(e) => setDeleteFiles(e.target.checked)}
          label={
            <span className="text-danger">
              Also delete the files on the hard drive
            </span>
          }
        />
      </div>
    </Modal>
  );
}
