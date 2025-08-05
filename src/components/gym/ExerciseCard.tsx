import { Exercise } from '@/types';
import ExerciseImageViewer from '@/components/ExerciseImageViewer';

interface ExerciseCardProps {
  exercise: Exercise;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800 text-base sm:text-lg flex-1">{exercise.name}</h3>
        <ExerciseImageViewer exerciseName={exercise.name} />
      </div>
      <div className="text-sm sm:text-base space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Series/Reps:</span>
          <span className="font-bold text-blue-600 text-base sm:text-lg">{exercise.setsReps}</span>
        </div>
        {exercise.weight && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Carga:</span>
            <span className="font-bold text-green-600 text-base sm:text-lg">{exercise.weight}</span>
          </div>
        )}
        {exercise.comments && (
          <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-600 italic border-l-2 border-blue-200">
            💡 {exercise.comments}
          </div>
        )}
      </div>
    </div>
  );
}
