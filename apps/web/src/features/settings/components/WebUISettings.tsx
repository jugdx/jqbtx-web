import { useState } from "react";
import {
  Input,
  Button,
  Checkbox,
  Alert,
  Modal,
  type ActionResult,
  useToast,
  resolveToast,
} from "@jqbtx/ui";
import type { RawPreferences } from "@jqbtx/api";

interface WebUISettingsProps {
  preferences: RawPreferences;
  isSaving: boolean;
  onSave: (updates: Partial<RawPreferences>) => Promise<ActionResult>;
}

export function WebUISettings({
  preferences,
  isSaving,
  onSave,
}: WebUISettingsProps) {
  const { toast } = useToast();

  const [username, setUsername] = useState(
    preferences.web_ui_username || "admin",
  );
  const [password, setPassword] = useState("");
  const [bypassLocalAuth, setBypassLocalAuth] = useState(
    preferences.bypass_local_auth ?? false,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const hasChanges =
    username !== (preferences.web_ui_username || "admin") ||
    password.length > 0 ||
    bypassLocalAuth !== (preferences.bypass_local_auth ?? false);

  // Fonction finale qui exécute l'appel API
  const executeSave = async () => {
    const updates: Partial<RawPreferences> = {
      web_ui_username: username,
      bypass_local_auth: bypassLocalAuth,
    };

    if (password) {
      updates.web_ui_password = password;
    }

    const result = await onSave(updates);
    toast(...resolveToast(result));

    if (result.success) {
      setPassword("");
      setConfirmPassword("");
      setPasswordError("");
      setIsModalOpen(false);
    } else {
      setIsModalOpen(false);
    }
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      setIsModalOpen(true);
    } else {
      executeSave();
    }
  };

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match. Please check your typing.");
      return;
    }
    executeSave();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setConfirmPassword("");
    setPasswordError("");
  };

  return (
    <>
      <form
        onSubmit={handleInitialSubmit}
        className="space-y-8 w-full animate-in fade-in"
      >
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-text border-b border-border pb-2">
            Authentication
          </h3>

          <Alert variant="warning" className="mb-4">
            Changing your password will disconnect all active sessions. You will
            need to log in again.
          </Alert>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave empty to keep current"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-text border-b border-border pb-2">
            Security
          </h3>

          <div className="flex items-center gap-3 pt-2">
            <Checkbox
              id="bypass-auth-toggle"
              checked={bypassLocalAuth}
              onChange={(e) =>
                setBypassLocalAuth((e.target as HTMLInputElement).checked)
              }
            />
            <label
              htmlFor="bypass-auth-toggle"
              className="text-sm font-medium text-text cursor-pointer"
            >
              Bypass authentication for clients on localhost
            </label>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" disabled={!hasChanges || isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Confirm New Password"
      >
        <form onSubmit={handleConfirmSubmit} className="space-y-6">
          <p className="text-sm text-muted">
            Please re-enter your new password to ensure there are no typos.
          </p>

          <div className="space-y-4">
            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (passwordError) setPasswordError("");
              }}
              autoFocus
            />

            {passwordError && (
              <p className="text-sm text-red-500 font-medium">
                {passwordError}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
            <Button type="button" variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" disabled={!confirmPassword || isSaving}>
              {isSaving ? "Applying..." : "Confirm & Save"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
