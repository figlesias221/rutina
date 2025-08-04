'use client';

import { useState } from 'react';
import { Exercise } from '@/types';

interface EditableExerciseCardProps {
  exercise: Exercise;
  onUpdate: (updatedExercise: Exercise) => void;
  onRemove: () => void;
}

export default function EditableExerciseCard({ exercise, onUpdate, onRemove }: EditableExerciseCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(exercise);

  const handleSave = () => {
    onUpdate(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(exercise);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md border-2 border-blue-300">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Ejercicio
            </label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Nombre del ejercicio"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Series/Reps
              </label>
              <input
                type="text"
                value={editForm.setsReps}
                onChange={(e) => setEditForm({ ...editForm, setsReps: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="4x8"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Carga
              </label>
              <input
                type="text"
                value={editForm.weight || ''}
                onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="70kg"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Comentarios
            </label>
            <input
              type="text"
              value={editForm.comments || ''}
              onChange={(e) => setEditForm({ ...editForm, comments: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Notas adicionales"
            />
          </div>
          
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-green-700"
            >
              ✓ Guardar
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-400 text-white px-3 py-2 rounded text-sm font-medium hover:bg-gray-500"
            >
              ✕ Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md border border-gray-200 hover:shadow-lg transition-shadow group">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800 text-sm sm:text-base flex-1">
          {exercise.name}
        </h3>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
            title="Editar"
          >
            ✏️
          </button>
          <button
            onClick={onRemove}
            className="p-1 text-red-600 hover:bg-red-50 rounded"
            title="Eliminar"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div className="text-xs sm:text-sm space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Series/Reps:</span>
          <span className="font-bold text-blue-600 text-sm sm:text-base">{exercise.setsReps}</span>
        </div>
        {exercise.weight && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Carga:</span>
            <span className="font-bold text-green-600 text-sm sm:text-base">{exercise.weight}</span>
          </div>
        )}
        {exercise.comments && (
          <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600 italic border-l-2 border-blue-200">
            💡 {exercise.comments}
          </div>
        )}
      </div>
    </div>
  );
}
