import { useState, useMemo, useCallback } from 'react';
import { formatBytes, formatDate } from '@jqbtx/ui';
import { useSyncEngine } from '../../../core/sync/SyncEngine';
import type { SortConfig } from '../components/TorrentsColumns';
import type { TorrentViewData } from '../types';
import { liveApi, mockApi } from '@jqbtx/api';

const isMock = import.meta.env.VITE_USE_MOCKS === 'true';
const torrentsClient = isMock ? mockApi.torrents : liveApi.torrents;

const mapRawToView = (hash: string, raw: any): TorrentViewData => {
  let uiVariant: TorrentViewData['uiVariant'] = 'default';
  let uiLabel = raw.state || 'Unknown';
  let isInactive = false;

  switch (raw.state) {
    case 'uploading': uiVariant = 'success'; uiLabel = 'Uploading'; break;
    case 'stalledUP': uiVariant = 'success'; uiLabel = 'Seeding'; break;
    case 'forcedUP': uiVariant = 'success'; uiLabel = 'Seeding [F]'; break;
    case 'queuedUP': uiVariant = 'default'; uiLabel = 'Queued [UP]'; break;
    case 'downloading': uiVariant = 'info'; uiLabel = 'Downloading'; break;
    case 'stalledDL': uiVariant = 'warning'; uiLabel = 'Stalled [DL]'; break;
    case 'forcedDL': uiVariant = 'info'; uiLabel = 'Download [F]'; break;
    case 'queuedDL': uiVariant = 'default'; uiLabel = 'Queued [DL]'; break;
    case 'pausedDL': uiVariant = 'default'; uiLabel = 'Paused [DL]'; isInactive = true; break;
    case 'pausedUP': uiVariant = 'default'; uiLabel = 'Paused [UP]'; isInactive = true; break;
    case 'stoppedDL': uiVariant = 'default'; uiLabel = 'Stopped [DL]'; isInactive = true; break;
    case 'stoppedUP': uiVariant = 'default'; uiLabel = 'Stopped [UP]'; isInactive = true; break;
    case 'completed': uiVariant = 'default'; uiLabel = 'Completed'; isInactive = true; break;
    case 'checkingDL': uiVariant = 'warning'; uiLabel = 'Checking (DL)'; break;
    case 'checkingUP': uiVariant = 'warning'; uiLabel = 'Checking (UP)'; break;
    case 'checkingResumeData': uiVariant = 'warning'; uiLabel = 'Checking Data'; break;
    case 'moving': uiVariant = 'warning'; uiLabel = 'Moving'; break;
    case 'allocating': uiVariant = 'warning'; uiLabel = 'Allocating'; break;
    case 'error': uiVariant = 'danger'; uiLabel = 'Error'; isInactive = true; break;
    case 'missingFiles': uiVariant = 'danger'; uiLabel = 'Missing Files'; isInactive = true; break;
    default:
      uiVariant = 'default';
      uiLabel = raw.state ? raw.state.charAt(0).toUpperCase() + raw.state.slice(1) : 'Unknown';
      isInactive = true;
  }

  let downSpeed = '0 B/s';
  let upSpeed = '0 B/s';
  
  if (raw.dlspeed > 0) downSpeed = `${formatBytes(raw.dlspeed)}/s`;
  if (raw.upspeed > 0) upSpeed = `${formatBytes(raw.upspeed)}/s`;

  return {
    id: hash,
    name: raw.name || 'Unknown',
    size: formatBytes(raw.size),
    progress: raw.progress ? Math.round(raw.progress * 100) : 0,
    downSpeed,
    upSpeed,
    addedDate: formatDate(raw.added_on),
    state: raw.state,
    uiVariant,
    uiLabel,
    isInactive,
    rawSize: raw.size || 0,
    rawDownSpeed: raw.dlspeed || 0,
    rawUpSpeed: raw.upspeed || 0,
    rawAddedDate: raw.added_on || 0,
    savePath: raw.save_path || '',
    connectedSeeds: raw.num_seeds || 0,
    totalSeeds: raw.num_complete || 0,
    connectedPeers: raw.num_leechs || 0,
    totalPeers: raw.num_incomplete || 0,
    category: raw.category || '',
    tags: raw.tags || '',
  };
};

export function useTorrents(statusFilter?: string, categoryFilter?: string, tagFilter?: string, searchQuery?: string) {
  const { rawTorrents, isBooting } = useSyncEngine();
  
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(() => {
    const saved = localStorage.getItem('jqbtx_sort_pref');
    return saved ? JSON.parse(saved) : null;
  });

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleAll = useCallback((ids: string[], forceSelect: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (forceSelect) {
        ids.forEach(id => next.add(id));
      } else {
        ids.forEach(id => next.delete(id));
      }
      return next;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const handleSortChange = (key: string) => {
    setSortConfig((current) => {
      const newConfig = current?.key === key 
        ? { key, direction: current.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' };
      
      localStorage.setItem('jqbtx_sort_pref', JSON.stringify(newConfig));
      return newConfig as SortConfig;
    });
  };

  const viewTorrents = useMemo(() => {
    return Object.entries(rawTorrents).map(([hash, raw]) => mapRawToView(hash, raw));
  }, [rawTorrents]);

  const filteredTorrents = useMemo(() => {
    let result = viewTorrents;

    if (statusFilter) {
      result = result.filter((torrent) => {
        const state = torrent.state; 
        switch (statusFilter.toLowerCase()) {
          case 'downloading': 
            return ['downloading', 'stalledDL', 'forcedDL', 'queuedDL', 'checkingDL', 'allocating'].includes(state);
          case 'seeding': 
            return ['uploading', 'stalledUP', 'forcedUP', 'queuedUP', 'checkingUP'].includes(state);
          case 'completed': 
            return state === 'completed';
          case 'paused': 
            return ['pausedDL', 'pausedUP', 'stoppedDL', 'stoppedUP'].includes(state);
          default: 
            return true;
        }
      });
    }

    if (categoryFilter) {
      result = result.filter(torrent => torrent.category === categoryFilter);
    }

    if (tagFilter) {
      result = result.filter(torrent => {
        const torrentTags = torrent.tags ? torrent.tags.split(',').map(t => t.trim()) : [];
        return torrentTags.includes(tagFilter);
      });
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(torrent => torrent.name.toLowerCase().includes(query));
    }

    return result;
  }, [viewTorrents, statusFilter, categoryFilter, tagFilter, searchQuery]);

  const finalTorrents = useMemo(() => {
    if (!sortConfig) return filteredTorrents;

    return [...filteredTorrents].sort((a, b) => {
      const rawKeyMap: Record<string, keyof TorrentViewData> = {
        size: 'rawSize',
        downSpeed: 'rawDownSpeed',
        upSpeed: 'rawUpSpeed',
        addedDate: 'rawAddedDate',
        status: 'uiLabel', 
        seeds: 'connectedSeeds',
        peers: 'connectedPeers',
      };

      const sortKey = rawKeyMap[sortConfig.key] || sortConfig.key;
      const aValue = a[sortKey as keyof TorrentViewData];
      const bValue = b[sortKey as keyof TorrentViewData];

      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return sortConfig.direction === 'asc' ? 1 : -1; // Pousse à la fin
      if (bValue === undefined) return sortConfig.direction === 'asc' ? -1 : 1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' });
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      }

      return 0;
    });
  }, [filteredTorrents, sortConfig]);

  const executeAction = async (actionFn: (hashes: string[]) => Promise<void>, specificIds?: string[]) => {
    const targets = specificIds || Array.from(selectedIds);
    if (targets.length === 0) return;
    
    await actionFn(targets);
    
    if (!specificIds) clearSelection();
  };

  const pauseTorrents = (ids?: string[]) => executeAction(torrentsClient.pause, ids);
  const resumeTorrents = (ids?: string[]) => executeAction(torrentsClient.resume, ids);
  const recheckTorrents = (ids?: string[]) => executeAction(torrentsClient.recheck, ids);
  
  const deleteTorrents = (deleteFiles: boolean, ids?: string[]) => {
    const targets = ids || Array.from(selectedIds);
    if (targets.length === 0) return;
    torrentsClient.delete(targets, deleteFiles);
    if (!ids) clearSelection();
  };
  
  const forceReannounce = (ids?: string[]) => {
    executeAction(torrentsClient.reannounce, ids);
  };

  const setLocation = (newPath: string, ids?: string[]) => {
    const targets = ids || Array.from(selectedIds);
    if (targets.length === 0) return;
    torrentsClient.setLocation(targets, newPath);
    if (!ids) clearSelection();
  };

  const setSpeedLimit = (dlLimit: number, upLimit: number, ids?: string[]) => {
    const targets = ids || Array.from(selectedIds);
    if (targets.length === 0) return;
    
    const dlBytes = dlLimit === 0 ? 0 : dlLimit * 1024;
    const upBytes = upLimit === 0 ? 0 : upLimit * 1024;
    
    if (torrentsClient.setDownloadLimit) torrentsClient.setDownloadLimit(targets, dlBytes);
    if (torrentsClient.setUploadLimit) torrentsClient.setUploadLimit(targets, upBytes);
    
    if (!ids) clearSelection();
  };

  const assignCategory = (category: string, ids?: string[]) => {
    const targets = ids || Array.from(selectedIds);
    if (targets.length === 0) return;
    torrentsClient.setCategory(targets, category);
    if (!ids) clearSelection();
  };

  const assignTags = (tagsString: string, ids?: string[]) => {
    const targets = ids || Array.from(selectedIds);
    if (targets.length === 0) return;
    
    const tagsArray = tagsString.split(',').map(t => t.trim()).filter(Boolean);
    if (tagsArray.length > 0) {
      torrentsClient.addTags(targets, tagsArray);
    }
    if (!ids) clearSelection();
  };

  return { 
    torrents: finalTorrents, 
    isLoading: isBooting, 
    error: null,
    sortConfig,
    onSortChange: handleSortChange,
    selectedIds,
    toggleSelection,
    toggleAll,
    clearSelection,
    pauseTorrents,
    resumeTorrents,
    deleteTorrents,
    recheckTorrents,
    forceReannounce,
    setLocation,
    setSpeedLimit,
    assignCategory,
    assignTags
  };
}