import { TextArea } from "@jqbtx/ui";

export function TextAreaShowcase() {
  return (
    <div className="max-w-3xl space-y-8 bg-panel border border-border p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-primary border-b border-border pb-4 mb-6">
        Textarea
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-text mb-4 opacity-80 uppercase tracking-wider">
            Usage
          </h3>
          <div className="space-y-6 bg-background/50 p-6 rounded-lg border border-border/50">
            <TextArea
              label="Magnet Links or HTTP URLs"
              placeholder="One link per line..."
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-text mb-4 opacity-80 uppercase tracking-wider">
            States
          </h3>
          <div className="space-y-6 bg-background/50 p-6 rounded-lg border border-border/50">
            <TextArea
              label="Populated"
              defaultValue="magnet:?xt=urn:btih:1234567890abcdef&#10;http://releases.ubuntu.com/22.04/ubuntu.iso"
            />

            <div className="border-t border-border/50 pt-6">
              <TextArea
                disabled
                label="Disabled State"
                placeholder="This input is currently locked..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
