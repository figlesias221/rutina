// Types for gym exercises and cardio sessions

export interface Exercise {
  name: string;
  setsReps: string;
  weight?: string;
  comments?: string;
}

export type CardioType = 'zone2-run' | 'football' | 'tennis' | 'vo2-training' | 'rest';

export interface CardioActivity {
  type: CardioType;
  duration?: string; // e.g., "30 min", "5km", "1 hora"
  intensity?: string; // e.g., "Zona 2", "Alta", "Moderada"
  notes?: string;
}

export interface WorkoutDay {
  exercises: Exercise[];
  id: string;
  name: string;
  dayOfWeek: string; // "Lunes", "Martes", etc.
  gymExercises: Exercise[];
  cardioActivities: CardioActivity[];
}

export interface WeeklyPlan {
  name: string;
  days: WorkoutDay[];
}

export interface CardioSession {
  id: string;
  type: CardioType;
  date: string;
  duration?: number; // in minutes
  distance?: number; // in km
  intensity?: 'low' | 'moderate' | 'high' | 'max';
  heartRate?: {
    avg?: number;
    max?: number;
  };
  notes?: string;
  completed: boolean;
}

export interface CardioSessions {
  sessions: CardioSession[];
}

export const CardioTypeLabels: Record<CardioType, string> = {
  'zone2-run': 'Zone 2 Run',
  'football': 'Fútbol',
  'tennis': 'Tennis',
  'vo2-training': 'VO2 Training',
  'rest': 'Descanso'
};

export const CardioTypeEmojis: Record<CardioType, string> = {
  'zone2-run': '🏃‍♂️',
  'football': '⚽',
  'tennis': '🎾',
  'vo2-training': '💨',
  'rest': '😴'
};

export interface GymRoutine {
  days: WorkoutDay[];
  // ...other properties if needed
}
