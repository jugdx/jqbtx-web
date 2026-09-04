export interface RawTorrentProperties {
  save_path: string;
  creation_date: number;
  piece_size: number;
  pieces_num?: number;
  total_pieces?: number;
  share_ratio: number;
  time_elapsed: number;
  total_downloaded: number;
  total_uploaded: number;
  peers: number;
  peers_total: number;
  seeds: number;
  seeds_total: number;
}

export interface RawTorrentFile {
  name: string;
  size: number;
  progress: number;
  priority: number;
}

export interface RawTorrentTracker {
  url: string;
  status: number;
  tier: number;
  num_peers: number;
  num_seeds: number;
}
