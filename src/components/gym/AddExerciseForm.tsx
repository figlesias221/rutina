'use client';

import { useState } from 'react';
import { Exercise } from '@/types';

interface AddExerciseFormProps {
  onAdd: (exercise: Exercise) => void;
}

export default function AddExerciseForm({ onAdd }: AddExerciseFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newExercise, setNewExercise] = useState<Exercise>({
    name: '',
    setsReps: '',
    weight: '',
    comments: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExercise.name.trim() && newExercise.setsReps.trim()) {
      onAdd({
        ...newExercise,
        weight: newExercise.weight || undefined,
        comments: newExercise.comments || undefined
      });
      setNewExercise({ name: '', setsReps: '', weight: '', comments: '' });
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setNewExercise({ name: '', setsReps: '', weight: '', comments: '' });
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
      >
        <div className="text-center">
          <span className="text-2xl mb-2 block">+</span>
          <span className="text-sm font-medium">Agregar Ejercicio</span>
        </div>
      </button>
    );
  }

  return (
    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
      <h4 className="font-semibold text-blue-800 mb-3">Nuevo Ejercicio</h4>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            value={newExercise.name}
            onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded text-sm"
            placeholder="Nombre del ejercicio *"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={newExercise.setsReps}
            onChange={(e) => setNewExercise({ ...newExercise, setsReps: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded text-sm"
            placeholder="Series/Reps *"
            required
          />
          <input
            type="text"
            value={newExercise.weight}
            onChange={(e) => setNewExercise({ ...newExercise, weight: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded text-sm"
            placeholder="Carga"
          />
        </div>
        
        <input
          type="text"
          value={newExercise.comments}
          onChange={(e) => setNewExercise({ ...newExercise, comments: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded text-sm"
          placeholder="Comentarios"
        />
        
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-blue-700"
          >
            ✓ Agregar
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-400 text-white px-3 py-2 rounded text-sm font-medium hover:bg-gray-500"
          >
            ✕ Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
