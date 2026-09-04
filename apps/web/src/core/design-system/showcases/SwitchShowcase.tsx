import { Switch } from "@jqbtx/ui";

export function SwitchShowcase() {
  return (
    <div className="max-w-3xl space-y-8 bg-panel border border-border p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-primary border-b border-border pb-4 mb-6">
        Switch
      </h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-text mb-4 opacity-80 uppercase tracking-wider">
            Default
          </h3>
          <div className="bg-background/50 p-6 rounded-lg border border-border/50 max-w-sm flex gap-8">
            <div className="flex flex-col gap-3 items-center">
              <Switch />
              <span className="text-xs text-muted">Unchecked</span>
            </div>

            <div className="flex flex-col gap-3 items-center">
              <Switch defaultChecked />
              <span className="text-xs text-muted">Checked</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-text mb-4 opacity-80 uppercase tracking-wider">
            With Label
          </h3>
          <div className="bg-background/50 p-6 rounded-lg border border-border/50 max-w-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5 pr-4">
                <label className="text-sm font-medium text-text">
                  Activate DHT
                </label>
                <p className="text-xs text-muted">
                  Uncentralized network to find pairs without trackers.
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between border-t border-border/50 pt-6">
              <div className="space-y-0.5 pr-4">
                <label className="text-sm font-medium text-text">
                  Alternative limits
                </label>
                <p className="text-xs text-muted">Apply the global profile.</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-text mb-4 opacity-80 uppercase tracking-wider">
            States
          </h3>
          <div className="bg-background/50 p-6 rounded-lg border border-border/50 max-w-sm flex gap-8">
            <div className="flex flex-col gap-3 items-center">
              <Switch disabled />
              <span className="text-xs text-muted">Disabled</span>
            </div>

            <div className="flex flex-col gap-3 items-center">
              <Switch disabled defaultChecked />
              <span className="text-xs text-muted">Disabled Checked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
