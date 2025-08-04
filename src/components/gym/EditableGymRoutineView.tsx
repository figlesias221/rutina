'use client';

import { useEditableRoutine } from '@/hooks/useEditableRoutine';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Dumbbell, Edit3 } from "lucide-react";
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
        <div className="flex items-center justify-center mb-4">
          <Dumbbell className="w-8 h-8 text-primary mr-3" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Mi Rutina de Gimnasio
          </h1>
        </div>
        
        <div className="flex justify-center items-center space-x-4 mb-4">
          <Badge variant="outline" className="text-sm">
            Rutina personalizable
          </Badge>
          <Badge variant="secondary" className="text-sm">
            {routine.days.reduce((total, day) => total + day.exercises.length, 0)} ejercicios totales
          </Badge>
        </div>
        
        <Button
          onClick={resetToDefault}
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-destructive"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Restaurar rutina original
        </Button>
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
        <div className="inline-flex items-center space-x-2 bg-muted/50 rounded-full px-4 py-2 text-sm text-muted-foreground">
          <Edit3 className="w-4 h-4" />
          <span>Haz hover sobre ejercicios para editarlos</span>
        </div>
      </div>
    </div>
  );
}
