import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { WorkoutDay } from "@/types";
import { CardioTypeEmojis } from "@/types";

interface WeekNavigatorProps {
  days: WorkoutDay[];
  selectedIndex: number;
  onSelectDay: (index: number) => void;
}

export default function WeekNavigator({ days, selectedIndex, onSelectDay }: WeekNavigatorProps) {
  return (
    <div className="w-full mb-6">
      <Tabs value={selectedIndex.toString()} onValueChange={(value) => onSelectDay(parseInt(value))}>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 h-auto gap-1">
          {days.map((day, index) => (
            <TabsTrigger 
              key={index} 
              value={index.toString()}
              className="flex flex-col items-center p-2 sm:p-3 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <div className="text-xs opacity-75 mb-1">{day.dayOfWeek}</div>
              <div className="text-xs font-semibold text-center leading-tight mb-1">
                {day.name.replace(/Día \d+ – /, '')}
              </div>
              <div className="flex items-center space-x-1">
                {day.gymExercises.length > 0 && (
                  <Badge variant="secondary" className="text-xs px-1 py-0">
                    💪 {day.gymExercises.length}
                  </Badge>
                )}
                {day.cardioActivities.length > 0 && (
                  <Badge variant="outline" className="text-xs px-1 py-0">
                    🏃 {day.cardioActivities.length}
                  </Badge>
                )}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
