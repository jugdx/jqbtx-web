import { Label } from "@jqbtx/ui";

export function LabelShowcase() {
  return (
    <div className="max-w-3xl space-y-8 bg-panel border border-border p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-primary border-b border-border pb-4 mb-6">
        Label
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-text mb-4 opacity-80 uppercase tracking-wider">
            Variants
          </h3>
          <div className="flex flex-wrap gap-6 items-center bg-background/50 p-6 rounded-lg border border-border/50">
            <div className="flex flex-col items-center gap-2">
              <Label variant="default">Default</Label>
              <span className="text-xs text-muted">default</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Label variant="info">Info</Label>
              <span className="text-xs text-muted">info</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Label variant="success">Success</Label>
              <span className="text-xs text-muted">success</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Label variant="warning">Warning</Label>
              <span className="text-xs text-muted">warning</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Label variant="danger">Danger</Label>
              <span className="text-xs text-muted">danger</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Label variant="muted">Muted</Label>
              <span className="text-xs text-muted">muted</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-text mb-4 opacity-80 uppercase tracking-wider">
            With Icons
          </h3>
          <div className="flex flex-wrap gap-8 items-center bg-background/50 p-6 rounded-lg border border-border/50">
            <Label variant="info" icon="↓">
              12.5 MB/s
            </Label>

            <Label variant="success" icon="↑">
              1.2 MB/s
            </Label>

            <Label
              variant="warning"
              icon={
                <span className="w-2 h-2 rounded-full bg-warning inline-block" />
              }
            >
              Checking
            </Label>

            <Label
              variant="danger"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              }
            >
              Connection Error
            </Label>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-text mb-4 opacity-80 uppercase tracking-wider">
            Sizing & Inheritance
          </h3>
          <div className="flex flex-col gap-4 bg-background/50 p-6 rounded-lg border border-border/50">
            <div className="text-xs flex items-center gap-4">
              <span className="text-muted w-32">Text XS context:</span>
              <Label variant="info">Compact Label</Label>
            </div>

            <div className="text-base flex items-center gap-4 border-t border-border/50 pt-4">
              <span className="text-muted w-32">Text Base context:</span>
              <Label variant="success">Standard Label</Label>
            </div>

            <div className="text-xl flex items-center gap-4 border-t border-border/50 pt-4">
              <span className="text-muted w-32">Text XL context:</span>
              <Label variant="danger">Large Label</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
