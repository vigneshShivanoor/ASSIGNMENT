import React from 'react';
import { Event } from '../types';
import { formatTime } from '../utils/dateUtils';

interface EventCardProps {
  event: Event;
  isOverlapping?: boolean;
  isOnToday?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, isOverlapping, isOnToday }) => {
  const colorClasses = {
    blue: 'bg-blue-100 border-blue-200 text-blue-800',
    red: 'bg-red-100 border-red-200 text-red-800',
    green: 'bg-green-100 border-green-200 text-green-800',
    orange: 'bg-orange-100 border-orange-200 text-orange-800',
    purple: 'bg-purple-100 border-purple-200 text-purple-800',
    pink: 'bg-pink-100 border-pink-200 text-pink-800',
  };

  const todayColorClasses = {
    blue: 'bg-blue-200 border-blue-300 text-blue-900',
    red: 'bg-red-200 border-red-300 text-red-900',
    green: 'bg-green-200 border-green-300 text-green-900',
    orange: 'bg-orange-200 border-orange-300 text-orange-900',
    purple: 'bg-purple-200 border-purple-300 text-purple-900',
    pink: 'bg-pink-200 border-pink-300 text-pink-900',
  };

  return (
    <div
      className={`p-2 rounded-md border text-xs mb-1 transition-all duration-200 hover:shadow-sm cursor-pointer ${
        isOnToday ? todayColorClasses[event.color] : colorClasses[event.color]
      } ${isOverlapping ? 'opacity-80 scale-95' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        console.log('Event clicked:', event.title);
      }}
    >
      <div className="flex items-start space-x-2">
        {event.attendee && (
          <img
            src={event.attendee.avatar}
            alt={event.attendee.name}
            className="w-4 h-4 rounded-full object-cover flex-shrink-0 mt-0.5"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{event.title}</p>
          <p className="text-xs opacity-75 mt-0.5">
            {formatTime(event.startTime)} – {formatTime(event.endTime)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;