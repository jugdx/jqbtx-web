export interface RawServerState {
  dl_info_speed?: number;
  up_info_speed?: number;
  free_space_on_disk?: number;
}

export interface RawSyncResponse {
  rid: number;
  full_update?: boolean;
  torrents?: Record<string, any>;
  torrents_removed?: string[];
  server_state?: RawServerState;
}
