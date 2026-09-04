import { useState } from "react";
import {
  Input,
  Button,
  Checkbox,
  type ActionResult,
  useToast,
  resolveToast,
} from "@jqbtx/ui";
import type { RawPreferences } from "@jqbtx/api";

interface DownloadsSettingsProps {
  preferences: RawPreferences;
  isSaving: boolean;
  onSave: (updates: Partial<RawPreferences>) => Promise<ActionResult>;
}

export function DownloadsSettings({
  preferences,
  isSaving,
  onSave,
}: DownloadsSettingsProps) {
  const { toast } = useToast();
  const [savePath, setSavePath] = useState(preferences.save_path || "");
  const [tempPathEnabled, setTempPathEnabled] = useState(
    preferences.temp_path_enabled ?? false,
  );
  const [tempPath, setTempPath] = useState(preferences.temp_path || "");

  const hasChanges =
    savePath !== (preferences.save_path || "") ||
    tempPathEnabled !== (preferences.temp_path_enabled ?? false) ||
    tempPath !== (preferences.temp_path || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await onSave({
      save_path: savePath.trim(),
      temp_path_enabled: tempPathEnabled,
      temp_path: tempPath.trim(),
    });

    toast(...resolveToast(result));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 w-full animate-in fade-in"
    >
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-text border-b border-border pb-2">
          Save Management
        </h3>

        <div className="space-y-6">
          <Input
            label="Default Save Path"
            value={savePath}
            onChange={(e) => setSavePath(e.target.value)}
            placeholder="/mnt/tank/downloads/complete"
          />

          <div className="space-y-4 p-4 bg-muted/5 border border-border rounded-md">
            <div className="flex items-center gap-3">
              <Checkbox
                id="temp-path-toggle"
                checked={tempPathEnabled}
                onChange={(e) =>
                  setTempPathEnabled((e.target as HTMLInputElement).checked)
                }
              />
              <label
                htmlFor="temp-path-toggle"
                className="text-sm font-medium text-text cursor-pointer"
              >
                Keep incomplete torrents in:
              </label>
            </div>

            <div className="pl-7">
              <Input
                label="Incomplete Save Path"
                value={tempPath}
                onChange={(e) => setTempPath(e.target.value)}
                placeholder="/mnt/storage/downloads/incomplete"
                disabled={!tempPathEnabled}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit" disabled={!hasChanges || isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
