'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus } from 'lucide-react'
import { useWeeklyPlan } from '@/hooks/useWeeklyPlan'
import { useExerciseImages } from '@/hooks/useExerciseImages'
import EditableExerciseCard from '@/components/gym/EditableExerciseCard'
import CardioCard from './CardioCard'
import WeekNavigator from './WeekNavigator'
import AddExerciseDialog from '@/components/AddExerciseDialog'
import AddCardioDialog from '@/components/weekly/AddCardioDialog'
import ExerciseImagesSummary from '@/components/ExerciseImagesSummary'
import { CardioType, Exercise } from '@/types'

export default function WeeklyPlanView() {
  const { plan, updateExercise, updateCardio, addExercise, removeExercise, addCardio, removeCardio, isLoading, error } = useWeeklyPlan()
  const [selectedDay, setSelectedDay] = useState(0) // 0 = Monday
  const [showAddExercise, setShowAddExercise] = useState(false)
  const [showAddCardio, setShowAddCardio] = useState(false)

  // Get all exercise names from the current plan for preloading images
  const allExerciseNames = plan.days.flatMap(day => 
    day.gymExercises?.map(ex => ex.name) || []
  );
  
  // Preload exercise images
  const exerciseImages = useExerciseImages(allExerciseNames);

  const currentDay = plan.days[selectedDay]
  const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏋️‍♂️</div>
          <h2 className="text-xl font-semibold mb-2">Cargando tu rutina...</h2>
          <p className="text-muted-foreground">Espera un momento</p>
        </div>
      </div>
    )
  }

  if (!currentDay) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-xl font-semibold mb-2">Error cargando el día</h2>
          <p className="text-muted-foreground">No se pudo cargar la información del día seleccionado</p>
        </div>
      </div>
    )
  }

  const handleAddExercise = (exercise: { name: string; reps: string; sets: number; notes?: string }) => {
    const newExercise: Exercise = {
      name: exercise.name,
      setsReps: `${exercise.sets}x${exercise.reps}`,
      weight: '',
      comments: exercise.notes || ''
    };
    addExercise(selectedDay, newExercise);
    setShowAddExercise(false);
  }

  const handleAddCardio = (cardio: { type: CardioType; duration?: string; intensity?: string; notes?: string }) => {
    addCardio(selectedDay, cardio)
    setShowAddCardio(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Mi Rutina Semanal
          </h1>
          <p className="text-muted-foreground">
            Tu plan semanal de ejercicios y cardio
          </p>
          {error && (
            <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-destructive text-sm">
                ⚠️ {error} - Los cambios se guardarán cuando se resuelva el problema
              </p>
            </div>
          )}
        </div>

        {/* Week Navigator */}
        <WeekNavigator
          days={plan.days}
          selectedIndex={selectedDay}
          onSelectDay={setSelectedDay}
        />

        {/* Day View */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-bold">{dayNames[selectedDay]}</h2>
              <div className="flex gap-2">
                {(currentDay.gymExercises?.length > 0) && (
                  <Badge variant="secondary" className="font-medium">
                    💪 Gimnasio
                  </Badge>
                )}
                {(currentDay.cardioActivities?.length ?? 0) > 0 && (
                  <Badge variant="outline" className="font-medium">
                    🏃 Cardio
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => setShowAddExercise(true)}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Ejercicio
              </Button>
              <Button 
                onClick={() => setShowAddCardio(true)}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Cardio
              </Button>
            </div>
          </div>

          {/* Exercise Images Summary */}
          {currentDay.gymExercises?.length > 0 && (
            <div className="mb-6">
              <ExerciseImagesSummary 
                exerciseNames={currentDay.gymExercises.map(ex => ex.name)}
                onRefreshAll={() => {
                  // Refresh all exercise images for this day
                  currentDay.gymExercises.forEach(ex => {
                    exerciseImages.refreshExercise(ex.name);
                  });
                }}
              />
            </div>
          )}

          {/* Content */}
          {(!currentDay.gymExercises?.length && !(currentDay.cardioActivities?.length ?? 0)) ? (
            <Card className="p-12 text-center">
              <CardContent>
                <div className="text-6xl mb-4">😴</div>
                <h3 className="text-xl font-semibold mb-2">Día de descanso</h3>
                <p className="text-muted-foreground mb-4">
                  No hay actividades programadas para hoy
                </p>
                <div className="flex gap-2 justify-center">
                  <Button 
                    onClick={() => setShowAddExercise(true)}
                    variant="outline"
                    size="sm"
                  >
                    Agregar ejercicio
                  </Button>
                  <Button 
                    onClick={() => setShowAddCardio(true)}
                    variant="outline"
                    size="sm"
                  >
                    Agregar cardio
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {/* Gym Exercises */}
              {currentDay.gymExercises?.map((exercise, index) => {
                const exerciseMatch = exerciseImages.getExerciseMatch(exercise.name);
                const hasImages = exerciseImages.hasImages(exercise.name);
                
                return (
                  <div key={`gym-${index}`} className="relative">
                    <EditableExerciseCard
                      exercise={exercise}
                      onUpdate={(updatedExercise) => updateExercise(selectedDay, index, updatedExercise)}
                      onRemove={() => removeExercise(selectedDay, index)}
                    />
                    {/* Visual indicator for image availability */}
                    {hasImages && (
                      <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm" 
                           title="Fotos disponibles" />
                    )}
                  </div>
                );
              })}

              {/* Cardio Activities */}
              {(currentDay.cardioActivities ?? []).map((cardio, index) => (
                <CardioCard
                  key={`cardio-${index}`}
                  cardio={cardio}
                  onUpdate={(updatedCardio) => {
                    if (updatedCardio === undefined) {
                      removeCardio(selectedDay, index);
                    } else {
                      updateCardio(selectedDay, index, updatedCardio);
                    }
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Dialogs */}
        <AddExerciseDialog
          open={showAddExercise}
          onOpenChange={setShowAddExercise}
          onAdd={handleAddExercise}
        />
        <AddCardioDialog
          open={showAddCardio}
          onOpenChange={setShowAddCardio}
          onAdd={handleAddCardio}
        />
      </div>
    </div>
  )
}
