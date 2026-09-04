import { NavLink } from "react-router-dom";
import { cn, Button } from "@jqbtx/ui";
import { useSyncEngine } from "../../core/sync/SyncEngine";

const navItems = [
  { id: "all", label: "All Torrents", path: "/", end: true },
  { id: "downloading", label: "Downloading", path: "/status/downloading" },
  { id: "seeding", label: "Seeding", path: "/status/seeding" },
  { id: "completed", label: "Completed", path: "/status/completed" },
  { id: "paused", label: "Paused", path: "/status/paused" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { categories, tags } = useSyncEngine();
  const sortedCategories = Object.values(categories).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const sortedTags = [...tags].sort((a, b) => a.localeCompare(b));

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity animate-in fade-in"
          onClick={onClose}
        />
      )}

      {/* Side Pannel */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-panel border-r border-border flex flex-col transition-transform duration-300 ease-in-out md:static md:translate-x-0 flex-shrink-0",
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full",
        )}
      >
        {/* Header for mobile */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-border shrink-0">
          <h1 className="text-xl font-bold text-primary tracking-wider">
            JQBTX<span className="text-text opacity-50 font-normal">WEB</span>
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden -mr-2"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
          </Button>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1 hide-scrollbar">
          {/* --- STATUS --- */}
          <div className="px-3 mb-2 text-xs font-semibold text-muted uppercase tracking-wider">
            Transfers
          </div>

          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-text/80 hover:bg-muted/10 hover:text-text",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* --- CATEGORIES --- */}
          {sortedCategories.length > 0 && (
            <>
              <div className="mt-8 px-3 mb-2 text-xs font-semibold text-muted uppercase tracking-wider">
                Categories
              </div>
              {sortedCategories.map((category) => (
                <NavLink
                  key={category.name}
                  to={`/category/${encodeURIComponent(category.name)}`}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-text/80 hover:bg-muted/10 hover:text-text",
                    )
                  }
                  title={category.savePath}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-70 shrink-0"
                  >
                    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-1.2-1.8A2 2 0 0 0 7.55 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                  </svg>
                  <span className="truncate">{category.name}</span>
                </NavLink>
              ))}
            </>
          )}

          {/* --- TAGS --- */}
          {sortedTags.length > 0 && (
            <>
              <div className="mt-8 px-3 mb-2 text-xs font-semibold text-muted uppercase tracking-wider">
                Tags
              </div>
              {sortedTags.map((tag) => (
                <NavLink
                  key={tag}
                  to={`/tag/${encodeURIComponent(tag)}`}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-text/80 hover:bg-muted/10 hover:text-text",
                    )
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-70 shrink-0"
                  >
                    <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42l-8.704-8.704z" />
                    <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
                  </svg>
                  <span className="truncate">{tag}</span>
                </NavLink>
              ))}
            </>
          )}

          {/* --- SYSTEM --- */}
          <div className="mt-8 px-3 mb-2 text-xs font-semibold text-muted uppercase tracking-wider">
            System
          </div>

          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-text/80 hover:bg-muted/10 hover:text-text",
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-70 shrink-0"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Settings
          </NavLink>

          <div className="mt-auto pt-6 border-t border-border/50">
            <NavLink
              to="/design-system"
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-text/80 hover:bg-muted/10 hover:text-text",
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-70 shrink-0"
              >
                <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                <path d="M10 2c1 .5 2 2 2 5" />
              </svg>
              Design System
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
}
