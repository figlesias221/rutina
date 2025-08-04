import { Exercise } from '@/types';

interface ExerciseCardProps {
  exercise: Exercise;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">{exercise.name}</h3>
      <div className="text-xs sm:text-sm space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Series/Reps:</span>
          <span className="font-bold text-blue-600 text-sm sm:text-base">{exercise.setsReps}</span>
        </div>
        {exercise.weight && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Carga:</span>
            <span className="font-bold text-green-600 text-sm sm:text-base">{exercise.weight}</span>
          </div>
        )}
        {exercise.comments && (
          <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600 italic border-l-2 border-blue-200">
            💡 {exercise.comments}
          </div>
        )}
      </div>
    </div>
  );
}
