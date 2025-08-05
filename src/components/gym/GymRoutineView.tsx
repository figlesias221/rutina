import { GymRoutine } from '@/types';
import WorkoutDayCard from './WorkoutDayCard';

// Separate interface for WorkoutDay
interface WorkoutDay {
  id: string | number;
  exercises: Exercise[];
}

// Separate interface for Exercise
interface Exercise {
  id: string | number;
  name: string;
  // ...other exercise properties if needed
}

// Props interface
interface GymRoutineViewProps {
  routine: GymRoutine;
}

export default function GymRoutineView({ routine }: GymRoutineViewProps) {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-2">
          💪 Mi Rutina de Gimnasio
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Rutina de 4 días - {routine.days.reduce((total: number, day: WorkoutDay) => total + day.exercises.length, 0)} ejercicios totales
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {routine.days.map((day: any) => (
          <WorkoutDayCard key={day.id} day={day} />
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md border border-gray-200">
          <span className="text-green-600">🎯</span>
          <span className="text-sm font-medium text-gray-700">
            Rutina optimizada para fuerza e hipertrofia
          </span>
        </div>
      </div>
    </div>
  );
}
