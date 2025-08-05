'use client';

import { useState, useEffect } from 'react';
import { Exercise, GymRoutine } from '@/types';
import { userGymRoutine } from '@/data/gymRoutine';

    
export function useEditableRoutine() {
  const [routine, setRoutine] = useState<GymRoutine>(userGymRoutine);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('gym-routine');
    if (saved) {
      try {
        setRoutine(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved routine:', error);
      }
    }
  }, []);

  // Save to localStorage whenever routine changes
  useEffect(() => {
    localStorage.setItem('gym-routine', JSON.stringify(routine));
  }, [routine]);

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
    setRoutine(userGymRoutine);
    localStorage.removeItem('gym-routine');
  };

  return {
    routine,
    selectedDayIndex,
    setSelectedDayIndex,
    selectedDay: routine.days[selectedDayIndex],
    updateExercise,
    addExercise,
    removeExercise,
    resetToDefault
  };
}
