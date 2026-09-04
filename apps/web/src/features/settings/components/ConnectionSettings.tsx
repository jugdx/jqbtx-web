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

interface ConnectionSettingsProps {
  preferences: RawPreferences;
  isSaving: boolean;
  onSave: (updates: Partial<RawPreferences>) => Promise<ActionResult>;
}

export function ConnectionSettings({
  preferences,
  isSaving,
  onSave,
}: ConnectionSettingsProps) {
  const { toast } = useToast();

  const [listenPort, setListenPort] = useState(
    preferences.listen_port?.toString() || "6881",
  );
  const [upnp, setUpnp] = useState(preferences.upnp ?? true);

  const [maxConnec, setMaxConnec] = useState(
    preferences.max_connec?.toString() || "500",
  );
  const [maxConnecPerTorrent, setMaxConnecPerTorrent] = useState(
    preferences.max_connec_per_torrent?.toString() || "100",
  );
  const [maxUploads, setMaxUploads] = useState(
    preferences.max_uploads?.toString() || "20",
  );
  const [maxUploadsPerTorrent, setMaxUploadsPerTorrent] = useState(
    preferences.max_uploads_per_torrent?.toString() || "4",
  );

  const hasChanges =
    listenPort !== (preferences.listen_port?.toString() || "6881") ||
    upnp !== (preferences.upnp ?? true) ||
    maxConnec !== (preferences.max_connec?.toString() || "500") ||
    maxConnecPerTorrent !==
      (preferences.max_connec_per_torrent?.toString() || "100") ||
    maxUploads !== (preferences.max_uploads?.toString() || "20") ||
    maxUploadsPerTorrent !==
      (preferences.max_uploads_per_torrent?.toString() || "4");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await onSave({
      listen_port: parseInt(listenPort, 10),
      upnp: upnp,
      max_connec: parseInt(maxConnec, 10),
      max_connec_per_torrent: parseInt(maxConnecPerTorrent, 10),
      max_uploads: parseInt(maxUploads, 10),
      max_uploads_per_torrent: parseInt(maxUploadsPerTorrent, 10),
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
          Listening Port
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Port used for incoming connections"
            type="number"
            min="1"
            max="65535"
            value={listenPort}
            onChange={(e) => setListenPort(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Checkbox
            id="upnp-toggle"
            checked={upnp}
            onChange={(e) => setUpnp((e.target as HTMLInputElement).checked)}
          />
          <label
            htmlFor="upnp-toggle"
            className="text-sm font-medium text-text cursor-pointer"
          >
            Use UPnP / NAT-PMP port forwarding from my router
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-text border-b border-border pb-2">
          Connection Limits
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input
              label="Global maximum number of connections"
              type="number"
              min="-1"
              value={maxConnec}
              onChange={(e) => setMaxConnec(e.target.value)}
            />
            <Input
              label="Global maximum number of upload slots"
              type="number"
              min="-1"
              value={maxUploads}
              onChange={(e) => setMaxUploads(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <Input
              label="Maximum number of connections per torrent"
              type="number"
              min="-1"
              value={maxConnecPerTorrent}
              onChange={(e) => setMaxConnecPerTorrent(e.target.value)}
            />
            <Input
              label="Maximum number of upload slots per torrent"
              type="number"
              min="-1"
              value={maxUploadsPerTorrent}
              onChange={(e) => setMaxUploadsPerTorrent(e.target.value)}
            />
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
