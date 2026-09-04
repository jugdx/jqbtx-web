import { Select } from "@jqbtx/ui";

export function SelectShowcase() {
  return (
    <div className="max-w-3xl space-y-8 bg-panel border border-border p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-primary border-b border-border pb-4 mb-6">
        Select
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-text mb-4 opacity-80 uppercase tracking-wider">
            Default
          </h3>
          <div className="bg-background/50 p-6 rounded-lg border border-border/50 max-w-sm">
            <Select defaultValue="">
              <option value="" disabled>
                Select a category
              </option>
              <option value="radarr">Radarr (Films)</option>
              <option value="sonarr">Sonarr (Séries)</option>
              <option value="prowlarr">Prowlarr (Indexers)</option>
            </Select>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-text mb-4 opacity-80 uppercase tracking-wider">
            With Labels
          </h3>
          <div className="bg-background/50 p-6 rounded-lg border border-border/50 max-w-sm space-y-3">
            <div className="space-y-1">
              <label
                htmlFor="action-select"
                className="text-sm font-medium text-text"
              >
                Action at the end of the download
              </label>
              <Select id="action-select" defaultValue="pause">
                <option value="pause">Pause</option>
                <option value="seed">Continue Seeding</option>
                <option value="delete">Delete torrent</option>
              </Select>
            </div>
            <p className="text-xs text-muted">
              Set the default behavior once the download is ended.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-text mb-4 opacity-80 uppercase tracking-wider">
            States
          </h3>
          <div className="bg-background/50 p-6 rounded-lg border border-border/50 space-y-4 max-w-sm">
            <div className="space-y-1">
              <span className="text-xs text-muted">Disabled</span>
              <Select disabled defaultValue="locked">
                <option value="locked">Option locked</option>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
