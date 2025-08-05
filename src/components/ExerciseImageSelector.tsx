'use client';

import { useState } from 'react';
import { ExerciseImage } from '@/services/exerciseImageService';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Image as ImageIcon, RefreshCw } from 'lucide-react';

interface ExerciseImageSelectorProps {
  exerciseName: string;
  currentBestMatch: ExerciseImage | null;
  allImages: ExerciseImage[];
  isLoading: boolean;
  onSelectImage: (image: ExerciseImage) => void;
  onRefresh: () => void;
  children: React.ReactNode;
}

export function ExerciseImageSelector({
  exerciseName,
  currentBestMatch,
  allImages,
  isLoading,
  onSelectImage,
  onRefresh,
  children
}: ExerciseImageSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageSelect = (image: ExerciseImage) => {
    onSelectImage(image);
    setOpen(false);
  };

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{exerciseName}</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Buscando imágenes...
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (allImages.length === 0) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{exerciseName}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <ImageIcon className="w-12 h-12 text-muted-foreground" />
            <p className="text-muted-foreground">No se encontraron imágenes</p>
            <Button onClick={onRefresh} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Intentar de nuevo
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{exerciseName}</span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {allImages.length} imagen{allImages.length !== 1 ? 'es' : ''}
              </Badge>
              <Button onClick={onRefresh} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="overflow-y-auto max-h-[70vh]">
          {/* Main Image Display */}
          {allImages.length > 0 && (
            <div className="mb-6">
              <div className="relative">
                <img
                  src={allImages[selectedImageIndex]?.images?.[0] || ''}
                  alt={`${exerciseName} - imagen ${selectedImageIndex + 1}`}
                  className="w-full h-64 object-cover rounded-lg border"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-exercise.svg';
                  }}
                />
                {currentBestMatch && 
                 allImages[selectedImageIndex]?.id === currentBestMatch.id && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-500">
                      <Check className="w-3 h-3 mr-1" />
                      Seleccionada
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  onClick={() => handleImageSelect(allImages[selectedImageIndex])}
                  className="flex-1"
                  disabled={currentBestMatch?.id === allImages[selectedImageIndex]?.id}
                >
                  {currentBestMatch?.id === allImages[selectedImageIndex]?.id ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Imagen Seleccionada
                    </>
                  ) : (
                    'Seleccionar esta imagen'
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Image Thumbnails */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {allImages.map((image, index) => (
              <Card 
                key={image.id || index} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedImageIndex === index ? 'ring-2 ring-primary' : ''
                } ${
                  currentBestMatch?.id === image.id ? 'ring-2 ring-green-500' : ''
                }`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <CardContent className="p-2">
                  <div className="relative">
                    <img
                      src={image.images?.[0] || ''}
                      alt={`${exerciseName} - miniatura ${index + 1}`}
                      className="w-full h-16 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-exercise.svg';
                      }}
                    />
                    {currentBestMatch?.id === image.id && (
                      <div className="absolute top-0 right-0 bg-green-500 rounded-full p-1">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
