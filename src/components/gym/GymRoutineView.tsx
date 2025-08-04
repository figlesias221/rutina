import { GymRoutine } from '@/types';
import WorkoutDayCard from './WorkoutDayCard';

interface GymRoutineViewProps {
  routine: GymRoutine;
}

export default function GymRoutineView({ routine }: GymRoutineViewProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Mi Rutina de Gimnasio
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {routine.days.map((day) => (
          <WorkoutDayCard key={day.id} day={day} />
        ))}
      </div>
    </div>
  );
}
