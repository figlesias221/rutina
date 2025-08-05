'use client';

import { useState } from 'react';
import { Exercise } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp, Plus, Edit2, Trash2, Save, X, Dumbbell } from "lucide-react";
import ExerciseImageViewer from '@/components/ExerciseImageViewer';

interface GymSessionCardProps {
  exercises: Exercise[];
  onUpdateExercise: (index: number, exercise: Exercise) => void;
  onRemoveExercise: (index: number) => void;
  onAddExercise: (exercise: Exercise) => void;
  onRemoveSession?: () => void;
}

export default function GymSessionCard({ 
  exercises, 
  onUpdateExercise, 
  onRemoveExercise, 
  onAddExercise,
  onRemoveSession 
}: GymSessionCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Exercise | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newExercise, setNewExercise] = useState<Exercise>({
    name: '',
    setsReps: '',
    weight: '',
    comments: ''
  });

  const handleEditStart = (index: number) => {
    setEditingIndex(index);
    setEditForm({ ...exercises[index] });
  };

  const handleEditSave = () => {
    if (editingIndex !== null && editForm) {
      onUpdateExercise(editingIndex, editForm);
      setEditingIndex(null);
      setEditForm(null);
    }
  };

  const handleEditCancel = () => {
    setEditingIndex(null);
    setEditForm(null);
  };

  const handleAddNew = () => {
    if (newExercise.name && newExercise.setsReps) {
      onAddExercise(newExercise);
      setNewExercise({ name: '', setsReps: '', weight: '', comments: '' });
      setIsAddingNew(false);
    }
  };

  const handleCancelAdd = () => {
    setNewExercise({ name: '', setsReps: '', weight: '', comments: '' });
    setIsAddingNew(false);
  };

  // If no exercises and not adding, show the add card
  if (exercises.length === 0 && !isAddingNew) {
    return (
      <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors cursor-pointer">
        <CardContent 
          className="flex flex-col items-center justify-center p-6 text-center"
          onClick={() => setIsAddingNew(true)}
        >
          <Dumbbell className="w-6 h-6 text-muted-foreground mb-1" />
          <span className="text-sm font-medium text-muted-foreground">
            Agregar Sesión de Gimnasio
          </span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardHeader className="pb-3 pt-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <span className="text-4xl">💪</span>
            <CardTitle className="text-2xl sm:text-3xl font-bold">Sesión de Gimnasio</CardTitle>
            <Badge variant="secondary" className="text-sm py-0.5 px-2">
              {exercises.length} ejercicio{exercises.length !== 1 ? 's' : ''}
            </Badge>
          </div>
          <div className="flex gap-1">
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
            {onRemoveSession && exercises.length === 0 && (
              <Button
                onClick={onRemoveSession}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0 pb-2">
          <div className="space-y-1.5">
            {/* Exercise List */}
            {exercises.map((exercise, index) => (
              <div key={index} className="border rounded-md p-2 bg-muted/30">
                {editingIndex === index && editForm ? (
                  // Edit Mode
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">Ejercicio</Label>
                        <Input
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="h-7 text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Series/Reps</Label>
                        <Input
                          value={editForm.setsReps}
                          onChange={(e) => setEditForm({ ...editForm, setsReps: e.target.value })}
                          className="h-7 text-xs"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">Carga</Label>
                        <Input
                          value={editForm.weight}
                          onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
                          className="h-7 text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Notas</Label>
                        <Input
                          value={editForm.comments}
                          onChange={(e) => setEditForm({ ...editForm, comments: e.target.value })}
                          className="h-7 text-xs"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleEditSave} size="sm" className="flex-1">
                        <Save className="w-3 h-3 mr-1" />
                        Guardar
                      </Button>
                      <Button onClick={handleEditCancel} variant="outline" size="sm" className="flex-1">
                        <X className="w-3 h-3 mr-1" />
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  // Display Mode - Mobile optimized
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-lg sm:text-xl flex-1">{exercise.name}</h4>
                          <ExerciseImageViewer exerciseName={exercise.name} />
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className="text-sm py-0.5 px-2">
                            {exercise.setsReps}
                          </Badge>
                          {exercise.weight && (
                            <Badge variant="secondary" className="text-sm py-0.5 px-2">
                              {exercise.weight}
                            </Badge>
                          )}
                          {exercise.comments && (
                            <span className="text-sm text-muted-foreground italic">
                              {exercise.comments}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button
                        onClick={() => handleEditStart(index)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => onRemoveExercise(index)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Add New Exercise Form */}
            {isAddingNew ? (
              <div className="border-2 border-primary rounded-md p-2 bg-primary/5">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Ejercicio</Label>
                      <Input
                        value={newExercise.name}
                        onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                        placeholder="Nombre del ejercicio"
                        className="h-7 text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Series/Reps</Label>
                      <Input
                        value={newExercise.setsReps}
                        onChange={(e) => setNewExercise({ ...newExercise, setsReps: e.target.value })}
                        placeholder="ej: 4x8"
                        className="h-7 text-xs"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Carga (opcional)</Label>
                      <Input
                        value={newExercise.weight}
                        onChange={(e) => setNewExercise({ ...newExercise, weight: e.target.value })}
                        placeholder="ej: 80kg"
                        className="h-7 text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Notas (opcional)</Label>
                      <Input
                        value={newExercise.comments}
                        onChange={(e) => setNewExercise({ ...newExercise, comments: e.target.value })}
                        placeholder="ej: RIR 2"
                        className="h-7 text-xs"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddNew} size="sm" className="flex-1">
                      <Plus className="w-3 h-3 mr-1" />
                      Agregar
                    </Button>
                    <Button onClick={handleCancelAdd} variant="outline" size="sm" className="flex-1">
                      <X className="w-3 h-3 mr-1" />
                      Cancelar
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setIsAddingNew(true)}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Ejercicio
              </Button>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}