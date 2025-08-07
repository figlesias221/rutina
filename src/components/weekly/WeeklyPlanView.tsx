'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Plus, Edit2, Save, X } from 'lucide-react'
import { useWeeklyPlan } from '@/hooks/useWeeklyPlan'
import { useExerciseImages } from '@/hooks/useExerciseImages'
import GymSessionCard from './GymSessionCard'
import CardioCard from './CardioCard'
import WeekNavigator from './WeekNavigator'
import AddExerciseDialog from '@/components/AddExerciseDialog'
import AddCardioDialog from '@/components/weekly/AddCardioDialog'
import { CardioType, Exercise } from '@/types'
import { MotivationalQuote } from '@/components/MotivationalQuote'

export default function WeeklyPlanView() {
  const { plan, updateExercise, updateCardio, addExercise, removeExercise, addCardio, removeCardio, updateDayName, isLoading, error } = useWeeklyPlan()
  const [selectedDay, setSelectedDay] = useState(0) // 0 = Monday
  const [showAddExercise, setShowAddExercise] = useState(false)
  const [showAddCardio, setShowAddCardio] = useState(false)
  const [editingDayName, setEditingDayName] = useState(false)
  const [tempDayName, setTempDayName] = useState('')

  // Get all exercise names from the current plan for preloading images
  const allExerciseNames = plan.days.flatMap(day => 
    day.gymExercises?.map(ex => ex.name) || []
  );
  
  // Preload exercise images
  const exerciseImages = useExerciseImages(allExerciseNames);

  const currentDay = plan.days[selectedDay]

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
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold tracking-tight mb-2">
            Mi Rutina Semanal
          </h1>
          <p className="text-lg text-muted-foreground">
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

        {/* Motivational Quote */}
        <MotivationalQuote 
          mode="daily"
          showRefresh={true}
          className="mb-6"
        />

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
              {editingDayName ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={tempDayName}
                    onChange={(e) => setTempDayName(e.target.value)}
                    className="w-48 h-10 text-xl font-bold"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        // Save day name
                        updateDayName(selectedDay, tempDayName);
                        setEditingDayName(false);
                      } else if (e.key === 'Escape') {
                        setEditingDayName(false);
                      }
                    }}
                  />
                  <Button
                    onClick={() => {
                      updateDayName(selectedDay, tempDayName);
                      setEditingDayName(false);
                    }}
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => setEditingDayName(false)}
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 group">
                  <h2 className="text-3xl font-bold">{currentDay.name}</h2>
                  <Button
                    onClick={() => {
                      setTempDayName(currentDay.name);
                      setEditingDayName(true);
                    }}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
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
            {/* Buttons removed - now inside cards */}
          </div>

          {/* Images now shown inside gym card */}

          {/* Content */}
          <div className="grid gap-4">
            {/* Gym Session - Always show */}
            <GymSessionCard
              exercises={currentDay.gymExercises || []}
              onUpdateExercise={(index, exercise) => updateExercise(selectedDay, index, exercise)}
              onRemoveExercise={(index) => removeExercise(selectedDay, index)}
              onAddExercise={(exercise) => addExercise(selectedDay, exercise)}
            />

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
            
            {/* Add Cardio Card - Always show at the end */}
            <CardioCard
              cardio={undefined}
              onUpdate={(newCardio) => {
                if (newCardio) {
                  addCardio(selectedDay, newCardio);
                }
              }}
            />
          </div>
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
