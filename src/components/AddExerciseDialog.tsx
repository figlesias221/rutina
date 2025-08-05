'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AddExerciseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (exercise: { name: string; reps: string; sets: number; notes?: string }) => void;
}

export default function AddExerciseDialog({ open, onOpenChange, onAdd }: AddExerciseDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    reps: '',
    sets: 1,
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.reps.trim()) {
      return;
    }
    
    onAdd({
      name: formData.name,
      reps: formData.reps,
      sets: formData.sets,
      notes: formData.notes || undefined
    });
    
    setFormData({
      name: '',
      reps: '',
      sets: 1,
      notes: ''
    });
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      reps: '',
      sets: 1,
      notes: ''
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Ejercicio</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del Ejercicio</Label>
            <Input
              id="name"
              placeholder="ej: Sentadilla con Barra"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sets">Series</Label>
              <Input
                id="sets"
                type="number"
                min="1"
                placeholder="4"
                value={formData.sets}
                onChange={(e) => setFormData(prev => ({ ...prev, sets: parseInt(e.target.value) || 1 }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reps">Repeticiones</Label>
              <Input
                id="reps"
                placeholder="8-12"
                value={formData.reps}
                onChange={(e) => setFormData(prev => ({ ...prev, reps: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas</Label>
            <Textarea
              id="notes"
              placeholder="Peso, técnica, comentarios..."
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit">
              Agregar Ejercicio
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
