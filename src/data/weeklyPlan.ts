import { WeeklyPlan } from '@/types';

export const weeklyPlan: WeeklyPlan = {
  name: "Plan Semanal Rutina + Cardio",
  days: [
    {
      id: 'monday',
      name: 'Día 1 – Piernas',
      dayOfWeek: 'Lunes',
      gymExercises: [
        {
          name: 'Sentadilla con Barra',
          setsReps: '4x5',
          weight: '80-85% 1RM',
          comments: 'RIR 0-1'
        },
        {
          name: 'Peso Muerto Asimétrico (KB)',
          setsReps: '4x8',
          weight: '28kg c/lado',
          comments: 'RIR 3-4'
        },
        {
          name: 'Prensa',
          setsReps: '4x10',
          weight: '100kg',
          comments: 'Unilateral, controlado'
        },
        {
          name: 'Roll Out (Core)',
          setsReps: '4x10',
          weight: 'Propio peso',
          comments: 'Desde rodillas'
        },
        {
          name: 'Camilla de Cuádriceps',
          setsReps: '4x12-15',
          weight: '45-55kg',
          comments: 'Máxima contracción'
        }
      ],
      cardioActivities: []
    },
    {
      id: 'tuesday',
      name: 'Día 2 – Tren Superior',
      dayOfWeek: 'Martes',
      gymExercises: [
        {
          name: 'Press Inclinado',
          setsReps: '4x8'
        },
        {
          name: 'Press Pecho con Barra',
          setsReps: '4x8'
        },
        {
          name: 'Remo',
          setsReps: '4x8'
        },
        {
          name: 'Vuelo Lateral (con la muñequera)',
          setsReps: '4x8'
        },
        {
          name: 'Tríceps Extensión (barra)',
          setsReps: '4x8'
        },
        {
          name: 'Bayesian cable Bíceps',
          setsReps: '4x8'
        }
      ],
      cardioActivities: []
    },
    {
      id: 'wednesday',
      name: 'Cardio + Recuperación',
      dayOfWeek: 'Miércoles',
      gymExercises: [],
      cardioActivities: [{
        type: 'zone2-run',
        duration: '30-45 min',
        intensity: 'Zona 2',
        notes: 'Ritmo conversacional, recuperación activa'
      }]
    },
    {
      id: 'thursday',
      name: 'Día 3 – Full body',
      dayOfWeek: 'Jueves',
      gymExercises: [
        {
          name: 'Fondos (Dips)',
          setsReps: '4x8',
          weight: 'Con o sin peso',
          comments: 'Explosividad en empuje'
        },
        {
          name: 'Búlgaras',
          setsReps: '4x12-15',
          weight: '8kg',
          comments: 'Aislado, controlado'
        },
        {
          name: 'Peso Muerto',
          setsReps: '4x12-15',
          weight: '10kg + barra'
        },
        {
          name: 'Trícep',
          setsReps: '4x8',
          weight: '85-90%',
          comments: 'Hipertrofia de tríceps'
        }
      ],
      cardioActivities: [{
        type: 'zone2-run',
        duration: '5km',
        intensity: 'Zona aeróbica',
        notes: 'Ritmo moderado post-entrenamiento'
      }]
    },
    {
      id: 'friday',
      name: 'Día 4 – Tren Superior',
      dayOfWeek: 'Viernes',
      gymExercises: [
        {
          name: 'Dominadas',
          setsReps: '4x8'
        },
        {
          name: 'Press Hombros',
          setsReps: '4x8'
        },
        {
          name: 'Facepull',
          setsReps: '4x8'
        },
        {
          name: 'Curl Bíceps Martillo',
          setsReps: '4x8'
        },
        {
          name: 'Jalón al Pecho Prono',
          setsReps: '4x8'
        }
      ],
      cardioActivities: []
    },
    {
      id: 'saturday',
      name: 'Deportes/Actividad',
      dayOfWeek: 'Sábado',
      gymExercises: [],
      cardioActivities: [{
        type: 'football',
        duration: '60-90 min',
        intensity: 'Alta',
        notes: 'Partido o entrenamiento de fútbol'
      }]
    },
    {
      id: 'sunday',
      name: 'Descanso Activo',
      dayOfWeek: 'Domingo',
      gymExercises: [],
      cardioActivities: [{
        type: 'rest',
        duration: 'Todo el día',
        intensity: 'Recuperación',
        notes: 'Descanso completo o actividad muy ligera'
      }]
    }
  ]
};
