export interface RawPreferences {
  // --- Speed Limits ---
  dl_limit: number;
  up_limit: number;
  alt_dl_limit: number;
  alt_up_limit: number;
  scheduler_enabled: boolean;

  // --- Downloads ---
  save_path: string;
  temp_path: string;
  temp_path_enbled: boolean;

  // --- Connection ---
  listen_port: number;
  upnp: boolean;
  max_connec: number;
  max_connec_per_torrent: number;
  max_uploads: number;
  max_uploads_per_torrent: number;

  // --- Web UI / Security ---
  web_ui_username?: string;
  web_ui_password?: string;
  bypass_local_auth?: boolean;

  // anything else to avoid errors
  [key: string]: any;
}
