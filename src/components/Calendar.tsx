import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { getCalendarDays, formatMonthYear, getNextMonth, getPreviousMonth } from '../utils/dateUtils';
import { staticEvents } from '../data/events';
import { Event } from '../types';
import EventCard from './EventCard';
import AddEventModal from './AddEventModal';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>(staticEvents);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const calendarDays = useMemo(() => {
    return getCalendarDays(currentDate, events);
  }, [currentDate, events]);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePreviousMonth = () => {
    setCurrentDate(getPreviousMonth(currentDate));
  };

  const handleNextMonth = () => {
    setCurrentDate(getNextMonth(currentDate));
  };

  const handleAddEvent = (newEvent: Omit<Event, 'id'>) => {
    const event: Event = {
      ...newEvent,
      id: Date.now().toString()
    };
    setEvents(prev => [...prev, event]);
  };

  const handleDayClick = (date: Date, isCurrentMonth: boolean) => {
    if (isCurrentMonth) {
      const dateString = format(date, 'yyyy-MM-dd');
      setSelectedDate(dateString);
      setIsAddEventModalOpen(true);
    }
  };

  const totalEvents = events.length;
  const currentMonthEvents = calendarDays
    .filter(day => day.isCurrentMonth)
    .reduce((acc, day) => acc + day.events.length, 0);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
              <p className="text-sm text-gray-600 mt-1">
                Full Event Schedule – {format(currentDate, 'dd MMMM yyyy')}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{currentMonthEvents}</span> events this month
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePreviousMonth}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                  aria-label="Previous month"
                >
                  <ChevronLeft size={18} className="text-gray-600" />
                </button>
                <span className="text-lg font-semibold text-gray-900 min-w-[140px] text-center">
                  {formatMonthYear(currentDate)}
                </span>
                <button
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                  aria-label="Next month"
                >
                  <ChevronRight size={18} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
            {weekDays.map(day => (
              <div
                key={day}
                className="bg-gray-50 px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-gray-200"
              >
                {day}
              </div>
            ))}

            {calendarDays.map((day, index) => {
              const hasOverlappingEvents = day.events.length > 1;
              
              return (
                <div
                  key={index}
                  onClick={() => handleDayClick(day.date, day.isCurrentMonth)}
                  className={`min-h-[120px] p-2 border-r border-b border-gray-100 transition-colors duration-200 cursor-pointer ${
                    !day.isCurrentMonth ? 'opacity-40 bg-gray-50' : 'bg-white hover:bg-gray-50'
                  } ${
                    day.isToday ? 'bg-blue-600 text-white hover:bg-blue-700' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-sm font-medium ${
                        day.isToday
                          ? 'text-white'
                          : day.isCurrentMonth
                          ? 'text-gray-900'
                          : 'text-gray-400'
                      }`}
                    >
                      {format(day.date, 'd')}
                    </span>
                    {day.events.length > 2 && (
                      <span className={`text-xs rounded-full px-2 py-0.5 ${
                        day.isToday 
                          ? 'text-blue-600 bg-white' 
                          : 'text-gray-500 bg-gray-200'
                      }`}>
                        +{day.events.length - 2}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    {day.events.slice(0, 2).map((event, eventIndex) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        isOverlapping={hasOverlappingEvents && eventIndex > 0}
                        isOnToday={day.isToday}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AddEventModal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onAddEvent={handleAddEvent}
        selectedDate={selectedDate}
      />
    </>
  );
};

export default Calendar;