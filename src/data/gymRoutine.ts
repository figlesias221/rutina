import { GymRoutine } from '@/types';

export const userGymRoutine: GymRoutine = {
  days: [
    {
      id: 'day-1',
      name: 'Día 1 – Piernas',
      exercises: [
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
      ]
    },
    {
      id: 'day-2',
      name: 'Día 2 – Tren Superior',
      exercises: [
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
      ]
    },
    {
      id: 'day-3',
      name: 'Día 3 – Full body',
      exercises: [
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
        },
        {
          name: 'Running Continuo',
          setsReps: '5k',
          weight: 'Zona aeróbica',
          comments: 'Ritmo moderado'
        }
      ]
    },
    {
      id: 'day-4',
      name: 'Día 4 – Tren Superior',
      exercises: [
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
      ]
    }
  ]
};
