'use client';

import { useState } from 'react';
import { CardioActivity, CardioType } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CardioTypeLabels, CardioTypeEmojis } from "@/types";
import { Edit2, Trash2, Save, X, Plus } from "lucide-react";

interface CardioCardProps {
  cardio?: CardioActivity;
  onUpdate: (cardio: CardioActivity | undefined) => void;
}

export default function CardioCard({ cardio, onUpdate }: CardioCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<CardioActivity>({
    type: 'zone2-run',
    duration: '',
    intensity: '',
    notes: '',
    ...cardio
  });

  const handleSave = () => {
    onUpdate(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(cardio || { type: 'zone2-run', duration: '', intensity: '', notes: '' });
    setIsEditing(false);
  };

  const handleRemove = () => {
    onUpdate(undefined);
  };

  const handleAdd = () => {
    setEditForm({ type: 'zone2-run', duration: '', intensity: '', notes: '' });
    setIsEditing(true);
  };

  if (!cardio && !isEditing) {
    return (
      <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors cursor-pointer">
        <CardContent 
          className="flex flex-col items-center justify-center p-6 text-center"
          onClick={handleAdd}
        >
          <Plus className="w-8 h-8 text-muted-foreground mb-2" />
          <span className="text-sm font-medium text-muted-foreground">
            Agregar Cardio/Deporte
          </span>
        </CardContent>
      </Card>
    );
  }

  if (isEditing) {
    return (
      <Card className="border-2 border-primary">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">🏃‍♂️</span>
            {cardio ? 'Editar Cardio' : 'Nuevo Cardio'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardio-type">Tipo de Actividad</Label>
            <Select value={editForm.type} onValueChange={(value: CardioType) => setEditForm({ ...editForm, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar actividad" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CardioTypeLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    <span className="flex items-center">
                      <span className="mr-2">{CardioTypeEmojis[value as CardioType]}</span>
                      {label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cardio-duration">Duración</Label>
              <Input
                id="cardio-duration"
                value={editForm.duration || ''}
                onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                placeholder="30 min, 5km..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardio-intensity">Intensidad</Label>
              <Input
                id="cardio-intensity"
                value={editForm.intensity || ''}
                onChange={(e) => setEditForm({ ...editForm, intensity: e.target.value })}
                placeholder="Zona 2, Alta..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardio-notes">Notas</Label>
            <Textarea
              id="cardio-notes"
              value={editForm.notes || ''}
              onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
              placeholder="Comentarios sobre la actividad"
              rows={2}
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={handleSave} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </Button>
            <Button onClick={handleCancel} variant="outline" className="flex-1">
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
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{CardioTypeEmojis[cardio!.type]}</span>
            <h3 className="font-semibold text-sm sm:text-base">
              {CardioTypeLabels[cardio!.type]}
            </h3>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              onClick={() => setIsEditing(true)}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleRemove}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          {cardio!.duration && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Duración:</span>
              <Badge variant="outline" className="font-mono">
                {cardio!.duration}
              </Badge>
            </div>
          )}
          {cardio!.intensity && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Intensidad:</span>
              <Badge variant="secondary">
                {cardio!.intensity}
              </Badge>
            </div>
          )}
          {cardio!.notes && (
            <div className="mt-3 p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground italic">
                💡 {cardio!.notes}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
