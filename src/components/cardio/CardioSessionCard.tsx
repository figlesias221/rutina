import { CardioSession, CardioTypeLabels, CardioTypeEmojis } from '@/types';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Heart, Edit2, Trash2 } from "lucide-react";

interface CardioSessionCardProps {
  session: CardioSession;
  onEdit?: (session: CardioSession) => void;
  onRemove?: (sessionId: string) => void;
}

export default function CardioSessionCard({ session, onEdit, onRemove }: CardioSessionCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getIntensityColor = (intensity?: string) => {
    switch (intensity) {
      case 'low': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'max': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getIntensityLabel = (intensity?: string) => {
    switch (intensity) {
      case 'low': return 'Baja';
      case 'moderate': return 'Moderada';
      case 'high': return 'Alta';
      case 'max': return 'Máxima';
      default: return 'No especificada';
    }
  };

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{CardioTypeEmojis[session.type]}</span>
            <div>
              <h3 className="font-semibold text-lg">{CardioTypeLabels[session.type]}</h3>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(session.date)}
              </div>
            </div>
          </div>
          
          {(onEdit || onRemove) && (
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {onEdit && (
                <Button
                  onClick={() => onEdit(session)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
              )}
              {onRemove && (
                <Button
                  onClick={() => onRemove(session.id)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {session.duration && (
            <Badge variant="outline" className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {session.duration} min
            </Badge>
          )}
          
          {session.distance && (
            <Badge variant="outline" className="flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {session.distance} km
            </Badge>
          )}
          
          {session.intensity && (
            <Badge variant="outline" className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${getIntensityColor(session.intensity)}`} />
              {getIntensityLabel(session.intensity)}
            </Badge>
          )}
        </div>

        {(session.heartRate?.avg || session.heartRate?.max) && (
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Heart className="w-4 h-4 text-red-500" />
            <div className="flex space-x-4">
              {session.heartRate.avg && (
                <span>Promedio: <strong>{session.heartRate.avg} bpm</strong></span>
              )}
              {session.heartRate.max && (
                <span>Máxima: <strong>{session.heartRate.max} bpm</strong></span>
              )}
            </div>
          </div>
        )}

        {session.notes && (
          <div className="p-3 bg-muted rounded-md">
            <p className="text-sm text-muted-foreground italic">
              💭 {session.notes}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
