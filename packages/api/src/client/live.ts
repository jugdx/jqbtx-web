import type { LoginCredentials } from "../types/auth";
import type { RawSyncResponse } from "../types/sync";
import type {
  RawTorrentProperties,
  RawTorrentFile,
  RawTorrentTracker,
} from "../types/details";
import type { RawPreferences } from "../types/settings";
import type { RawCategoriesMap } from "../types/torrent";

export const liveApi = {
  auth: {
    login: async ({
      username,
      password,
    }: LoginCredentials): Promise<boolean> => {
      const response = await fetch("/api/v2/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          username: username || "",
          password: password || "",
        }).toString(),
      });

      if (response.ok) {
        const text = await response.text();
        if (text.includes("Fails")) throw new Error("Identifiants incorrects");
        return true;
      }
      throw new Error("Erreur réseau lors de la connexion");
    },
    logout: async (): Promise<void> => {
      await fetch("/api/v2/auth/logout", { method: "POST" });
    },
    checkSession: async (): Promise<boolean> => {
      try {
        const response = await fetch("/api/v2/app/webapiVersion");
        return response.ok;
      } catch {
        return false;
      }
    },
  },
  sync: {
    getMainData: async (rid: number): Promise<RawSyncResponse> => {
      const response = await fetch(`/api/v2/sync/maindata?rid=${rid}`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  },
  torrents: {
    pause: async (hashes: string[]): Promise<void> => {
      await fetch("/api/v2/torrents/stop", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ hashes: hashes.join("|") }).toString(),
      });
    },
    resume: async (hashes: string[]): Promise<void> => {
      await fetch("/api/v2/torrents/start", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ hashes: hashes.join("|") }).toString(),
      });
    },
    delete: async (
      hashes: string[],
      deleteFiles: boolean = false,
    ): Promise<void> => {
      await fetch("/api/v2/torrents/delete", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          hashes: hashes.join("|"),
          deleteFiles: deleteFiles.toString(),
        }).toString(),
      });
    },
    add: async (formData: FormData): Promise<void> => {
      const response = await fetch("/api/v2/torrents/add", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Erreur lors de l'ajout du torrent");
    },
    getProperties: async (hash: string): Promise<RawTorrentProperties> => {
      const response = await fetch(`/api/v2/torrents/properties?hash=${hash}`);
      if (!response.ok) throw new Error("Erreur récupération propriétés");
      return response.json();
    },
    getFiles: async (hash: string): Promise<RawTorrentFile[]> => {
      const response = await fetch(`/api/v2/torrents/files?hash=${hash}`);
      if (!response.ok) throw new Error("Erreur récupération fichiers");
      return response.json();
    },
    getTrackers: async (hash: string): Promise<RawTorrentTracker[]> => {
      const response = await fetch(`/api/v2/torrents/trackers?hash=${hash}`);
      if (!response.ok) throw new Error("Erreur récupération trackers");
      return response.json();
    },
    recheck: async (hashes: string[]): Promise<void> => {
      await fetch("/api/v2/torrents/recheck", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ hashes: hashes.join("|") }).toString(),
      });
    },
    setFilePriority: async (
      hash: string,
      fileIds: number[],
      priority: number,
    ): Promise<void> => {
      await fetch("/api/v2/torrents/filePrio", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          hash,
          id: fileIds.join("|"),
          priority: priority.toString(),
        }).toString(),
      });
    },
    reannounce: async (hashes: string[]): Promise<void> => {
      await fetch("/api/v2/torrents/reannounce", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ hashes: hashes.join("|") }).toString(),
      });
    },
    setLocation: async (hashes: string[], location: string): Promise<void> => {
      await fetch("/api/v2/torrents/setLocation", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          hashes: hashes.join("|"),
          location,
        }).toString(),
      });
    },
    setDownloadLimit: async (
      hashes: string[],
      limit: number,
    ): Promise<void> => {
      await fetch("/api/v2/torrents/setDownloadLimit", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          hashes: hashes.join("|"),
          limit: limit.toString(),
        }).toString(),
      });
    },
    setUploadLimit: async (hashes: string[], limit: number): Promise<void> => {
      await fetch("/api/v2/torrents/setUploadLimit", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          hashes: hashes.join("|"),
          limit: limit.toString(),
        }).toString(),
      });
    },
    getCategories: async (): Promise<RawCategoriesMap> => {
      const response = await fetch("/api/v2/torrents/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      return response.json();
    },
    getTags: async (): Promise<string[]> => {
      const response = await fetch("/api/v2/torrents/tags");
      if (!response.ok) throw new Error("Failed to fetch tags");
      return response.json();
    },
    setCategory: async (hashes: string[], category: string): Promise<void> => {
      await fetch("/api/v2/torrents/setCategory", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          hashes: hashes.join("|"),
          category,
        }).toString(),
      });
    },
    addTags: async (hashes: string[], tags: string[]): Promise<void> => {
      await fetch("/api/v2/torrents/addTags", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          hashes: hashes.join("|"),
          tags: tags.join(","),
        }).toString(),
      });
    },
    removeTags: async (hashes: string[], tags: string[]): Promise<void> => {
      await fetch("/api/v2/torrents/removeTags", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          hashes: hashes.join("|"),
          tags: tags.join(","),
        }).toString(),
      });
    },
  },
  settings: {
    getPreferences: async (): Promise<RawPreferences> => {
      const response = await fetch("/api/v2/app/preferences");
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des paramètres");
      return response.json();
    },

    setPreferences: async (prefs: Partial<RawPreferences>): Promise<void> => {
      await fetch("/api/v2/app/setPreferences", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ json: JSON.stringify(prefs) }).toString(),
      });
    },
  },
};
