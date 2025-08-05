import { Exercise, WorkoutDay } from '@/types';
import ExerciseCard from './ExerciseCard';
import { Key } from 'react';

interface WorkoutDayCardProps {
  day: WorkoutDay;
}

export default function WorkoutDayCard({ day }: WorkoutDayCardProps) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {day.name}
      </h2>
      <div className="space-y-2 sm:space-y-3">
        {day.exercises.map((exercise: Exercise, index: Key | null | undefined) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </div>
      <div className="mt-4 text-center">
        <span className="inline-block bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full">
          {day.exercises.length} ejercicios
        </span>
      </div>
    </div>
  );
}
