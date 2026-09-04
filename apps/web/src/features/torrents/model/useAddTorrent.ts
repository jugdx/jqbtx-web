import { useState } from 'react';
import { liveApi, mockApi } from '@jqbtx/api';

const isMock = import.meta.env.VITE_USE_MOCKS === 'true';
const torrentsClient = isMock ? mockApi.torrents : liveApi.torrents;

export function useAddTorrent() {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addTorrents = async (urls: string, files: FileList | null, onSuccess: () => void) => {
    setIsAdding(true);
    setError(null);
    
    try {
      const formData = new FormData();
      
      if (urls.trim()) {
        formData.append('urls', urls);
      }
      
      if (files && files.length > 0) {
        Array.from(files).forEach(file => {
          formData.append('torrents', file);
        });
      }

      if (!urls.trim() && (!files || files.length === 0)) {
        throw new Error("Veuillez fournir au moins un lien ou un fichier.");
      }

      await torrentsClient.add(formData);
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Erreur inconnue");
    } finally {
      setIsAdding(false);
    }
  };

  return { addTorrents, isAdding, error };
}