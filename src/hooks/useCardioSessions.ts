'use client';

import { useState, useEffect } from 'react';
import { CardioSessions, CardioSession } from '@/types';
import { sampleCardioSessions } from '@/data/cardioSessions';

export function useCardioSessions() {
  const [sessions, setSessions] = useState<CardioSessions>(sampleCardioSessions);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cardio-sessions');
    if (saved) {
      try {
        setSessions(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved cardio sessions:', error);
      }
    }
  }, []);

  // Save to localStorage whenever sessions change
  useEffect(() => {
    localStorage.setItem('cardio-sessions', JSON.stringify(sessions));
  }, [sessions]);

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
    setSessions(sampleCardioSessions);
    localStorage.removeItem('cardio-sessions');
  };

  return {
    sessions: sessions.sessions,
    addSession,
    updateSession,
    removeSession,
    getSessionsByType,
    getRecentSessions,
    resetToDefault
  };
}
