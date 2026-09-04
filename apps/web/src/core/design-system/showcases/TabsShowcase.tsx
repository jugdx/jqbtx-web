import { Tabs, Tab, Badge } from "@jqbtx/ui";

export function TabsShowcase() {
  return (
    <div className="max-w-3xl space-y-12 bg-panel border border-border p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-primary border-b border-border pb-4 mb-6">
        Tabs
      </h2>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-text opacity-80 uppercase tracking-wider">
          Variant : Pill (Default)
        </h3>
        <p className="text-sm text-muted mb-4">
          Idéal pour des sous-filtres ou des contrôles segmentés.
        </p>

        <div className="bg-background/50 p-6 rounded-lg border border-border/50">
          <Tabs variant="pill">
            <Tab title="Tous les torrents">
              <div className="p-4 bg-panel rounded-md border border-border text-sm text-muted">
                Liste complète de tous les torrents.
              </div>
            </Tab>

            <Tab
              title={
                <>
                  En cours{" "}
                  <Badge variant="info" className="ml-2">
                    3
                  </Badge>
                </>
              }
            >
              <div className="p-4 bg-panel rounded-md border border-border text-sm text-muted">
                Uniquement les 3 torrents en cours de téléchargement.
              </div>
            </Tab>

            <Tab title="Partage">
              <div className="p-4 bg-panel rounded-md border border-border text-sm text-muted">
                Torrents 100% complétés et en cours de seed.
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-text opacity-80 uppercase tracking-wider">
          Variant : Underline
        </h3>
        <p className="text-sm text-muted mb-4">
          Idéal pour la navigation principale (onglets larges).
        </p>

        <div className="bg-background/50 p-6 rounded-lg border border-border/50">
          <Tabs variant="underline">
            <Tab title="General">
              <div className="py-4 text-sm text-muted">
                General information (Size, Ratio, Added date).
              </div>
            </Tab>
            <Tab title="Trackers">
              <div className="py-4 text-sm text-muted">
                Trackers linked to this download/torrent.
              </div>
            </Tab>
            <Tab title="Pairs">
              <div className="py-4 text-sm text-muted">
                Peers connections (IP, Speed).
              </div>
            </Tab>
            <Tab title="HTTP Sources">
              <div className="py-4 text-sm text-muted">
                Web seeds available.
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
