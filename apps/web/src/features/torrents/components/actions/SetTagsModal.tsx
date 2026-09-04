import { useState, useEffect } from "react";
import { Modal, Button, Input, Badge } from "@jqbtx/ui";
import { useSyncEngine } from "../../../../core/sync/SyncEngine";

interface SetTagsModalProps {
  isOpen: boolean;
  count: number;
  currentTags: string;
  onClose: () => void;
  onConfirm: (tags: string) => void;
}

export function SetTagsModal({
  isOpen,
  count,
  currentTags,
  onClose,
  onConfirm,
}: SetTagsModalProps) {
  const [tagsInput, setTagsInput] = useState("");
  const { tags: globalTags } = useSyncEngine();

  useEffect(() => {
    if (isOpen) {
      setTagsInput(currentTags);
    }
  }, [isOpen, currentTags]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(tagsInput);
  };

  const appendTag = (tag: string) => {
    const current = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (!current.includes(tag)) {
      current.push(tag);
      setTagsInput(current.join(", "));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Manage Tags (${count} item${count > 1 ? "s" : ""})`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-muted mb-2">
            Comma-separated tags
          </label>
          <Input
            autoFocus
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="e.g. 1080p, french, HDR"
          />
        </div>

        {globalTags.length > 0 && (
          <div className="pt-2">
            <span className="text-xs text-muted block mb-2">
              Available Tags:
            </span>
            <div className="flex flex-wrap gap-2">
              {globalTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => appendTag(tag)}
                  className="transition-transform active:scale-95"
                >
                  <Badge
                    variant="default"
                    className="hover:bg-primary/20 hover:text-primary cursor-pointer"
                  >
                    {tag}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="default">
            Apply Tags
          </Button>
        </div>
      </form>
    </Modal>
  );
}
