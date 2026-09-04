import { useEffect, useState, useRef } from "react";

export function GlobalDropzone() {
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      dragCounter.current += 1;
      if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dragCounter.current -= 1;
      if (dragCounter.current === 0) {
        setIsDragging(false);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      dragCounter.current = 0;

      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        window.dispatchEvent(
          new CustomEvent("jqbtx:add-torrents", {
            detail: { files: e.dataTransfer.files },
          }),
        );
      }
    };

    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  if (!isDragging) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/90 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="flex flex-col items-center justify-center p-12 border-4 border-dashed border-primary/50 rounded-3xl bg-panel/50 pointer-events-none w-full max-w-2xl mx-6">
        <div className="p-4 bg-primary/20 rounded-full mb-6">
          <svg
            className="text-primary w-12 h-12"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-text mb-2">
          Drop torrents here
        </h2>
        <p className="text-muted">Release to instantly open the Add panel</p>
      </div>
    </div>
  );
}
