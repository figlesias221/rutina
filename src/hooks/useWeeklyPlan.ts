'use client';

import { useState, useEffect } from 'react';
import { WeeklyPlan, WorkoutDay, Exercise, CardioActivity } from '@/types';
import { weeklyPlan as defaultWeeklyPlan } from '@/data/weeklyPlan';

export function useWeeklyPlan() {
  const [plan, setPlan] = useState<WeeklyPlan>(defaultWeeklyPlan);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load from API on mount
  useEffect(() => {
    const loadPlan = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/weekly-plan');
        if (response.ok) {
          const savedPlan = await response.json();
          setPlan(savedPlan);
        } else {
          console.log('No saved plan found, using default');
        }
      } catch (error) {
        console.error('Error loading weekly plan:', error);
        setError('Error loading plan');
        // Keep using default plan on error
      } finally {
        setIsLoading(false);
      }
    };

    loadPlan();
  }, []);

  // Save to localStorage whenever plan changes
  useEffect(() => {
    if (isLoading) return; // Don't save during initial load

    try {
      localStorage.setItem('rutina-weekly-plan', JSON.stringify(plan));
      setError(null);
    } catch (error) {
      console.error('Error saving weekly plan:', error);
      setError('Error saving changes to browser storage');
    }
  }, [plan, isLoading]);

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
    setPlan(defaultWeeklyPlan);
    // The useEffect will handle saving to API
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
    isLoading,
    error
  };
}
