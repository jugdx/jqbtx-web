import { useState } from "react";
import { cn, Alert } from "@jqbtx/ui";
import { useSettings } from "./model/useSettings";
import { SpeedSettings } from "./components/SpeedSettings";
import { DownloadsSettings } from "./components/DownloadsSettings";
import { ConnectionSettings } from "./components/ConnectionSettings";
import { WebUISettings } from "./components/WebUISettings";

const tabs = [
  { id: "speed", label: "Speed" },
  { id: "downloads", label: "Downloads" },
  { id: "connection", label: "Connection" },
  { id: "webui", label: "Web UI" },
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("speed");
  const { preferences, isLoading, updateSettings, isSaving } = useSettings();

  if (isLoading && !preferences) {
    return (
      <div className="p-8 text-center text-muted animate-pulse">
        Loading settings...
      </div>
    );
  }

  if (!preferences) {
    return (
      <div className="p-6">
        <Alert variant="danger">Failed to load preferences</Alert>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col h-full relative">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text mb-4">Settings</h2>

        <div className="flex overflow-x-auto hide-scrollbar border-b border-border">
          <div className="flex space-x-6 px-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "pb-3 text-sm font-medium transition-colors whitespace-nowrap border-b-2",
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted hover:text-text",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pt-4 pb-24">
        {activeTab === "speed" && (
          <SpeedSettings
            preferences={preferences}
            onSave={updateSettings}
            isSaving={isSaving}
          />
        )}
        {activeTab === "downloads" && (
          <DownloadsSettings
            preferences={preferences}
            onSave={updateSettings}
            isSaving={isSaving}
          />
        )}
        {activeTab === "connection" && (
          <ConnectionSettings
            preferences={preferences}
            onSave={updateSettings}
            isSaving={isSaving}
          />
        )}
        {activeTab === "webui" && (
          <WebUISettings
            preferences={preferences}
            onSave={updateSettings}
            isSaving={isSaving}
          />
        )}
      </div>
    </div>
  );
}
