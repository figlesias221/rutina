'use client';

import { useState } from 'react';
import { WeeklyPlan, WorkoutDay, Exercise, CardioActivity } from '@/types';
import { weeklyPlan as defaultWeeklyPlan } from '@/data/weeklyPlan';
import { useSupabase } from './useSupabase';

export function useWeeklyPlan() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  
  // Use Supabase for persistence
  const {
    data: plan,
    setData: setPlan,
    syncStatus,
    error,
    isInitialized: isLoading,
    deleteData
  } = useSupabase<WeeklyPlan>({
    dataType: 'weekly_plan',
    defaultData: defaultWeeklyPlan,
    localStorageKey: 'rutina-weekly-plan',
    autoSave: true,
    debounceMs: 500
  });

  const updateExercise = (dayIndex: number, exerciseIndex: number, updatedExercise: Exercise) => {
    setPlan(prev => ({
      ...prev,
      days: prev.days.map((day, dIndex) => 
        dIndex === dayIndex 
          ? {
              ...day,
              gymExercises: day.gymExercises.map((exercise, eIndex) => 
                eIndex === exerciseIndex ? updatedExercise : exercise
              )
            }
          : day
      )
    }));
  };

  const addExercise = (dayIndex: number, newExercise: Exercise) => {
    setPlan(prev => ({
      ...prev,
      days: prev.days.map((day, dIndex) => 
        dIndex === dayIndex 
          ? { ...day, gymExercises: [...day.gymExercises, newExercise] }
          : day
      )
    }));
  };

  const removeExercise = (dayIndex: number, exerciseIndex: number) => {
    setPlan(prev => ({
      ...prev,
      days: prev.days.map((day, dIndex) => 
        dIndex === dayIndex 
          ? {
              ...day,
              gymExercises: day.gymExercises.filter((_, eIndex) => eIndex !== exerciseIndex)
            }
          : day
      )
    }));
  };

  const updateCardio = (dayIndex: number, cardioIndex: number, cardioActivity: CardioActivity) => {
    setPlan(prev => ({
      ...prev,
      days: prev.days.map((day, dIndex) => 
        dIndex === dayIndex 
          ? { 
              ...day, 
              cardioActivities: day.cardioActivities.map((cardio, cIndex) => 
                cIndex === cardioIndex ? cardioActivity : cardio
              )
            }
          : day
      )
    }));
  };

  const addCardio = (dayIndex: number, newCardio: CardioActivity) => {
    setPlan(prev => ({
      ...prev,
      days: prev.days.map((day, dIndex) => 
        dIndex === dayIndex 
          ? { ...day, cardioActivities: [...day.cardioActivities, newCardio] }
          : day
      )
    }));
  };

  const removeCardio = (dayIndex: number, cardioIndex: number) => {
    setPlan(prev => ({
      ...prev,
      days: prev.days.map((day, dIndex) => 
        dIndex === dayIndex 
          ? {
              ...day,
              cardioActivities: day.cardioActivities.filter((_, cIndex) => cIndex !== cardioIndex)
            }
          : day
      )
    }));
  };

  const updateDayName = (dayIndex: number, newName: string) => {
    setPlan(prev => ({
      ...prev,
      days: prev.days.map((day, dIndex) => 
        dIndex === dayIndex 
          ? { ...day, name: newName }
          : day
      )
    }));
  };

  const resetToDefault = () => {
    deleteData();
  };

  return {
    plan,
    selectedDayIndex,
    setSelectedDayIndex,
    selectedDay: plan.days[selectedDayIndex],
    updateExercise,
    addExercise,
    removeExercise,
    updateCardio,
    addCardio,
    removeCardio,
    updateDayName,
    resetToDefault,
    isLoading: !isLoading, // Invert because useSupabase returns isInitialized
    error,
    syncStatus
  };
}
