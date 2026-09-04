import { useEffect, useState } from "react";
import { cn, Button } from "@jqbtx/ui";
import { Link } from "react-router-dom";

const showcaseModules = import.meta.glob("./showcases/*Showcase.tsx", {
  eager: true,
});

const showcases = Object.entries(showcaseModules)
  .map(([filePath, module]: [string, any]) => {
    const fileName = filePath.split("/").pop() || "";
    const name = fileName.replace("Showcase.tsx", "");
    const id = name.toLowerCase();
    const Component = module[`${name}Showcase`];
    return { id, name, Component };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

export function DesignSystemPage() {
  const [activeId, setActiveId] = useState<string>(showcases[0]?.id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id.replace("showcase-", ""));
          }
        });
      },
      { rootMargin: "-10% 0px -80% 0px" },
    );

    showcases.forEach(({ id }) => {
      const el = document.getElementById(`showcase-${id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(`showcase-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background relative">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity animate-in fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-panel border-r border-border flex flex-col transition-transform duration-300 ease-in-out md:static md:translate-x-0 flex-shrink-0",
          isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full",
        )}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-border gap-3">
          <h1 className="text-xl font-bold text-primary tracking-wider">
            🎨 Design System
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden -mr-2"
            onClick={() => setIsSidebarOpen(false)}
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

        <nav className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1">
          {showcases.map(({ id, name }) => (
            <button
              key={id}
              onClick={() => {
                scrollTo(id);
                setIsSidebarOpen(false);
              }}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all text-left",
                activeId === id
                  ? "bg-primary/10 text-primary"
                  : "text-text/80 hover:bg-muted/10 hover:text-text",
              )}
            >
              {name}
            </button>
          ))}

          <div className="mt-auto pt-6 border-t border-border/50">
            <Link
              to="/"
              className="flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium text-muted hover:bg-muted/10 hover:text-text transition-colors"
            >
              ← Back to App
            </Link>
          </div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden h-16 border-b border-border flex items-center px-4 bg-panel shrink-0 gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
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
          <span className="font-bold text-primary tracking-wider">
            🎨 Design System
          </span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-12 scroll-smooth">
          <div className="max-w-4xl mx-auto space-y-12 md:space-y-16 pb-64">
            {showcases.map(({ id, Component }) => (
              <section
                key={id}
                id={`showcase-${id}`}
                className="scroll-mt-20 md:scroll-mt-12"
              >
                <Component />
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
