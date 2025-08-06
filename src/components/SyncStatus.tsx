'use client';

import { SyncStatus as SyncStatusType } from '@/hooks/useSupabase';
import { Cloud, CloudOff, Loader2, Check, AlertCircle } from 'lucide-react';

interface SyncStatusProps {
  status: SyncStatusType;
  error?: string | null;
}

export function SyncStatus({ status, error }: SyncStatusProps) {
  const getStatusDisplay = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
        );
      case 'saving':
        return (
          <div className="flex items-center gap-2 text-blue-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Saving...</span>
          </div>
        );
      case 'saved':
        return (
          <div className="flex items-center gap-2 text-green-500">
            <Check className="h-4 w-4" />
            <span className="text-sm">Saved</span>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center gap-2 text-red-500">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{error || 'Error'}</span>
          </div>
        );
      case 'offline':
        return (
          <div className="flex items-center gap-2 text-gray-400">
            <CloudOff className="h-4 w-4" />
            <span className="text-sm">Offline mode</span>
          </div>
        );
      case 'idle':
        return (
          <div className="flex items-center gap-2 text-gray-400">
            <Cloud className="h-4 w-4" />
            <span className="text-sm">Connected</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg px-4 py-2 border">
      {getStatusDisplay()}
    </div>
  );
}