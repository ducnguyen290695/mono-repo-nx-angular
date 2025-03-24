/**
 * Angular Pipes for Date and Time Manipulation
 */

import { Pipe, PipeTransform } from '@angular/core';

/**
 * TimeAgoPipe - Converts a date into a human-readable "time ago" format.
 * Input: '2024-03-01T12:00:00Z'
 * Usage: {{ '2024-03-01T12:00:00Z' | timeAgo }}
 * Output: '5 days ago'
 */
@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string): string {
    const time = new Date(value).getTime();
    const now = new Date().getTime();
    const seconds = Math.floor((now - time) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (const key in intervals) {
      const interval = Math.floor(
        seconds / intervals[key as keyof typeof intervals],
      );

      if (interval >= 1) {
        return `${interval} ${key}${interval > 1 ? 's' : ''} ago`;
      }
    }

    return 'Just now';
  }
}

/**
 * ToUTCPipe - Converts a date to UTC format.
 * Input: '2024-03-01T12:00:00'
 * Usage: {{ '2024-03-01T12:00:00' | toUTC }}
 * Output: '2024-03-01T12:00:00.000Z'
 */
@Pipe({ name: 'toUTC' })
export class ToUTCPipe implements PipeTransform {
  transform(value: string | Date): string {
    return new Date(value).toISOString();
  }
}

/**
 * TimeDiffPipe - Calculates the difference between two dates.
 * Input: start: '2024-03-01T10:00:00', end: '2024-03-01T12:00:00'
 * Usage: {{ '2024-03-01T10:00:00' | timeDiff:'2024-03-01T12:00:00' }}
 * Output: '2 hour(s) ago'
 */
@Pipe({ name: 'timeDiff' })
export class TimeDiffPipe implements PipeTransform {
  transform(start: string | Date, end: string | Date = new Date()): string {
    const diff = new Date(end).getTime() - new Date(start).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day(s) ago`;
    if (hours > 0) return `${hours} hour(s) ago`;
    if (minutes > 0) return `${minutes} minute(s) ago`;

    return `${seconds} second(s) ago`;
  }
}

/**
 * StartOfDayPipe - Returns the start of the day for a given date.
 * Input: '2024-03-01T15:45:00'
 * Usage: {{ '2024-03-01T15:45:00' | startOfDay }}
 * Output: '2024-03-01T00:00:00.000Z'
 */
@Pipe({ name: 'startOfDay' })
export class StartOfDayPipe implements PipeTransform {
  transform(value: string | Date): string {
    const date = new Date(value);
    date.setHours(0, 0, 0, 0);

    return date.toISOString();
  }
}

/**
 * EndOfDayPipe - Returns the end of the day for a given date.
 * Input: '2024-03-01T10:30:00'
 * Usage: {{ '2024-03-01T10:30:00' | endOfDay }}
 * Output: '2024-03-01T23:59:59.999Z'
 */
@Pipe({ name: 'endOfDay' })
export class EndOfDayPipe implements PipeTransform {
  transform(value: string | Date): string {
    const date = new Date(value);
    date.setHours(23, 59, 59, 999);

    return date.toISOString();
  }
}

/**
 * TimestampToDatePipe - Converts a timestamp to a human-readable date.
 * Input: 1709251200000
 * Usage: {{ 1709251200000 | timestampToDate }}
 * Output: '3/1/2024, 12:00:00 PM' (depends on locale)
 */
@Pipe({ name: 'timestampToDate' })
export class TimestampToDatePipe implements PipeTransform {
  transform(value: number): string {
    return new Date(value).toLocaleString();
  }
}
