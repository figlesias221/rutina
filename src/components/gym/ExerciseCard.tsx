import { Exercise } from '@/types';

interface ExerciseCardProps {
  exercise: Exercise;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
      <h3 className="font-semibold text-gray-800 mb-2">{exercise.name}</h3>
      <div className="text-sm space-y-1">
        <div className="flex justify-between">
          <span className="text-gray-600">Series/Reps:</span>
          <span className="font-medium text-blue-600">{exercise.setsReps}</span>
        </div>
        {exercise.weight && (
          <div className="flex justify-between">
            <span className="text-gray-600">Carga:</span>
            <span className="font-medium text-green-600">{exercise.weight}</span>
          </div>
        )}
        {exercise.comments && (
          <div className="mt-2 text-xs text-gray-500 italic">
            {exercise.comments}
          </div>
        )}
      </div>
    </div>
  );
}
