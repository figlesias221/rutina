'use client';

import { useState } from 'react';
import { CardioType, CardioActivity } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CardioTypeLabels, CardioTypeEmojis } from "@/types";

interface AddCardioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (cardio: CardioActivity) => void;
}

export default function AddCardioDialog({ open, onOpenChange, onAdd }: AddCardioDialogProps) {
  const [formData, setFormData] = useState<CardioActivity>({
    type: 'zone2-run',
    duration: '',
    intensity: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      type: 'zone2-run',
      duration: '',
      intensity: '',
      notes: ''
    });
  };

  const handleCancel = () => {
    setFormData({
      type: 'zone2-run',
      duration: '',
      intensity: '',
      notes: ''
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Actividad de Cardio</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Actividad</Label>
            <Select
              value={formData.type}
              onValueChange={(value: CardioType) => setFormData(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el tipo" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CardioTypeLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      <span>{CardioTypeEmojis[key as CardioType]}</span>
                      <span>{label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duración</Label>
            <Input
              id="duration"
              placeholder="ej: 30 min, 5km, 1 hora"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="intensity">Intensidad</Label>
            <Input
              id="intensity"
              placeholder="ej: Zona 2, Alta, Moderada"
              value={formData.intensity}
              onChange={(e) => setFormData(prev => ({ ...prev, intensity: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas</Label>
            <Textarea
              id="notes"
              placeholder="Cualquier comentario adicional..."
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
              Agregar Actividad
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
