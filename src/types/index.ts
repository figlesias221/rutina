// Types for gym exercises and cardio sessions

export interface Exercise {
  name: string;
  setsReps: string;
  weight?: string;
  comments?: string;
}

export interface WorkoutDay {
  id: string;
  name: string;
  exercises: Exercise[];
}

export interface GymRoutine {
  days: WorkoutDay[];
}

export type CardioType = 'zone2-run' | 'football' | 'tennis' | 'vo2-training';

export interface CardioSession {
  id: string;
  type: CardioType;
  date: string;
  duration?: number; // in minutes
  distance?: number; // in km
  notes?: string;
}

export interface CardioSessions {
  sessions: CardioSession[];
}
