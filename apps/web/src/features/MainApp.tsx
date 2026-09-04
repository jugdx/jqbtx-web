import { TorrentsTable } from "./torrents/components/TorrentsTable";

export function MainApp() {
  return (
    <div className="h-full flex flex-col">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-text">Transfers</h2>
        <span className="text-sm text-muted">Active downloads</span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        <TorrentsTable />
      </div>
    </div>
  );
}
