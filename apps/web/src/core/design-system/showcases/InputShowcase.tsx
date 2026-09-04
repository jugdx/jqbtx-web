import { Input } from "@jqbtx/ui";

export function InputShowcase() {
  return (
    <div className="max-w-3xl space-y-8 bg-panel border border-border p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-primary border-b border-border pb-4 mb-6">
        Input
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-text mb-4 opacity-80 uppercase tracking-wider">
            Default
          </h3>
          <div className="bg-background/50 p-6 rounded-lg border border-border/50 max-w-sm">
            <Input type="text" placeholder="Search a torrent..." />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-text mb-4 opacity-80 uppercase tracking-wider">
            With Label
          </h3>
          <div className="bg-background/50 p-6 rounded-lg border border-border/50 max-w-sm space-y-3">
            <div className="space-y-1">
              <label
                htmlFor="download-path"
                className="text-sm font-medium text-text"
              >
                Download path
              </label>
              <Input
                id="download-path"
                type="text"
                defaultValue="/media/downloads/completed"
              />
            </div>
            <p className="text-xs text-muted">Path to save downloaded files.</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-text mb-4 opacity-80 uppercase tracking-wider">
            States & Types
          </h3>
          <div className="bg-background/50 p-6 rounded-lg border border-border/50 space-y-4 max-w-sm">
            <div className="space-y-1">
              <span className="text-xs text-muted">Disabled</span>
              <Input disabled type="text" placeholder="Field disabled" />
            </div>

            <div className="space-y-1">
              <span className="text-xs text-muted">Password</span>
              <Input type="password" defaultValue="myPassword" />
            </div>

            <div className="space-y-1">
              <span className="text-xs text-muted">File (Upload)</span>
              <Input type="file" className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
