import { Checkbox } from "@jqbtx/ui";

export function CheckboxShowcase() {
  return (
    <div className="max-w-3xl space-y-8 bg-panel border border-border p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-primary border-b border-border pb-4 mb-6">
        Checkbox
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-text mb-4 opacity-80 uppercase tracking-wider">
            States
          </h3>
          <div className="flex flex-col gap-4 bg-background/50 p-6 rounded-lg border border-border/50">
            <Checkbox label="Default (Unchecked)" />
            <Checkbox defaultChecked label="Checked" />
            <Checkbox disabled label="Disabled (Unchecked)" />
            <Checkbox defaultChecked disabled label="Disabled Checked" />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-text mb-4 opacity-80 uppercase tracking-wider">
            With Descriptions
          </h3>
          <div className="space-y-6 bg-background/50 p-6 rounded-lg border border-border/50">
            <Checkbox
              label="Select this torrent"
              description="Apply groupped actions to this specific item."
            />

            <div className="border-t border-border/50 pt-6">
              <Checkbox
                defaultChecked
                disabled
                label="Option locked"
                description="You do not have permission to modify this setting."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
