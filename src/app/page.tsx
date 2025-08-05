import WeeklyPlanView from '@/components/weekly/WeeklyPlanView';
import PasswordProtect from '@/components/PasswordProtect';

export default function Home() {
  return (
    <PasswordProtect>
      <WeeklyPlanView />
    </PasswordProtect>
  );
}
