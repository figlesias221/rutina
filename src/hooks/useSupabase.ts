'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { supabase, getUserId, isSupabaseConfigured, UserData } from '@/lib/supabase';

export type DataType = 'gym_routine' | 'cardio_sessions' | 'weekly_plan';
export type SyncStatus = 'idle' | 'loading' | 'saving' | 'saved' | 'error' | 'offline';

interface UseSupabaseOptions {
  dataType: DataType;
  defaultData: any;
  localStorageKey: string;
  autoSave?: boolean;
  debounceMs?: number;
}

export function useSupabase<T>({
  dataType,
  defaultData,
  localStorageKey,
  autoSave = true,
  debounceMs = 500
}: UseSupabaseOptions) {
  const [data, setData] = useState<T>(defaultData);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const userId = getUserId();

  // Load data from Supabase or localStorage on mount
  const loadData = useCallback(async () => {
    setSyncStatus('loading');
    setError(null);

    try {
      // First, try to load from localStorage as immediate fallback
      const localData = localStorage.getItem(localStorageKey);
      if (localData) {
        try {
          const parsed = JSON.parse(localData);
          setData(parsed);
          console.log(`Loaded ${dataType} from localStorage`);
        } catch (e) {
          console.error('Error parsing local data:', e);
        }
      }

      // Then try to load from Supabase if configured
      if (isSupabaseConfigured() && supabase) {
        console.log(`Fetching ${dataType} from Supabase for user ${userId}`);
        const { data: remoteData, error: fetchError } = await supabase
          .from('user_data')
          .select('*')
          .eq('user_id', userId)
          .eq('data_type', dataType)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows found
          console.error(`Error fetching ${dataType}:`, fetchError);
          throw fetchError;
        }

        if (remoteData) {
          console.log(`Successfully loaded ${dataType} from Supabase`, remoteData);
          setData(remoteData.data);
          // Update localStorage with remote data
          localStorage.setItem(localStorageKey, JSON.stringify(remoteData.data));
        } else {
          console.log(`No existing ${dataType} data found in Supabase for user ${userId}`);
        }
        
        setSyncStatus('idle');
      } else {
        // No Supabase configured, use localStorage only
        console.warn('Supabase not configured, using localStorage only');
        setSyncStatus('offline');
      }
    } catch (err) {
      console.error(`Error loading ${dataType} data:`, err);
      setError('Failed to load data from server');
      setSyncStatus('error');
    } finally {
      setIsInitialized(true);
    }
  }, [dataType, userId, localStorageKey]);

  // Save data to Supabase
  const saveData = useCallback(async (dataToSave: T) => {
    // Always save to localStorage first (optimistic update)
    localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
    
    if (!isSupabaseConfigured() || !supabase) {
      setSyncStatus('offline');
      return;
    }

    setSyncStatus('saving');
    setError(null);

    try {
      const userData: UserData = {
        user_id: userId,
        data_type: dataType,
        data: dataToSave,
        updated_at: new Date().toISOString()
      };

      // First, check if record exists
      const { data: existingData, error: selectError } = await supabase
        .from('user_data')
        .select('id')
        .eq('user_id', userId)
        .eq('data_type', dataType)
        .single();

      let result;
      if (existingData) {
        // Update existing record
        result = await supabase
          .from('user_data')
          .update({
            data: dataToSave,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId)
          .eq('data_type', dataType);
      } else {
        // Insert new record
        result = await supabase
          .from('user_data')
          .insert(userData);
      }

      if (result.error) throw result.error;

      setSyncStatus('saved');
      console.log(`Data saved successfully for ${dataType}`);
      
      // Reset to idle after a short delay
      setTimeout(() => setSyncStatus('idle'), 2000);
    } catch (err) {
      console.error('Error saving data:', err);
      setError('Failed to save data to server');
      setSyncStatus('error');
    }
  }, [dataType, userId, localStorageKey]);

  // Debounced save
  const debouncedSave = useCallback((dataToSave: T) => {
    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout
    saveTimeoutRef.current = setTimeout(() => {
      saveData(dataToSave);
    }, debounceMs);
  }, [saveData, debounceMs]);

  // Update data and trigger save
  const updateData = useCallback((newData: T | ((prev: T) => T)) => {
    setData(prev => {
      const updated = typeof newData === 'function' 
        ? (newData as (prev: T) => T)(prev)
        : newData;
      
      if (autoSave) {
        debouncedSave(updated);
      }
      
      return updated;
    });
  }, [autoSave, debouncedSave]);

  // Delete data
  const deleteData = useCallback(async () => {
    localStorage.removeItem(localStorageKey);
    setData(defaultData);
    
    if (!isSupabaseConfigured() || !supabase) {
      return;
    }

    try {
      const { error: deleteError } = await supabase
        .from('user_data')
        .delete()
        .eq('user_id', userId)
        .eq('data_type', dataType);

      if (deleteError) throw deleteError;
      
      setSyncStatus('idle');
    } catch (err) {
      console.error('Error deleting data:', err);
      setError('Failed to delete data from server');
      setSyncStatus('error');
    }
  }, [dataType, userId, localStorageKey, defaultData]);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return {
    data,
    setData: updateData,
    syncStatus,
    error,
    isInitialized,
    saveData: () => saveData(data),
    reloadData: loadData,
    deleteData,
    isSupabaseConfigured: isSupabaseConfigured()
  };
}