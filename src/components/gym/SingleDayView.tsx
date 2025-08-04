'use client';

import { WorkoutDay, Exercise } from '@/types';
import EditableExerciseCard from './EditableExerciseCard';
import AddExerciseForm from './AddExerciseForm';

interface SingleDayViewProps {
  day: WorkoutDay;
  dayIndex: number;
  onUpdateExercise: (dayIndex: number, exerciseIndex: number, exercise: Exercise) => void;
  onAddExercise: (dayIndex: number, exercise: Exercise) => void;
  onRemoveExercise: (dayIndex: number, exerciseIndex: number) => void;
}

export default function SingleDayView({ 
  day, 
  dayIndex, 
  onUpdateExercise, 
  onAddExercise, 
  onRemoveExercise 
}: SingleDayViewProps) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          {day.name}
        </h2>
        <div className="flex justify-center space-x-4 text-sm text-gray-600">
          <span className="bg-gray-100 px-3 py-1 rounded-full">
            {day.exercises.length} ejercicios
          </span>
        </div>
      </div>
      
      <div className="space-y-3 mb-4">
        {day.exercises.map((exercise, exerciseIndex) => (
          <EditableExerciseCard
            key={exerciseIndex}
            exercise={exercise}
            onUpdate={(updatedExercise) => onUpdateExercise(dayIndex, exerciseIndex, updatedExercise)}
            onRemove={() => onRemoveExercise(dayIndex, exerciseIndex)}
          />
        ))}
      </div>
      
      <AddExerciseForm 
        onAdd={(exercise) => onAddExercise(dayIndex, exercise)}
      />
    </div>
  );
}
