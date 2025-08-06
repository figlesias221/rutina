'use client';

import { useState } from 'react';
import { Exercise, GymRoutine } from '@/types';
import { userGymRoutine } from '@/data/gymRoutine';
import { useSupabase } from './useSupabase';

    
export function useEditableRoutine() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  
  // Use Supabase for persistence
  const {
    data: routine,
    setData: setRoutine,
    syncStatus,
    error,
    isInitialized,
    deleteData
  } = useSupabase<GymRoutine>({
    dataType: 'gym_routine',
    defaultData: userGymRoutine,
    localStorageKey: 'gym-routine',
    autoSave: true,
    debounceMs: 500
  });

  const updateExercise = (dayIndex: number, exerciseIndex: number, updatedExercise: Exercise) => {
    setRoutine((prev: GymRoutine) => ({
      ...prev,
      days: prev.days.map((day, dIndex) => 
        dIndex === dayIndex 
          ? {
              ...day,
              exercises: day.exercises.map((exercise: any, eIndex: number) => 
                eIndex === exerciseIndex ? updatedExercise : exercise
              )
            }
          : day
      )
    }));
  };

  const addExercise = (dayIndex: number, newExercise: Exercise) => {
    setRoutine((prev: GymRoutine) => ({
      ...prev,
      days: prev.days.map((day, dIndex) => 
        dIndex === dayIndex 
          ? { ...day, exercises: [...day.exercises, newExercise] }
          : day
      )
    }));
  };

  const removeExercise = (dayIndex: number, exerciseIndex: number) => {
    setRoutine((prev: GymRoutine) => ({
      ...prev,
      days: prev.days.map((day, dIndex) => 
        dIndex === dayIndex 
          ? {
              ...day,
              exercises: day.exercises.filter((_: any, eIndex: number) => eIndex !== exerciseIndex)
            }
          : day
      )
    }));
  };

  const resetToDefault = () => {
    deleteData();
  };

  return {
    routine,
    selectedDayIndex,
    setSelectedDayIndex,
    selectedDay: routine.days[selectedDayIndex],
    updateExercise,
    addExercise,
    removeExercise,
    resetToDefault,
    syncStatus,
    error,
    isInitialized
  };
}
