'use client';

import { CardioSessions, CardioSession } from '@/types';
import { sampleCardioSessions } from '@/data/cardioSessions';
import { useSupabase } from './useSupabase';

export function useCardioSessions() {
  // Use Supabase for persistence
  const {
    data: sessions,
    setData: setSessions,
    syncStatus,
    error,
    isInitialized,
    deleteData
  } = useSupabase<CardioSessions>({
    dataType: 'cardio_sessions',
    defaultData: sampleCardioSessions,
    localStorageKey: 'cardio-sessions',
    autoSave: true,
    debounceMs: 500
  });

  const addSession = (newSession: Omit<CardioSession, 'id'>) => {
    const session: CardioSession = {
      ...newSession,
      id: Date.now().toString()
    };
    
    setSessions(prev => ({
      sessions: [session, ...prev.sessions]
    }));
  };

  const updateSession = (sessionId: string, updatedSession: Partial<CardioSession>) => {
    setSessions(prev => ({
      sessions: prev.sessions.map(session => 
        session.id === sessionId 
          ? { ...session, ...updatedSession }
          : session
      )
    }));
  };

  const removeSession = (sessionId: string) => {
    setSessions(prev => ({
      sessions: prev.sessions.filter(session => session.id !== sessionId)
    }));
  };

  const getSessionsByType = (type: CardioSession['type']) => {
    return sessions.sessions.filter(session => session.type === type);
  };

  const getRecentSessions = (limit: number = 10) => {
    return sessions.sessions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  };

  const resetToDefault = () => {
    deleteData();
  };

  return {
    sessions: sessions.sessions,
    addSession,
    updateSession,
    removeSession,
    getSessionsByType,
    getRecentSessions,
    resetToDefault,
    syncStatus,
    error,
    isInitialized
  };
}
