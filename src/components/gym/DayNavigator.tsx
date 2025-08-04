interface DayNavigatorProps {
  days: { name: string }[];
  selectedIndex: number;
  onSelectDay: (index: number) => void;
}

export default function DayNavigator({ days, selectedIndex, onSelectDay }: DayNavigatorProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
        Seleccionar Día
      </h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => onSelectDay(index)}
            className={`p-3 rounded-lg text-sm font-medium transition-all ${
              selectedIndex === index
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="text-xs opacity-75 mb-1">Día {index + 1}</div>
            <div className="text-xs sm:text-sm font-semibold">
              {day.name.replace('Día ' + (index + 1) + ' – ', '')}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
