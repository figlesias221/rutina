'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExerciseImageService, ExerciseImage } from '@/services/exerciseImageService';
import ExerciseImageViewer from '@/components/ExerciseImageViewer';

export default function ExerciseImageTest() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<ExerciseImage[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<string>('');
  const [showViewer, setShowViewer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    try {
      const exercises = await ExerciseImageService.searchSpanishExercise(searchTerm);
      setResults(exercises);
    } catch (error) {
      console.error('Error searching exercises:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openViewer = (exerciseName: string) => {
    setSelectedExercise(exerciseName);
    setShowViewer(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">🔍 Test de API de Ejercicios</h1>
        <p className="text-muted-foreground">Prueba la búsqueda de ejercicios e imágenes</p>
      </div>

      <div className="flex gap-2">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar ejercicio (ej: sentadilla, bench press, squat)"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? 'Buscando...' : 'Buscar'}
        </Button>
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Resultados ({results.length}):</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((exercise) => (
              <div key={exercise.id} className="border rounded-lg p-4 space-y-2">
                <h3 className="font-medium">{exercise.name}</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Nivel: {exercise.level}</div>
                  <div>Músculos: {exercise.primaryMuscles.join(', ')}</div>
                  {exercise.equipment && <div>Equipo: {exercise.equipment}</div>}
                  <div>Imágenes: {exercise.images.length}</div>
                </div>
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => openViewer(exercise.name)}
                >
                  Ver técnica 📸
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-t pt-6">
        <h3 className="font-medium mb-2">Ejercicios de prueba rápida:</h3>
        <div className="flex flex-wrap gap-2">
          {['sentadilla', 'bench press', 'deadlift', 'pull up', 'push up', 'squat', 'curl'].map((term) => (
            <Button 
              key={term}
              variant="outline" 
              size="sm"
              onClick={() => openViewer(term)}
            >
              {term}
            </Button>
          ))}
        </div>
      </div>

      <ExerciseImageViewer
        exerciseName={selectedExercise}
        open={showViewer}
        onOpenChange={setShowViewer}
      />
    </div>
  );
}
