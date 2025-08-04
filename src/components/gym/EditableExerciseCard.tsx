'use client';

import { useState } from 'react';
import { Exercise } from '@/types';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, Save, X } from "lucide-react";

interface EditableExerciseCardProps {
  exercise: Exercise;
  onUpdate: (updatedExercise: Exercise) => void;
  onRemove: () => void;
}

export default function EditableExerciseCard({ exercise, onUpdate, onRemove }: EditableExerciseCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(exercise);

  const handleSave = () => {
    onUpdate(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(exercise);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card className="border-2 border-primary">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">Editando ejercicio</h4>
            <Badge variant="outline">Modo edición</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Ejercicio</Label>
            <Input
              id="name"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              placeholder="Nombre del ejercicio"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="setsReps">Series/Reps</Label>
              <Input
                id="setsReps"
                value={editForm.setsReps}
                onChange={(e) => setEditForm({ ...editForm, setsReps: e.target.value })}
                placeholder="4x8"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Carga</Label>
              <Input
                id="weight"
                value={editForm.weight || ''}
                onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
                placeholder="70kg"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="comments">Comentarios</Label>
            <Textarea
              id="comments"
              value={editForm.comments || ''}
              onChange={(e) => setEditForm({ ...editForm, comments: e.target.value })}
              placeholder="Notas adicionales"
              rows={2}
            />
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button onClick={handleSave} className="flex-1" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </Button>
            <Button onClick={handleCancel} variant="outline" className="flex-1" size="sm">
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-sm sm:text-base flex-1 leading-tight">
            {exercise.name}
          </h3>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
            <Button
              onClick={() => setIsEditing(true)}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              onClick={onRemove}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Series/Reps:</span>
            <Badge variant="secondary" className="font-mono">
              {exercise.setsReps}
            </Badge>
          </div>
          {exercise.weight && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Carga:</span>
              <Badge variant="outline" className="font-mono">
                {exercise.weight}
              </Badge>
            </div>
          )}
          {exercise.comments && (
            <div className="mt-3 p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground italic">
                💡 {exercise.comments}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
