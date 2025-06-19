export interface Event {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  color: 'blue' | 'red' | 'green' | 'orange' | 'purple' | 'pink';
  attendee?: {
    name: string;
    avatar: string;
  };
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: Event[];
}