'use client';

import { useEditableRoutine } from '@/hooks/useEditableRoutine';
import DayNavigator from './DayNavigator';
import SingleDayView from './SingleDayView';

export default function EditableGymRoutineView() {
  const {
    routine,
    selectedDayIndex,
    setSelectedDayIndex,
    selectedDay,
    updateExercise,
    addExercise,
    removeExercise,
    resetToDefault
  } = useEditableRoutine();

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-2">
          💪 Mi Rutina de Gimnasio
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-4">
          Rutina personalizable - {routine.days.reduce((total, day) => total + day.exercises.length, 0)} ejercicios totales
        </p>
        
        <button
          onClick={resetToDefault}
          className="text-xs text-gray-500 hover:text-red-600 underline"
        >
          Restaurar rutina original
        </button>
      </div>
      
      <DayNavigator
        days={routine.days}
        selectedIndex={selectedDayIndex}
        onSelectDay={setSelectedDayIndex}
      />
      
      <SingleDayView
        day={selectedDay}
        dayIndex={selectedDayIndex}
        onUpdateExercise={updateExercise}
        onAddExercise={addExercise}
        onRemoveExercise={removeExercise}
      />
      
      <div className="mt-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md border border-gray-200">
          <span className="text-blue-600">✏️</span>
          <span className="text-sm font-medium text-gray-700">
            Haz hover sobre ejercicios para editarlos
          </span>
        </div>
      </div>
    </div>
  );
}
