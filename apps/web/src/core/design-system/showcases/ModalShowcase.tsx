import * as React from "react";
import { Modal, Button, Input, Checkbox } from "@jqbtx/ui";

export function ModalShowcase() {
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);

  return (
    <div className="max-w-3xl space-y-8 bg-panel border border-border p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-primary border-b border-border pb-4 mb-6">
        Modal
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-text mb-4 opacity-80 uppercase tracking-wider">
            Default Use Case
          </h3>
          <div className="bg-background/50 p-6 rounded-lg border border-border/50 max-w-sm">
            <Button onClick={() => setIsAddOpen(true)}>Add Torrent Link</Button>
          </div>

          <Modal
            isOpen={isAddOpen}
            onClose={() => setIsAddOpen(false)}
            title="Add New Torrent"
            description="Paste a magnet link or the URL to a .torrent file."
            footer={
              <>
                <Button variant="ghost" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddOpen(false)}>Download</Button>
              </>
            }
          >
            <div className="space-y-4">
              <Input placeholder="magnet:?xt=urn:btih:..." />

              <div className="flex items-start space-x-3 pt-2">
                <div className="flex items-center h-5">
                  <Checkbox id="start-auto" defaultChecked />
                </div>
                <label
                  htmlFor="start-auto"
                  className="text-sm font-medium text-text cursor-pointer"
                >
                  Start download automatically
                </label>
              </div>
            </div>
          </Modal>
        </div>

        <div>
          <h3 className="text-sm font-medium text-text mb-4 opacity-80 uppercase tracking-wider">
            Destructive Action
          </h3>
          <div className="bg-background/50 p-6 rounded-lg border border-border/50 max-w-sm">
            <Button variant="danger" onClick={() => setIsDeleteOpen(true)}>
              Delete Torrent
            </Button>
          </div>

          <Modal
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            title="Delete Ubuntu-24.04-LTS.iso?"
            description="This action cannot be undone. Do you also want to delete the downloaded files from the hard drive?"
            className="max-w-md border-red-900/50"
            footer={
              <>
                <Button variant="ghost" onClick={() => setIsDeleteOpen(false)}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={() => setIsDeleteOpen(false)}>
                  Delete Permanently
                </Button>
              </>
            }
          >
            <div className="flex items-start space-x-3 p-3 bg-red-950/20 border border-red-900/30 rounded-md mt-4">
              <div className="flex items-center h-5 shrink-0">
                <Checkbox id="delete-files" />
              </div>
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="delete-files"
                  className="text-sm font-medium text-text cursor-pointer"
                >
                  Delete files on disk
                </label>
                <p className="text-xs text-muted">
                  2.4 GB will be freed from /media/downloads.
                </p>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
