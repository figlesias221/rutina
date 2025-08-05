'use client';

import { useState } from 'react';
import { CardioSession, CardioType, CardioTypeLabels, CardioTypeEmojis } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Save, X, Activity } from "lucide-react";

interface AddCardioSessionFormProps {
  onAdd: (session: Omit<CardioSession, 'id'>) => void;
}

export default function AddCardioSessionForm({ onAdd }: AddCardioSessionFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newSession, setNewSession] = useState<Omit<CardioSession, 'id'>>({
    type: 'zone2-run',
    date: new Date().toISOString().split('T')[0],
    duration: 30,
    distance: undefined,
    intensity: 'moderate',
    heartRate: { avg: undefined, max: undefined },
    notes: '',
    completed: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...newSession,
      completed: true,
      heartRate: newSession.heartRate?.avg || newSession.heartRate?.max 
        ? newSession.heartRate 
        : undefined
    });
    
    // Reset form
    setNewSession({
      type: 'zone2-run',
      date: new Date().toISOString().split('T')[0],
      duration: 30,
      distance: undefined,
      intensity: 'moderate',
      heartRate: { avg: undefined, max: undefined },
      notes: '',
      completed: false
    });
    setIsOpen(false);
  };

  const handleCancel = () => {
    setNewSession({
      type: 'zone2-run',
      date: new Date().toISOString().split('T')[0],
      duration: 30,
      distance: undefined,
      intensity: 'moderate',
      heartRate: { avg: undefined, max: undefined },
      notes: '',
      completed: false
    });
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors cursor-pointer">
        <CardContent 
          className="flex flex-col items-center justify-center p-6 text-center"
          onClick={() => setIsOpen(true)}
        >
          <Activity className="w-8 h-8 text-muted-foreground mb-2" />
          <span className="text-sm font-medium text-muted-foreground">
            Agregar Sesión de Cardio
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
          Nueva Sesión de Cardio
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cardio-type">Tipo de Actividad</Label>
              <Select 
                value={newSession.type} 
                onValueChange={(value: CardioType) => setNewSession({ ...newSession, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CardioTypeLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      <span className="flex items-center">
                        <span className="mr-2">{CardioTypeEmojis[key as CardioType]}</span>
                        {label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardio-date">Fecha</Label>
              <Input
                id="cardio-date"
                type="date"
                value={newSession.date}
                onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duración (min)</Label>
              <Input
                id="duration"
                type="number"
                value={newSession.duration || ''}
                onChange={(e) => setNewSession({ ...newSession, duration: parseInt(e.target.value) || undefined })}
                placeholder="30"
                min="1"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="distance">Distancia (km)</Label>
              <Input
                id="distance"
                type="number"
                step="0.1"
                value={newSession.distance || ''}
                onChange={(e) => setNewSession({ ...newSession, distance: parseFloat(e.target.value) || undefined })}
                placeholder="5.0"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="intensity">Intensidad</Label>
            <Select 
              value={newSession.intensity} 
              onValueChange={(value: 'low' | 'moderate' | 'high' | 'max') => setNewSession({ ...newSession, intensity: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">🟢 Baja</SelectItem>
                <SelectItem value="moderate">🟡 Moderada</SelectItem>
                <SelectItem value="high">🟠 Alta</SelectItem>
                <SelectItem value="max">🔴 Máxima</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hr-avg">FC Promedio</Label>
              <Input
                id="hr-avg"
                type="number"
                value={newSession.heartRate?.avg || ''}
                onChange={(e) => setNewSession({ 
                  ...newSession, 
                  heartRate: { 
                    ...newSession.heartRate, 
                    avg: parseInt(e.target.value) || undefined 
                  }
                })}
                placeholder="145"
                min="50"
                max="220"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hr-max">FC Máxima</Label>
              <Input
                id="hr-max"
                type="number"
                value={newSession.heartRate?.max || ''}
                onChange={(e) => setNewSession({ 
                  ...newSession, 
                  heartRate: { 
                    ...newSession.heartRate, 
                    max: parseInt(e.target.value) || undefined 
                  }
                })}
                placeholder="165"
                min="50"
                max="220"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cardio-notes">Notas</Label>
            <Textarea
              id="cardio-notes"
              value={newSession.notes}
              onChange={(e) => setNewSession({ ...newSession, notes: e.target.value })}
              placeholder="¿Cómo te sentiste? Detalles adicionales..."
              rows={3}
            />
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Guardar Sesión
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
