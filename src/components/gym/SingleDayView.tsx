'use client';

import { WorkoutDay, Exercise } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
    <Card className="w-full">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl sm:text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {day.name}
        </CardTitle>
        <div className="flex justify-center items-center space-x-2">
          <Badge variant="secondary">
            {day.exercises.length} ejercicios
          </Badge>
        </div>
      </CardHeader>
      
      <Separator className="mb-6" />
      
      <CardContent className="space-y-4">
        {day.exercises.map((exercise, exerciseIndex) => (
          <EditableExerciseCard
            key={exerciseIndex}
            exercise={exercise}
            onUpdate={(updatedExercise) => onUpdateExercise(dayIndex, exerciseIndex, updatedExercise)}
            onRemove={() => onRemoveExercise(dayIndex, exerciseIndex)}
          />
        ))}
        
        <div className="pt-2">
          <AddExerciseForm 
            onAdd={(exercise) => onAddExercise(dayIndex, exercise)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
