'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { ExerciseImageService, ExerciseImage } from '@/services/exerciseImageService';

interface ExerciseMatch {
  exerciseName: string;
  matches: ExerciseImage[];
  bestMatch: ExerciseImage | null;
  isLoading: boolean;
  error: string | null;
}

export function useExerciseImages(exerciseNames: string[]) {
  const [exerciseMatches, setExerciseMatches] = useState<Map<string, ExerciseMatch>>(new Map());
  const searchInProgressRef = useRef<Set<string>>(new Set());
  const prevExerciseNamesRef = useRef<string[]>([]);

  // Memoize the exercise names to prevent unnecessary re-renders
  const memoizedExerciseNames = useMemo(() => exerciseNames, [exerciseNames.join(',')]);

  // Effect to initialize/cleanup exercise list changes
  useEffect(() => {
    // Check if exercise names actually changed
    const currentNames = memoizedExerciseNames;
    const prevNames = prevExerciseNamesRef.current;
    
    const hasChanged = 
      currentNames.length !== prevNames.length ||
      currentNames.some((name, index) => name !== prevNames[index]);

    if (!hasChanged) return;

    prevExerciseNamesRef.current = [...currentNames];

    // Update state once with all changes
    setExerciseMatches(prev => {
      const newMap = new Map<string, ExerciseMatch>();
      
      // Keep existing data for exercises still in the list
      currentNames.forEach(name => {
        if (prev.has(name)) {
          newMap.set(name, prev.get(name)!);
        } else {
          // Initialize new exercise
          newMap.set(name, {
            exerciseName: name,
            matches: [],
            bestMatch: null,
            isLoading: true,
            error: null
          });
        }
      });

      // Clean up search progress for removed exercises
      prevNames.forEach(name => {
        if (!currentNames.includes(name)) {
          searchInProgressRef.current.delete(name);
        }
      });

      return newMap;
    });
  }, [memoizedExerciseNames]);

  // Separate effect to handle async searches - only runs when needed
  useEffect(() => {
    let isMounted = true;

    const performSearches = async () => {
      const searchPromises: Promise<void>[] = [];

      for (const name of memoizedExerciseNames) {
        // Skip if already searching
        if (searchInProgressRef.current.has(name)) {
          continue;
        }

        const currentMatch = exerciseMatches.get(name);
        if (currentMatch?.isLoading && currentMatch.matches.length === 0) {
          // Mark as searching
          searchInProgressRef.current.add(name);

          const searchPromise = ExerciseImageService.searchSpanishExercise(name)
            .then(matches => {
              if (!isMounted) return;
              
              const bestMatch = matches.length > 0 ? matches[0] : null;
              setExerciseMatches(prev => {
                const newMap = new Map(prev);
                newMap.set(name, {
                  exerciseName: name,
                  matches,
                  bestMatch,
                  isLoading: false,
                  error: matches.length === 0 ? 'No se encontraron imágenes' : null
                });
                return newMap;
              });
            })
            .catch(error => {
              if (!isMounted) return;
              
              setExerciseMatches(prev => {
                const newMap = new Map(prev);
                newMap.set(name, {
                  exerciseName: name,
                  matches: [],
                  bestMatch: null,
                  isLoading: false,
                  error: 'Error al buscar imágenes'
                });
                return newMap;
              });
            })
            .finally(() => {
              if (isMounted) {
                searchInProgressRef.current.delete(name);
              }
            });

          searchPromises.push(searchPromise);
        }
      }

      await Promise.allSettled(searchPromises);
    };

    // Only perform searches if there are exercises that need searching
    const hasLoadingExercises = Array.from(exerciseMatches.values()).some(
      match => match.isLoading && match.matches.length === 0 && !searchInProgressRef.current.has(match.exerciseName)
    );

    if (hasLoadingExercises) {
      performSearches();
    }

    return () => {
      isMounted = false;
    };
  }, [memoizedExerciseNames, exerciseMatches]);

  const getExerciseMatch = useCallback((exerciseName: string): ExerciseMatch | null => {
    return exerciseMatches.get(exerciseName) || null;
  }, [exerciseMatches]);

  const hasImages = useCallback((exerciseName: string): boolean => {
    const match = exerciseMatches.get(exerciseName);
    return match ? match.matches.length > 0 : false;
  }, [exerciseMatches]);

  const getImageUrl = useCallback((exerciseName: string, imageIndex: number = 0): string | null => {
    const match = exerciseMatches.get(exerciseName);
    if (match && match.bestMatch) {
      return ExerciseImageService.getImageUrl(match.bestMatch, imageIndex);
    }
    return null;
  }, [exerciseMatches]);

  const refreshExercise = useCallback(async (exerciseName: string) => {
    searchInProgressRef.current.delete(exerciseName);
    setExerciseMatches(prev => {
      const newMap = new Map(prev);
      newMap.set(exerciseName, {
        exerciseName,
        matches: [],
        bestMatch: null,
        isLoading: true,
        error: null
      });
      return newMap;
    });
  }, []);

  const selectBestMatch = useCallback((exerciseName: string, selectedImage: ExerciseImage) => {
    setExerciseMatches(prev => {
      const newMap = new Map(prev);
      const currentMatch = newMap.get(exerciseName);
      if (currentMatch) {
        newMap.set(exerciseName, {
          ...currentMatch,
          bestMatch: selectedImage
        });
      }
      return newMap;
    });
  }, []);

  const getAllImages = useCallback((exerciseName: string): ExerciseImage[] => {
    const match = exerciseMatches.get(exerciseName);
    return match ? match.matches : [];
  }, [exerciseMatches]);

  return {
    exerciseMatches,
    getExerciseMatch,
    hasImages,
    getImageUrl,
    refreshExercise,
    selectBestMatch,
    getAllImages
  };
}
