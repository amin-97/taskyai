/**
 * @copyright 2025 datacharge
 * @license Apache-2.0
 * @description Today task laoder component for the app
 */

/**
 * Node modules
 */
import { databases, Query } from '@/lib/appwrite';
import { startOfToday, startOfTomorrow } from 'date-fns';

/**
 * Custom modules
 */
import { getUserId } from '@/lib/utils';

/**
 * Types
 */
import type { LoaderFunction } from 'react-router';

/**
 * Environment variables
 */
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const getTasks = async () => {
  try {
    return await databases.listDocuments(APPWRITE_DATABASE_ID, 'tasks', [
      Query.equal('completed', false),
      Query.and([
        Query.greaterThanEqual('due_date', startOfToday().toISOString()),
        Query.lessThanEqual('due_date', startOfTomorrow().toISOString()),
      ]),
      Query.equal('userId', getUserId()),
    ]);
  } catch (err) {
    console.error(err);
    throw new Error('Error getting inbox tasks');
  }
};

const todayTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks();

  return { tasks };
};

export default todayTaskLoader;
