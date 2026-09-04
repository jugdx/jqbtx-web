import { useSearchParams } from "react-router-dom";
import { Input, cn } from "@jqbtx/ui";

export function GlobalSearch({ className = "" }: { className?: string }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) searchParams.set("q", value);
    else searchParams.delete("q");
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <div className={cn("relative w-full", className)}>
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted z-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>

      <Input
        type="search"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        // On surcharge le style par défaut (rounded-md et px-3) pour le style spécifique de recherche
        className="rounded-full pl-10 h-9 bg-background focus-visible:ring-primary/50"
      />
    </div>
  );
}
