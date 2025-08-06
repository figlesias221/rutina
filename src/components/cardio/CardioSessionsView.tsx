'use client';

import { useCardioSessions } from '@/hooks/useCardioSessions';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Activity, RotateCcw, TrendingUp } from "lucide-react";
import AddCardioSessionForm from './AddCardioSessionForm';
import CardioSessionCard from './CardioSessionCard';
import { SyncStatus } from '@/components/SyncStatus';

export default function CardioSessionsView() {
  const {
    sessions,
    addSession,
    removeSession,
    getRecentSessions,
    resetToDefault,
    syncStatus,
    error
  } = useCardioSessions();

  const recentSessions = getRecentSessions();
  const totalSessions = sessions.length;
  const thisWeekSessions = sessions.filter(session => {
    const sessionDate = new Date(session.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return sessionDate >= weekAgo;
  }).length;

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
      <div className="text-center mb-6 sm:mb-8">
        <div className="flex items-center justify-center mb-4">
          <Activity className="w-8 h-8 text-primary mr-3" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Sesiones de Cardio & Deportes
          </h1>
        </div>
        
        <div className="flex justify-center items-center space-x-4 mb-4">
          <Badge variant="outline" className="text-sm">
            <TrendingUp className="w-3 h-3 mr-1" />
            {totalSessions} sesiones totales
          </Badge>
          <Badge variant="secondary" className="text-sm">
            {thisWeekSessions} esta semana
          </Badge>
        </div>
        
        <Button
          onClick={resetToDefault}
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-destructive"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Restaurar datos de ejemplo
        </Button>
      </div>
      
      <div className="mb-6">
        <AddCardioSessionForm onAdd={addSession} />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Historial de Sesiones
          </CardTitle>
        </CardHeader>
        
        <Separator className="mb-6" />
        
        <CardContent>
          {recentSessions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No hay sesiones registradas</p>
              <p className="text-sm">Agrega tu primera sesión de cardio o deportes</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentSessions.map((session) => (
                <CardioSessionCard
                  key={session.id}
                  session={session}
                  onRemove={removeSession}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <SyncStatus status={syncStatus} error={error} />
    </div>
  );
}
