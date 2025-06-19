import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isToday,
  addMonths,
  subMonths
} from 'date-fns';
import { CalendarDay, Event } from '../types';

export const getCalendarDays = (currentDate: Date, events: Event[]): CalendarDay[] => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  return days.map(day => {
    const dayEvents = events.filter(event => 
      format(day, 'yyyy-MM-dd') === event.date
    );

    return {
      date: day,
      isCurrentMonth: isSameMonth(day, currentDate),
      isToday: isToday(day),
      events: dayEvents,
    };
  });
};

export const formatMonthYear = (date: Date): string => {
  return format(date, 'MMMM yyyy');
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const getNextMonth = (date: Date): Date => addMonths(date, 1);
export const getPreviousMonth = (date: Date): Date => subMonths(date, 1);