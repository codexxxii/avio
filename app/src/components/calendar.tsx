import { useMemo, useState } from "react";

type CalendarEvent = {
  id: string;
  title: string;
  date: Date;
};

type CalendarProps = {
  value?: Date;
  onChange?: (date: Date) => void;
  events?: CalendarEvent[];
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getCalendarDays(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = getDaysInMonth(year, month);

  const previousMonthDays = getDaysInMonth(year, month - 1);

  const days: Date[] = [];

  // Previous month's days
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push(new Date(year, month - 1, previousMonthDays - i));
  }

  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }

  // Next month's days
  const remaining = 42 - days.length;

  for (let day = 1; day <= remaining; day++) {
    days.push(new Date(year, month + 1, day));
  }

  return days;
}

export default function Calendar({
  value,
  onChange,
  events = [],
}: CalendarProps) {
  const today = useMemo(() => startOfDay(new Date()), []);

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? startOfDay(value) : null,
  );

  const [currentMonth, setCurrentMonth] = useState(
    value ? startOfDay(value) : today,
  );

  const calendarDays = useMemo(
    () => getCalendarDays(currentMonth),
    [currentMonth],
  );

  function previousMonth() {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  }

  function nextMonth() {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  }

  function goToToday() {
    setCurrentMonth(today);
    setSelectedDate(today);
    onChange?.(today);
  }

  function selectDate(date: Date) {
    const normalized = startOfDay(date);

    setSelectedDate(normalized);
    onChange?.(normalized);

    // If selecting a day from another month,
    // automatically move the calendar to that month.
    if (!isSameMonth(normalized, currentMonth)) {
      setCurrentMonth(normalized);
    }
  }

  function getEventsForDate(date: Date) {
    return events.filter((event) => isSameDay(new Date(event.date), date));
  }

  return (
    <div className="w-full max-w-3xl rounded-md border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {MONTHS[currentMonth.getMonth()]}
          </h2>

          <p className="text-sm text-gray-500">{currentMonth.getFullYear()}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goToToday}
            className="rounded-md border border-gray-200 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Today
          </button>

          <button
            type="button"
            onClick={previousMonth}
            aria-label="Previous month"
            className="grid place-items-center rounded-md border border-gray-200 text-gray-600 transition hover:bg-gray-50"
          >
            ←
          </button>

          <button
            type="button"
            onClick={nextMonth}
            aria-label="Next month"
            className="grid place-items-center rounded-md border border-gray-200 text-gray-600 transition hover:bg-gray-50"
          >
            →
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="p-4">
        {/* Weekdays */}
        <div className="grid grid-cols-7">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="py-2 text-center text-xs font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 overflow-hidden rounded-lg border-l border-t border-gray-200">
          {calendarDays.map((date) => {
            const isToday = isSameDay(date, today);
            const isSelected =
              selectedDate !== null && isSameDay(date, selectedDate);

            const isCurrentMonth = isSameMonth(date, currentMonth);

            const dayEvents = getEventsForDate(date);

            return (
              <button
                key={date.toISOString()}
                type="button"
                onClick={() => selectDate(date)}
                className={[
                  "relative min-h-24 border-b border-r border-gray-200 p-2 text-left transition",
                  "hover:bg-gray-50",
                  !isCurrentMonth && "bg-gray-50 text-gray-400",
                  isSelected && "bg-gray-100",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {/* Day number */}
                <div
                  className={[
                    "grid size-7 place-items-center rounded-full text-sm",
                    isToday && "bg-black font-semibold text-white",
                    isSelected && !isToday && "ring-2 ring-black ring-offset-1",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {date.getDate()}
                </div>

                {/* Events */}
                <div className="mt-1 space-y-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className="truncate rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-700"
                    >
                      {event.title}
                    </div>
                  ))}

                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-400">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
