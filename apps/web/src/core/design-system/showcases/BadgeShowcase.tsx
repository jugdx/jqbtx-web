import { Badge } from "@jqbtx/ui";

export function BadgeShowcase() {
  return (
    <div className="max-w-3xl space-y-8 bg-panel border border-border p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-primary border-b border-border pb-4 mb-6">
        Badges
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-text mb-4 opacity-80 uppercase tracking-wider">
            Status & Semantic
          </h3>
          <div className="flex flex-wrap gap-4 items-center bg-background/50 p-6 rounded-lg border border-border/50">
            <div className="flex flex-col items-center gap-2">
              <Badge variant="success">Seeding</Badge>
              <span className="text-xs text-muted">Success</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Badge variant="info">Downloading</Badge>
              <span className="text-xs text-muted">Info</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Badge variant="warning">Paused</Badge>
              <span className="text-xs text-muted">Warning</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Badge variant="danger">Error</Badge>
              <span className="text-xs text-muted">Danger</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-text mb-4 opacity-80 uppercase tracking-wider">
            UI Variants
          </h3>
          <div className="flex flex-wrap gap-4 items-center bg-background/50 p-6 rounded-lg border border-border/50">
            <div className="flex flex-col items-center gap-2">
              <Badge variant="default">New</Badge>
              <span className="text-xs text-muted">Default</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Badge variant="secondary">Tracker</Badge>
              <span className="text-xs text-muted">Secondary</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Badge variant="outline">Tag</Badge>
              <span className="text-xs text-muted">Outline</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
