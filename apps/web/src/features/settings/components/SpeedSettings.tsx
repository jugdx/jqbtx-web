import { useState } from "react";
import {
  Input,
  Button,
  useToast,
  resolveToast,
  type ActionResult,
} from "@jqbtx/ui";
import type { RawPreferences } from "@jqbtx/api";

interface SpeedSettingsProps {
  preferences: RawPreferences;
  isSaving: boolean;
  onSave: (updates: Partial<RawPreferences>) => Promise<ActionResult>;
}

export function SpeedSettings({
  preferences,
  isSaving,
  onSave,
}: SpeedSettingsProps) {
  const { toast } = useToast();

  const [dlLimit, setDlLimit] = useState(
    preferences.dl_limit === 0 ? "" : (preferences.dl_limit / 1024).toString(),
  );
  const [upLimit, setUpLimit] = useState(
    preferences.up_limit === 0 ? "" : (preferences.up_limit / 1024).toString(),
  );
  const [altDlLimit, setAltDlLimit] = useState(
    preferences.alt_dl_limit === 0
      ? ""
      : (preferences.alt_dl_limit / 1024).toString(),
  );
  const [altUpLimit, setAltUpLimit] = useState(
    preferences.alt_up_limit === 0
      ? ""
      : (preferences.alt_up_limit / 1024).toString(),
  );

  const hasChanges =
    (preferences.dl_limit === 0 ? "" : String(preferences.dl_limit / 1024)) !==
      dlLimit ||
    (preferences.up_limit === 0 ? "" : String(preferences.up_limit / 1024)) !==
      upLimit ||
    (preferences.alt_dl_limit === 0
      ? ""
      : String(preferences.alt_dl_limit / 1024)) !== altDlLimit ||
    (preferences.alt_up_limit === 0
      ? ""
      : String(preferences.alt_up_limit / 1024)) !== altUpLimit;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await onSave({
      dl_limit: dlLimit === "" ? 0 : parseInt(dlLimit, 10) * 1024,
      up_limit: upLimit === "" ? 0 : parseInt(upLimit, 10) * 1024,
      alt_dl_limit: altDlLimit === "" ? 0 : parseInt(altDlLimit, 10) * 1024,
      alt_up_limit: altUpLimit === "" ? 0 : parseInt(altUpLimit, 10) * 1024,
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
          Global Rate Limits
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Download (KiB/s)"
            type="number"
            min="0"
            value={dlLimit}
            onChange={(e) => setDlLimit(e.target.value)}
            placeholder="∞"
          />
          <Input
            label="Upload (KiB/s)"
            type="number"
            min="0"
            value={upLimit}
            onChange={(e) => setUpLimit(e.target.value)}
            placeholder="∞"
          />
        </div>
        <p className="text-xs text-muted">
          Leave empty or set to 0 for unlimited bandwidth.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-text border-b border-border pb-2">
          Alternative Rate Limits
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Alt Download (KiB/s)"
            type="number"
            min="0"
            value={altDlLimit}
            onChange={(e) => setAltDlLimit(e.target.value)}
            placeholder="∞"
          />
          <Input
            label="Alt Upload (KiB/s)"
            type="number"
            min="0"
            value={altUpLimit}
            onChange={(e) => setAltUpLimit(e.target.value)}
            placeholder="∞"
          />
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
