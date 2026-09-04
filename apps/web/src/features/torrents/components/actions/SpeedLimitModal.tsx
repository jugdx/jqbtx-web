import { useState, useEffect } from "react";
import { Modal, Button, Input } from "@jqbtx/ui";

interface SpeedLimitModalProps {
  isOpen: boolean;
  count: number;
  onClose: () => void;
  onConfirm: (dlLimit: number, upLimit: number) => void; // 0 = unlimited!
}

export function SpeedLimitModal({
  isOpen,
  count,
  onClose,
  onConfirm,
}: SpeedLimitModalProps) {
  const [dlLimit, setDlLimit] = useState("");
  const [upLimit, setUpLimit] = useState("");

  useEffect(() => {
    if (isOpen) {
      setDlLimit("");
      setUpLimit("");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedDl = dlLimit === "" ? 0 : parseInt(dlLimit, 10);
    const parsedUp = upLimit === "" ? 0 : parseInt(upLimit, 10);

    if (!isNaN(parsedDl) && !isNaN(parsedUp)) {
      onConfirm(parsedDl, parsedUp);
    }
  };

  const modalFooter = (
    <>
      <Button type="button" variant="ghost" onClick={onClose}>
        Cancel
      </Button>
      <Button type="submit" form="speed-limit-form">
        Apply Limits
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Torrent Speed Limits"
      footer={modalFooter}
    >
      <p className="text-text/80 mb-6 text-sm">
        Set specific bandwidth limits for the{" "}
        <span className="font-bold text-text">{count}</span> selected{" "}
        {count > 1 ? "transfers" : "transfer"}. Leave empty for infinite.
      </p>

      <form id="speed-limit-form" onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Download Limit (KiB/s)"
          type="number"
          min="0"
          step="1"
          value={dlLimit}
          onChange={(e) => setDlLimit(e.target.value)}
          placeholder="∞"
        />

        <Input
          label="Upload Limit (KiB/s)"
          type="number"
          min="0"
          step="1"
          value={upLimit}
          onChange={(e) => setUpLimit(e.target.value)}
          placeholder="∞"
        />
      </form>
    </Modal>
  );
}
