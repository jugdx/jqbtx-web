import { useState, useEffect } from 'react';
import { formatBytes, formatDate } from '@jqbtx/ui';
import { liveApi, mockApi } from '@jqbtx/api';

const isMock = import.meta.env.VITE_USE_MOCKS === 'true';
const torrentsClient = isMock ? mockApi.torrents : liveApi.torrents;

export interface TorrentPropertiesView {
  savePath: string;
  creationDate: string;
  pieceSize: string;
  totalPieces: string;
  shareRatio: string;
  downloaded: string;
  uploaded: string;
  peers: string;
  seeds: string;
}

export interface TorrentFileView {
    id: number;
    name: string;
    size: string;
    progress: number;
    priority: number;
  }

export interface TorrentTrackerView {
  url: string;
  status: string;
  peers: number;
  seeds: number;
}

export function useTorrentDetails(hash: string | null) {
    const [isLoading, setIsLoading] = useState(false);
    const [properties, setProperties] = useState<TorrentPropertiesView | null>(null);
    const [files, setFiles] = useState<TorrentFileView[]>([]);
    const [trackers, setTrackers] = useState<TorrentTrackerView[]>([]);

    useEffect(() => {
        if (!hash) {
            setProperties(null);
            setFiles([]);
            setTrackers([]);
            return;
        }

        let isSubscribed = true;

        const fetchDetails = async () => {
            if (!properties) setIsLoading(true);
            
            try {
            const [rawProps, rawFiles, rawTrackers] = await Promise.all([
                torrentsClient.getProperties(hash),
                torrentsClient.getFiles(hash),
                torrentsClient.getTrackers(hash)
            ]);

            if (!isSubscribed) return;

            setProperties({
                savePath: rawProps.save_path || 'Unknown',
                creationDate: rawProps.creation_date ? formatDate(rawProps.creation_date) : 'Unknown',
                pieceSize: rawProps.piece_size ? formatBytes(rawProps.piece_size) : '0 B',
                totalPieces: (rawProps.pieces_num ?? rawProps.total_pieces ?? 0).toString(),
                shareRatio: typeof rawProps.share_ratio === 'number' ? rawProps.share_ratio.toFixed(2) : '0.00',
                downloaded: rawProps.total_downloaded ? formatBytes(rawProps.total_downloaded) : '0 B',
                uploaded: rawProps.total_uploaded ? formatBytes(rawProps.total_uploaded) : '0 B',
                peers: `${rawProps.peers || 0} / ${rawProps.peers_total || 0}`,
                seeds: `${rawProps.seeds || 0} / ${rawProps.seeds_total || 0}`,
            });

            setFiles((rawFiles || []).map((f, index) => ({
                id: index,
                name: f.name || 'Unknown',
                size: f.size ? formatBytes(f.size) : '0 B',
                progress: typeof f.progress === 'number' ? Math.round(f.progress * 100) : 0,
                priority: f.priority ?? 1,
            })));

            setTrackers(rawTrackers.map(t => ({
                url: t.url,
                status: t.status === 2 ? 'Working' : t.status === 1 ? 'Not contacted' : 'Other',
                peers: t.num_peers,
                seeds: t.num_seeds
            })));

            } catch (error) {
                console.error("Erreur lors de la récupération des détails", error);
            } finally {
                if (isSubscribed) setIsLoading(false);
            }
        };

        fetchDetails();

        const intervalId = setInterval(fetchDetails, 5000);

        return () => {
            isSubscribed = false;
            clearInterval(intervalId);
        };
    }, [hash]);

    const updateFilePriority = async (fileId: number, priority: number) => {
        if (!hash) return;

        setFiles(prev => prev.map(f => f.id === fileId ? { ...f, priority } : f));
        
        try {
            await torrentsClient.setFilePriority(hash, [fileId], priority);
        } catch (error) {
            console.error("Erreur de changement de priorité", error);
        }
    };
    return { isLoading, properties, files, trackers, updateFilePriority };
}