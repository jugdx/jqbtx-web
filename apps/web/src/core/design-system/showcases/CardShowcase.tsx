import { Card, Button, Input, Switch } from "@jqbtx/ui";

export function CardShowcase() {
  return (
    <div className="max-w-3xl space-y-8 bg-panel border border-border p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-primary border-b border-border pb-4 mb-6">
        Card
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-text mb-4 opacity-80 uppercase tracking-wider">
            Simple
          </h3>
          <Card
            title="Disk space"
            description="Available storage at /media/downloads"
            className="max-w-sm"
          >
            <div className="text-3xl font-bold text-text">2.4 TB</div>
            <p className="text-xs text-muted mt-1">About 45 films in 4K.</p>
          </Card>
        </div>

        <div>
          <h3 className="text-sm font-medium text-text mb-4 opacity-80 uppercase tracking-wider">
            Interactive Settings
          </h3>
          <Card
            title="Connection Settings"
            description="Setup port forwarding."
            className="max-w-md"
            footer={
              <div className="flex justify-end w-full gap-3 pt-4">
                <Button variant="ghost">Cancel</Button>
                <Button>Save</Button>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Port</label>
                <Input defaultValue="6881" />
              </div>
              <div className="flex items-center justify-between border-t border-border/50 pt-4">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium text-text">
                    UPnP / NAT-PMP
                  </label>
                  <p className="text-xs text-muted">
                    Automated port redirection.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
