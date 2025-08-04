import { WorkoutDay } from '@/types';
import ExerciseCard from './ExerciseCard';

interface WorkoutDayCardProps {
  day: WorkoutDay;
}

export default function WorkoutDayCard({ day }: WorkoutDayCardProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        {day.name}
      </h2>
      <div className="space-y-3">
        {day.exercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </div>
    </div>
  );
}
