import { format, formatDistance, parseISO } from 'date-fns';

export const formatTime = (date) => {
  return format(new Date(date), 'HH:mm');
};

export const formatDate = (date) => {
  return format(new Date(date), 'yyyy-MM-dd');
};

export const formatDateTime = (date) => {
  return format(new Date(date), 'yyyy-MM-dd HH:mm');
};

export const formatDuration = (minutes) => {
  if (!minutes || minutes < 0) return '0h 0m';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  return `${hours}h ${mins}m`;
};

export const formatHosTime = (hours) => {
  if (!hours || hours < 0) return '0h 0m';
  
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  
  return `${wholeHours}h ${minutes}m`;
};

export const calculateRemainingTime = (current, limit) => {
  const remaining = limit - current;
  return formatHosTime(remaining);
};