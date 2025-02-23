import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @copyright 2025 datacharge
 * @license Apache-2.0
 * @description Utility functions for the app
 */

/**
 * Node modules
 */
import {
  formatRelative,
  isSameYear,
  format,
  isBefore,
  isToday,
  isTomorrow,
  startOfToday,
} from 'date-fns';
import { redirect } from 'react-router';

/**
 * Formats a date string to a custom format
 * (e.g. "Today", "Tomorrow", "Yesterday", "dd MMM" , "dd MMM yyyy")
 */

export function totTitleCase(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export function formatCustomDate(date: string | number | Date) {
  const today = new Date();

  // Get the relative day string
  const relativeDay = formatRelative(date, today).split(' at ')[0];

  // List of relative keywords to check
  const relativeDays = [
    'Today',
    'Tomorrow',
    'Yesterday',
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
  ];

  if (relativeDays.includes(relativeDay)) {
    return relativeDay;
  }

  if (isSameYear(date, today)) {
    return format(date, 'dd MMM');
  } else {
    return format(date, 'dd MMM yyyy');
  }
}

/**
 * Returns a color class based on the due date of a task
 */
export function getTaskDueDateColorClass(
  dueDate: Date | null,
  completed?: boolean,
): string | undefined {
  if (dueDate === null || completed === undefined) return;

  if (isBefore(dueDate, startOfToday()) && !completed) {
    return 'text-red-500';
  }

  if (isToday(dueDate)) {
    return 'text-emerald-500';
  }

  if (isTomorrow(dueDate) && !completed) {
    return 'text-amber-500';
  }
}
/**
 * Generates a unique ID by combining the current timestamp and a random number.
 *
 * This function creates an identifier using the current time in milliseconds
 * (converted to a base-36 string) concatenated with a random number,
 * also converted to a base-36 string and sliced to remove unnecessary characters.
 *
 * @ereturns {string} A unique identifier string.
 */

export function generateID() {
  return Math.random().toString(36).slice(8) + Date.now().toString(36);
}

export function getUserId(): string {
  const clerkUserId = localStorage.getItem('clerkUserId');

  if (!clerkUserId) {
    redirect('/auth-sync');
    return '';
  }

  return clerkUserId;
}
