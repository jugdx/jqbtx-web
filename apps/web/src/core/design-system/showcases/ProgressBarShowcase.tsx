import { ProgressBar } from "@jqbtx/ui";

export function ProgressBarShowcase() {
  return (
    <div className="max-w-3xl space-y-8 bg-panel border border-border p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-primary border-b border-border pb-4 mb-6">
        ProgressBar
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-text mb-4 opacity-80 uppercase tracking-wider">
            Variants (Status)
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2 font-medium text-muted">
                <span>inProgress</span>
                <span>bg-primary</span>
              </div>
              <ProgressBar value={45} variant="inProgress" />
            </div>

            <div className="border-t border-border/50 pt-4">
              <div className="flex justify-between text-sm mb-2 font-medium text-muted">
                <span>seeding</span>
                <span>bg-info</span>
              </div>
              <ProgressBar value={100} variant="seeding" />
            </div>

            <div className="border-t border-border/50 pt-4">
              <div className="flex justify-between text-sm mb-2 font-medium text-muted">
                <span>paused</span>
                <span>bg-warning</span>
              </div>
              <ProgressBar value={65} variant="paused" />
            </div>

            <div className="border-t border-border/50 pt-4">
              <div className="flex justify-between text-sm mb-2 font-medium text-muted">
                <span>error</span>
                <span>bg-danger</span>
              </div>
              <ProgressBar value={12} variant="error" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-text mb-4 opacity-80 uppercase tracking-wider">
            Values (Progress)
          </h3>
          <div className="space-y-4 border-t border-border/50 pt-4">
            <div>
              <div className="text-xs text-muted mb-2">0%</div>
              <ProgressBar value={0} variant="inProgress" />
            </div>
            <div>
              <div className="text-xs text-muted mb-2">50%</div>
              <ProgressBar value={50} variant="inProgress" />
            </div>
            <div>
              <div className="text-xs text-muted mb-2">100%</div>
              <ProgressBar value={100} variant="inProgress" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
