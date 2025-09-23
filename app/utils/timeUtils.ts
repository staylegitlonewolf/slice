// Utility function to calculate real-time timestamps
export const getTimeAgo = (date: Date | string): string => {
  const now = new Date();
  const dateObj = date instanceof Date ? date : getDateFromTimeAgo(date);
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks === 1 ? '' : 's'} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears === 1 ? '' : 's'} ago`;
};

// Function to get a date that was X hours/days/months ago
export const getDateFromTimeAgo = (timeAgo: string | Date): Date => {
  // If it's already a Date object, return it
  if (timeAgo instanceof Date) {
    return timeAgo;
  }
  
  const now = new Date();
  
  if (timeAgo.includes('hour')) {
    const hours = parseInt(timeAgo.match(/\d+/)?.[0] || '0');
    return new Date(now.getTime() - hours * 60 * 60 * 1000);
  }
  
  if (timeAgo.includes('day')) {
    const days = parseInt(timeAgo.match(/\d+/)?.[0] || '0');
    return new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  }
  
  if (timeAgo.includes('week')) {
    const weeks = parseInt(timeAgo.match(/\d+/)?.[0] || '0');
    return new Date(now.getTime() - weeks * 7 * 24 * 60 * 60 * 1000);
  }
  
  if (timeAgo.includes('month')) {
    const months = parseInt(timeAgo.match(/\d+/)?.[0] || '0');
    return new Date(now.getTime() - months * 30 * 24 * 60 * 60 * 1000);
  }
  
  if (timeAgo.includes('year')) {
    const years = parseInt(timeAgo.match(/\d+/)?.[0] || '0');
    return new Date(now.getTime() - years * 365 * 24 * 60 * 60 * 1000);
  }
  
  // Default fallback
  return now;
};
