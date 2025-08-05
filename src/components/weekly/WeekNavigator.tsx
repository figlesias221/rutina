import { Badge } from "@/components/ui/badge";
import { WorkoutDay } from "@/types";
import { cn } from "@/lib/utils";
import { Dumbbell, Heart } from "lucide-react";

interface WeekNavigatorProps {
  days: WorkoutDay[];
  selectedIndex: number;
  onSelectDay: (index: number) => void;
}

export default function WeekNavigator({ days, selectedIndex, onSelectDay }: WeekNavigatorProps) {
  // Get current day of week (0 = Sunday, 1 = Monday, etc.)
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1; // Convert to Monday = 0

  const dayAbbreviations = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];

  return (
    <div className="w-full mb-6">
      <div className="grid grid-cols-7 gap-1 sm:gap-2 bg-muted/30 p-2 rounded-lg">
        {days.map((day, index) => {
          const isSelected = selectedIndex === index;
          const isToday = todayIndex === index;
          const hasGym = day.gymExercises.length > 0;
          const hasCardio = day.cardioActivities.length > 0;
          const isEmpty = !hasGym && !hasCardio;

          return (
            <button
              key={index}
              onClick={() => onSelectDay(index)}
              className={cn(
                "relative flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg transition-all",
                "hover:bg-accent hover:shadow-sm",
                isSelected && "bg-primary text-primary-foreground shadow-md hover:bg-primary/90",
                !isSelected && "bg-background",
                isEmpty && !isSelected && "opacity-60"
              )}
            >
              {/* Today indicator */}
              {isToday && (
                <div className={cn(
                  "absolute top-1 right-1 w-2 h-2 rounded-full",
                  isSelected ? "bg-primary-foreground" : "bg-primary"
                )} />
              )}
              
              {/* Day abbreviation */}
              <div className={cn(
                "text-xs sm:text-sm font-bold mb-1",
                isSelected ? "text-primary-foreground" : "text-foreground"
              )}>
                {dayAbbreviations[index]}
              </div>
              
              {/* Day number or name */}
              <div className={cn(
                "text-lg sm:text-xl font-bold mb-2",
                isSelected ? "text-primary-foreground" : "text-foreground"
              )}>
                {index + 1}
              </div>
              
              {/* Activity indicators */}
              <div className="flex gap-1">
                {hasGym && (
                  <div className={cn(
                    "flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full",
                    isSelected ? "bg-primary-foreground/20" : "bg-primary/10"
                  )}>
                    <Dumbbell className={cn(
                      "w-3 h-3 sm:w-4 sm:h-4",
                      isSelected ? "text-primary-foreground" : "text-primary"
                    )} />
                  </div>
                )}
                {hasCardio && (
                  <div className={cn(
                    "flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full",
                    isSelected ? "bg-primary-foreground/20" : "bg-red-500/10"
                  )}>
                    <Heart className={cn(
                      "w-3 h-3 sm:w-4 sm:h-4",
                      isSelected ? "text-primary-foreground" : "text-red-500"
                    )} />
                  </div>
                )}
                {isEmpty && (
                  <div className={cn(
                    "text-xs",
                    isSelected ? "text-primary-foreground/60" : "text-muted-foreground"
                  )}>
                    —
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
