import type { LoginCredentials } from "../types/auth";
import type { RawSyncResponse } from "../types/sync";
import type {
  RawTorrentProperties,
  RawTorrentFile,
  RawTorrentTracker,
} from "../types/details";
import type { RawPreferences } from "../types/settings";
import type { RawCategoriesMap } from "../types/torrent";

let mockPreferences: RawPreferences = {
  dl_limit: 0,
  up_limit: 0,
  alt_dl_limit: 5120000, // 5 Mo/s
  alt_up_limit: 1024000, // 1 Mo/s
  scheduler_enabled: false,
  save_path: "/downloads/complete",
  temp_path: "/downloads/incomplete",
  temp_path_enbled: false,
  listen_port: 37465,
  upnp: false,
  max_connec: 500,
  max_connec_per_torrent: 20,
  max_uploads: 500,
  max_uploads_per_torrent: 20,
  web_ui_username: "JuGdx",
  bypass_local_auth: true,
};

let mockCategories: RawCategoriesMap = {
  radarr: { name: "radarr", savePath: "/data/torrents/movies" },
  sonarr: { name: "sonarr", savePath: "/data/torrents/tv" },
  prowlarr: { name: "prowlarr", savePath: "/data/torrents/prowlarr" },
};

let mockTags: string[] = ["1080p", "4K", "HDR", "french", "VOSTFR"];

export const mockApi = {
  auth: {
    login: async (credentials: LoginCredentials): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (
            credentials.username === "admin" &&
            credentials.password === "admin"
          ) {
            resolve(true);
          } else {
            reject(new Error("Identifiants incorrects (Mock)"));
          }
        }, 500);
      });
    },
    logout: async (): Promise<void> => {
      return new Promise((resolve) => setTimeout(resolve, 500));
    },
    checkSession: async (): Promise<boolean> => {
      return new Promise((resolve) => setTimeout(() => resolve(true), 500));
    },
  },
  sync: {
    getMainData: async (rid: number): Promise<RawSyncResponse> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            rid: rid + 1,
            full_update: rid === 0,
            server_state: {
              dl_info_speed: 12500000,
              up_info_speed: 1200000,
              free_space_on_disk: 150000000000,
            },
            torrents: {
              // --- Upload / Seeding ---
              hash_01: {
                name: "Ubuntu-24.04-desktop.iso",
                size: 5798205849,
                progress: 1,
                state: "uploading",
                upspeed: 1250000,
                dlspeed: 0,
                added_on: 1724284800,
                num_seeds: 0,
                num_complete: 479,
                num_leechs: 3,
                num_incomplete: 12,
              },
              hash_02: {
                name: "Debian-12.5.0-netinst.iso",
                size: 658505728,
                progress: 1,
                state: "stalledUP",
                upspeed: 0,
                dlspeed: 0,
                added_on: 1724284800,
                num_seeds: 0,
                num_complete: 210,
                num_leechs: 0,
                num_incomplete: 2,
              },
              hash_03: {
                name: "Arch-Linux-2024.iso",
                size: 859832320,
                progress: 1,
                state: "forcedUP",
                upspeed: 512000,
                dlspeed: 0,
                added_on: 1724284800,
                num_seeds: 0,
                num_complete: 87,
                num_leechs: 1,
                num_incomplete: 4,
              },
              hash_04: {
                name: "Fedora-Workstation-39.iso",
                size: 2048576000,
                progress: 1,
                state: "queuedUP",
                upspeed: 0,
                dlspeed: 0,
                added_on: 1724284800,
                num_seeds: 0,
                num_complete: 67,
                num_leechs: 0,
                num_incomplete: 0,
              },

              // --- Download ---
              hash_05: {
                name: "Satisfactory.Update.8.zip",
                size: 15485760000,
                progress: 0.68,
                state: "downloading",
                upspeed: 0,
                dlspeed: 12500000,
                added_on: 1724284800,
                num_seeds: 24,
                num_complete: 150,
                num_leechs: 4,
                num_incomplete: 15,
              },
              hash_06: {
                name: "Cities.Skylines.II.Pack",
                size: 45485760000,
                progress: 0.12,
                state: "stalledDL",
                upspeed: 0,
                dlspeed: 0,
                added_on: 1724284800,
                num_seeds: 0,
                num_complete: 0,
                num_leechs: 0,
                num_incomplete: 5,
              },
              hash_07: {
                name: "Planet.Zoo.Collection",
                size: 25485760000,
                progress: 0.89,
                state: "forcedDL",
                upspeed: 0,
                dlspeed: 8500000,
                added_on: 1724284800,
                num_seeds: 45,
                num_complete: 45,
                num_leechs: 2,
                num_incomplete: 2,
              },
              hash_08: {
                name: "Palworld.Early.Access",
                size: 35485760000,
                progress: 0,
                state: "queuedDL",
                upspeed: 0,
                dlspeed: 0,
                added_on: 1724284800,
                num_seeds: 0,
                num_complete: 21,
                num_leechs: 0,
                num_incomplete: 45,
              },

              // --- Pauses & Stops ---
              hash_09: {
                name: "Clair.Obscur.Expedition.33",
                size: 65485760000,
                progress: 0.45,
                state: "pausedDL",
                upspeed: 0,
                dlspeed: 0,
                added_on: 1724284800,
                num_seeds: 0,
                num_complete: 31,
                num_leechs: 0,
                num_incomplete: 12,
              },
              hash_10: {
                name: "Le.Diner.de.Cons.1080p",
                size: 4485760000,
                progress: 1,
                state: "pausedUP",
                upspeed: 0,
                dlspeed: 0,
                added_on: 1724284800,
                num_seeds: 0,
                num_complete: 98,
                num_leechs: 0,
                num_incomplete: 0,
              },
              hash_11: {
                name: "La.Cite.de.la.Peur.4K",
                size: 12485760000,
                progress: 0.99,
                state: "stoppedDL",
                upspeed: 0,
                dlspeed: 0,
                added_on: 1724284800,
                num_seeds: 0,
                num_complete: 41,
                num_leechs: 0,
                num_incomplete: 2,
              },
              hash_12: {
                name: "Avengers.Endgame.4K.HDR",
                size: 82548576000,
                progress: 1,
                state: "completed",
                upspeed: 0,
                dlspeed: 0,
                added_on: 1724284800,
                category: "radarr",
                tags: "4K, HDR",
                num_seeds: 0,
                num_complete: 329,
                num_leechs: 0,
                num_incomplete: 0,
              },

              // --- Technical Operations ---
              hash_13: {
                name: "The.Seven.Deadly.Sins.S01",
                size: 15485760000,
                progress: 0.33,
                state: "checkingDL",
                upspeed: 0,
                dlspeed: 0,
                added_on: 1724284800,
                category: "sonarr",
                tags: "1080p, VOSTFR",
                num_seeds: 12,
                num_complete: 45,
                num_leechs: 1,
                num_incomplete: 4,
              },
              hash_14: {
                name: "Family.Photos.Backup.zip",
                size: 5485760000,
                progress: 1,
                state: "moving",
                upspeed: 0,
                dlspeed: 0,
                added_on: 1724284800,
                num_seeds: 0,
                num_complete: 2,
                num_leechs: 0,
                num_incomplete: 0,
              },
              hash_15: {
                name: "Home.Assistant.OS.img",
                size: 2154857600,
                progress: 0,
                state: "allocating",
                upspeed: 0,
                dlspeed: 0,
                added_on: 1724284800,
                num_seeds: 0,
                num_complete: 26,
                num_leechs: 0,
                num_incomplete: 1,
              },

              // --- Errors ---
              hash_16: {
                name: "Corrupted.File.rar",
                size: 1048576000,
                progress: 0.5,
                state: "error",
                upspeed: 0,
                dlspeed: 0,
                added_on: 1724284800,
                num_seeds: 0,
                num_complete: 0,
                num_leechs: 0,
                num_incomplete: 0,
              },
              hash_17: {
                name: "Deleted.Movie.mkv",
                size: 4048576000,
                progress: 1,
                state: "missingFiles",
                upspeed: 0,
                dlspeed: 0,
                added_on: 1724284800,
                num_seeds: 0,
                num_complete: 0,
                num_leechs: 0,
                num_incomplete: 0,
              },

              // --- Name Sorting
              hash_18: {
                name: "Thor.Love.And.Thunder.2022.2160p",
                size: 1048576000,
                progress: 1,
                state: "completed",
                upspeed: 0,
                dlspeed: 0,
                added_on: 1724284800,
                num_seeds: 0,
                num_complete: 589,
                num_leechs: 0,
                num_incomplete: 0,
              },
              hash_19: {
                name: "Thor Love and Thunder (2022) 1080p",
                size: 4048576000,
                progress: 1,
                state: "completed",
                upspeed: 0,
                dlspeed: 0,
                added_on: 1724284800,
                num_seeds: 0,
                num_complete: 70,
                num_leechs: 0,
                num_incomplete: 0,
              },
              hash_20: {
                name: "The.Seven.Deadly.Sins.Season.10",
                size: 4048576000,
                progress: 1,
                state: "completed",
                upspeed: 0,
                dlspeed: 0,
                added_on: 1724284800,
                num_seeds: 0,
                num_complete: 4,
                num_leechs: 0,
                num_incomplete: 0,
              },
              hash_21: {
                name: "The.Seven.Deadly.Sins.Season.2",
                size: 4048576000,
                progress: 1,
                state: "completed",
                upspeed: 0,
                dlspeed: 0,
                added_on: 1724284800,
                num_seeds: 0,
                num_complete: 75,
                num_leechs: 0,
                num_incomplete: 0,
              },

              // --- Fallback ---
              hash_100: {
                name: "Ghost.Torrent",
                size: 0,
                progress: 0,
                state: "someWeirdState",
                upspeed: 0,
                dlspeed: 0,
                added_on: 1724284800,
                num_seeds: 0,
                num_complete: 0,
                num_leechs: 0,
                num_incomplete: 0,
              },
            },
          });
        }, 300); // 300ms de latence simulée
      });
    },
  },
  torrents: {
    pause: async (hashes: string[]): Promise<void> => {
      return new Promise((resolve) => {
        console.log("[Mock] torrents.pause: " + hashes);
        setTimeout(resolve, 500);
      });
    },
    resume: async (hashes: string[]): Promise<void> => {
      return new Promise((resolve) => {
        console.log("[Mock] torrents.resume: " + hashes);
        setTimeout(resolve, 500);
      });
    },
    delete: async (
      hashes: string[],
      deleteFiles: boolean = false,
    ): Promise<void> => {
      return new Promise((resolve) => {
        console.log(
          "[Mock] torrents.delete (deleteFiles=" + deleteFiles + "): " + hashes,
        );
        setTimeout(resolve, 500);
      });
    },
    add: async (formData: FormData): Promise<void> => {
      return new Promise((resolve) => {
        console.log(
          "[Mock] torrents.add. URLs:",
          formData.get("urls"),
          "Files:",
          formData.getAll("torrents"),
        );
        setTimeout(resolve, 500);
      });
    },
    getProperties: async (): Promise<RawTorrentProperties> => {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              save_path: "/downloads/complete",
              creation_date: 1724284800,
              piece_size: 4194304, // 4MB
              total_pieces: 1380,
              share_ratio: 1.45,
              time_elapsed: 86400,
              total_downloaded: 5798205849,
              total_uploaded: 8407398400,
              peers: 12,
              peers_total: 45,
              seeds: 4,
              seeds_total: 150,
            }),
          200,
        ),
      );
    },
    getFiles: async (): Promise<RawTorrentFile[]> => {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve([
              {
                name: "Ubuntu-24.04-desktop.iso",
                size: 5798205849,
                progress: 1,
                priority: 1,
              },
              { name: "ReadMe.txt", size: 1024, progress: 1, priority: 0 },
            ]),
          200,
        ),
      );
    },
    getTrackers: async (): Promise<RawTorrentTracker[]> => {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve([
              {
                url: "udp://tracker.opentrackr.org:1337/announce",
                status: 2,
                tier: 0,
                num_peers: 45,
                num_seeds: 150,
              },
              {
                url: "http://tracker.internetwarriors.net:1337/announce",
                status: 1,
                tier: 1,
                num_peers: 0,
                num_seeds: 0,
              },
            ]),
          200,
        ),
      );
    },
    recheck: async (hashes: string[]): Promise<void> => {
      return new Promise((resolve) => {
        console.log("[Mock] torrents.recheck. Hashes: " + hashes.concat(", "));
        setTimeout(resolve, 500);
      });
    },
    setFilePriority: async (
      hash: string,
      fileIds: number[],
      priority: number,
    ) => {
      return new Promise((resolve) => {
        console.log(
          "[Mock] torrents.setFilePriority. Hash: " + hash,
          fileIds,
          priority,
        );
        setTimeout(resolve, 500);
      });
    },
    reannounce: async (hashes: string[]): Promise<void> => {
      return new Promise((resolve) => {
        console.log(
          "[Mock] torrents.reannounce. Hashes: " + hashes.concat(", "),
        );
        setTimeout(resolve, 500);
      });
    },
    setLocation: async (hashes: string[], location: string): Promise<void> => {
      return new Promise((resolve) => {
        console.log(
          "[Mock] torrents.setLocation. Hashes: " + hashes.concat(", "),
          location,
        );
        setTimeout(resolve, 500);
      });
    },
    setDownloadLimit: async (
      hashes: string[],
      limit: number,
    ): Promise<void> => {
      return new Promise((resolve) => {
        console.log(
          "[Mock] torrents.setDownloadLimit. Hashes: ",
          hashes,
          limit,
        );
        setTimeout(resolve, 500);
      });
    },
    setUploadLimit: async (hashes: string[], limit: number): Promise<void> => {
      return new Promise((resolve) => {
        console.log("[Mock] torrents.setUploadLimit. Hashes: ", hashes, limit);
        setTimeout(resolve, 500);
      });
    },

    // --- Catégories et Tags ---
    getCategories: async (): Promise<RawCategoriesMap> => {
      console.log("[Mock] torrents.getCategories");
      return { ...mockCategories };
    },
    getTags: async (): Promise<string[]> => {
      console.log("[Mock] torrents.getTags");
      return [...mockTags];
    },
    setCategory: async (hashes: string[], category: string): Promise<void> => {
      console.log(
        `[Mock] torrents.setCategory on ${hashes.length} torrents to:`,
        category,
      );
    },
    addTags: async (hashes: string[], tags: string[]): Promise<void> => {
      console.log(
        `[Mock] torrents.addTags to ${hashes.length} torrents:`,
        tags,
      );
    },
    removeTags: async (hashes: string[], tags: string[]): Promise<void> => {
      console.log(
        `[Mock] torrents.removeTags from ${hashes.length} torrents:`,
        tags,
      );
    },
    createCategory: async (
      category: string,
      savePath: string = "",
    ): Promise<void> => {
      console.log("[Mock] torrents.createCategory:", category, savePath);
      mockCategories[category] = { name: category, savePath };
    },
    removeCategories: async (categories: string[]): Promise<void> => {
      console.log("[Mock] torrents.removeCategories:", categories);
      categories.forEach((c) => delete mockCategories[c]);
    },
  },
  settings: {
    getPreferences: async (): Promise<RawPreferences> => {
      console.log("[Mock] settings.getPreferences");
      return { ...mockPreferences };
    },
    setPreferences: async (prefs: Partial<RawPreferences>): Promise<void> => {
      console.log("[Mock] settings.setPreferences payload:", prefs);
      mockPreferences = { ...mockPreferences, ...prefs };
    },
  },
};
