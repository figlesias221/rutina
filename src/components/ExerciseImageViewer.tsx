'use client';

import { useExerciseImages } from '@/hooks/useExerciseImages';
import { ExerciseImageSelector } from '@/components/ExerciseImageSelector';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { ExerciseImage } from '@/services/exerciseImageService';

interface ExerciseImageViewerProps {
  exerciseName: string;
}

export default function ExerciseImageViewer({ exerciseName }: ExerciseImageViewerProps) {
  const { 
    getExerciseMatch, 
    getAllImages, 
    selectBestMatch, 
    refreshExercise,
    hasImages 
  } = useExerciseImages([exerciseName]);

  const exerciseMatch = getExerciseMatch(exerciseName);
  const allImages = getAllImages(exerciseName);
  const isLoading = exerciseMatch?.isLoading || false;

  const handleImageSelect = (image: ExerciseImage) => {
    selectBestMatch(exerciseName, image);
  };

  const handleRefresh = () => {
    refreshExercise(exerciseName);
  };

  return (
    <ExerciseImageSelector
      exerciseName={exerciseName}
      currentBestMatch={exerciseMatch?.bestMatch || null}
      allImages={allImages}
      isLoading={isLoading}
      onSelectImage={handleImageSelect}
      onRefresh={handleRefresh}
    >
      <Button 
        variant="ghost" 
        size="sm"
        className={`h-7 w-7 p-0 ${hasImages(exerciseName) ? "text-green-600 hover:text-green-700" : "text-muted-foreground"}`}
        title={hasImages(exerciseName) ? 'Ver imágenes' : 'Buscar imágenes'}
      >
        <Camera className="w-4 h-4" />
      </Button>
    </ExerciseImageSelector>
  );
}
