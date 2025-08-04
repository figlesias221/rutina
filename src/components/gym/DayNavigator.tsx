import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface DayNavigatorProps {
  days: { name: string; exercises: any[] }[];
  selectedIndex: number;
  onSelectDay: (index: number) => void;
}

export default function DayNavigator({ days, selectedIndex, onSelectDay }: DayNavigatorProps) {
  return (
    <div className="w-full mb-6">
      <Tabs value={selectedIndex.toString()} onValueChange={(value) => onSelectDay(parseInt(value))}>
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
          {days.map((day, index) => (
            <TabsTrigger 
              key={index} 
              value={index.toString()}
              className="flex flex-col items-center p-3 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <div className="text-xs opacity-75 mb-1">Día {index + 1}</div>
              <div className="text-xs sm:text-sm font-semibold text-center leading-tight">
                {day.name.replace('Día ' + (index + 1) + ' – ', '')}
              </div>
              <Badge variant="secondary" className="mt-1 text-xs">
                {day.exercises.length}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
