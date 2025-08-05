'use client';

// This component has been simplified to remove the image list display
// Images are now accessed through individual exercise components

import { useExerciseImages } from '@/hooks/useExerciseImages';

interface ExerciseImagesSummaryProps {
  exerciseNames: string[];
  onRefreshAll?: () => void;
}

export default function ExerciseImagesSummary({ exerciseNames }: ExerciseImagesSummaryProps) {
  // Keep the hook to maintain image loading in the background
  useExerciseImages(exerciseNames);
  
  // Return null to hide the summary component
  return null;
}
