export interface Torrent {
  id: string;
  name: string;
  size: string;
  progress: number;
  downSpeed: string;
  upSpeed: string;
  addedDate: string;
  state: string; 
}

export interface TorrentViewData extends Torrent {
  uiVariant: 'info' | 'success' | 'warning' | 'danger' | 'default' | 'secondary' | 'outline';
  uiLabel: string;
  isInactive: boolean;  
  rawSize: number;
  rawDownSpeed: number;
  rawUpSpeed: number;
  rawAddedDate: number;
  savePath: string;
  connectedSeeds: number;
  totalSeeds: number;
  connectedPeers: number;
  totalPeers: number;
  category?: string;
  tags?: string;
}

export interface ServerStateView {
  downSpeed: string;
  upSpeed: string;
  freeSpace: string;
}