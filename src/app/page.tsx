import GymRoutineView from '@/components/gym/GymRoutineView';
import { userGymRoutine } from '@/data/gymRoutine';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <GymRoutineView routine={userGymRoutine} />
    </div>
  );
}
