'use client';

import { Cloud, CloudOff, Save, AlertTriangle, Check } from 'lucide-react';
import { SyncStatus } from '@/hooks/useSupabase';

interface SyncStatusIndicatorProps {
  status: SyncStatus;
  error?: string | null;
}

export function SyncStatusIndicator({ status, error }: SyncStatusIndicatorProps) {
  const getStatusDisplay = () => {
    switch (status) {
      case 'loading':
        return {
          icon: <Cloud className="h-4 w-4 animate-pulse" />,
          text: 'Loading...',
          className: 'text-blue-600 bg-blue-50 border-blue-200'
        };
      case 'saving':
        return {
          icon: <Save className="h-4 w-4 animate-pulse" />,
          text: 'Saving...',
          className: 'text-blue-600 bg-blue-50 border-blue-200'
        };
      case 'saved':
        return {
          icon: <Check className="h-4 w-4" />,
          text: 'Saved',
          className: 'text-green-600 bg-green-50 border-green-200'
        };
      case 'error':
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          text: error || 'Sync error',
          className: 'text-red-600 bg-red-50 border-red-200'
        };
      case 'offline':
        return {
          icon: <CloudOff className="h-4 w-4" />,
          text: 'Offline mode',
          className: 'text-gray-600 bg-gray-50 border-gray-200'
        };
      default:
        return null;
    }
  };

  const statusDisplay = getStatusDisplay();
  
  if (!statusDisplay) return null;

  return (
    <div className={`fixed bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-lg border ${statusDisplay.className} transition-all duration-300 shadow-sm`}>
      {statusDisplay.icon}
      <span className="text-sm font-medium">{statusDisplay.text}</span>
    </div>
  );
}