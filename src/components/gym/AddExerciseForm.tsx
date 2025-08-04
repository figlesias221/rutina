'use client';

import { useState } from 'react';
import { Exercise } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, X } from "lucide-react";

interface AddExerciseFormProps {
  onAdd: (exercise: Exercise) => void;
}

export default function AddExerciseForm({ onAdd }: AddExerciseFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newExercise, setNewExercise] = useState<Exercise>({
    name: '',
    setsReps: '',
    weight: '',
    comments: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExercise.name.trim() && newExercise.setsReps.trim()) {
      onAdd({
        ...newExercise,
        weight: newExercise.weight || undefined,
        comments: newExercise.comments || undefined
      });
      setNewExercise({ name: '', setsReps: '', weight: '', comments: '' });
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setNewExercise({ name: '', setsReps: '', weight: '', comments: '' });
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors cursor-pointer">
        <CardContent 
          className="flex flex-col items-center justify-center p-6 text-center"
          onClick={() => setIsOpen(true)}
        >
          <Plus className="w-8 h-8 text-muted-foreground mb-2" />
          <span className="text-sm font-medium text-muted-foreground">
            Agregar Ejercicio
          </span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-primary">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Ejercicio
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-name">Ejercicio *</Label>
            <Input
              id="new-name"
              value={newExercise.name}
              onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
              placeholder="Nombre del ejercicio"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-setsReps">Series/Reps *</Label>
              <Input
                id="new-setsReps"
                value={newExercise.setsReps}
                onChange={(e) => setNewExercise({ ...newExercise, setsReps: e.target.value })}
                placeholder="4x8"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-weight">Carga</Label>
              <Input
                id="new-weight"
                value={newExercise.weight}
                onChange={(e) => setNewExercise({ ...newExercise, weight: e.target.value })}
                placeholder="70kg"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="new-comments">Comentarios</Label>
            <Textarea
              id="new-comments"
              value={newExercise.comments}
              onChange={(e) => setNewExercise({ ...newExercise, comments: e.target.value })}
              placeholder="Notas adicionales"
              rows={2}
            />
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Agregar
            </Button>
            <Button type="button" onClick={handleCancel} variant="outline" className="flex-1">
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
