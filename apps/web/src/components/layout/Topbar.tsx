import { Button } from "@jqbtx/ui";
import { LiveTransferStats } from "../../features/torrents/components/stats/LiveTransferStats";
import { AddTorrentAction } from "../../features/torrents/components/add/AddTorrentAction";
import { GlobalSearch } from "./GlobalSearch";

interface TopbarProps {
  onOpenSidebar: () => void;
}

export function Topbar({ onOpenSidebar }: TopbarProps) {
  return (
    <header className="h-16 border-b border-border flex items-center px-4 md:px-6 bg-panel gap-3 md:gap-8">
      {/* Burger Menu */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden shrink-0"
        onClick={onOpenSidebar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </Button>

      <div className="hidden sm:flex shrink-0">
        <LiveTransferStats />
      </div>

      <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end ml-auto min-w-0">
        <div className="w-full max-w-[200px] md:max-w-md shrink">
          <GlobalSearch />
        </div>
        <AddTorrentAction />
      </div>
    </header>
  );
}
