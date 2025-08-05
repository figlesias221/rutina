import { CardioSessions, CardioSession } from '@/types';

export const sampleCardioSessions: CardioSessions = {
  sessions: [
    {
      id: '1',
      type: 'zone2-run',
      date: '2025-08-03',
      duration: 45,
      distance: 8.5,
      intensity: 'moderate',
      heartRate: { avg: 145, max: 165 },
      notes: 'Mantuve el ritmo constante, se sintió bien',
      completed: true
    },
    {
      id: '2',
      type: 'football',
      date: '2025-08-02',
      duration: 90,
      intensity: 'high',
      notes: 'Partido amistoso, mucha intensidad',
      completed: true
    },
    {
      id: '3',
      type: 'tennis',
      date: '2025-08-01',
      duration: 60,
      intensity: 'moderate',
      notes: 'Entrenamiento técnico con algunos puntos',
      completed: true
    }
  ]
};
