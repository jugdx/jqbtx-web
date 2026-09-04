import { useState, useEffect, useCallback } from 'react';
import { liveApi, mockApi, type RawPreferences } from '@jqbtx/api';
import { type ActionResult } from '@jqbtx/ui';

const isMock = import.meta.env.VITE_USE_MOCKS === 'true';
const settingsClient = isMock ? mockApi.settings : liveApi.settings;

export function useSettings() {
  const [preferences, setPreferences] = useState<RawPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await settingsClient.getPreferences();
      setPreferences(data);
    } catch (err: any) {
      console.error(err); 
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSettings = async (updates: Partial<RawPreferences>): Promise<ActionResult> => {
    try {
      setIsSaving(true);
      setPreferences(prev => prev ? { ...prev, ...updates } : null);
      
      await settingsClient.setPreferences(updates);
      
      return { success: true, message: 'Settings saved successfully' };
    } catch (err: any) {
      await fetchSettings();
      return { success: false, error: err.message || 'Failed to save settings' };
    } finally {
      setIsSaving(false);
    }
  };

  return { preferences, isLoading, isSaving, updateSettings };
}