/**
 * @copyright 2025 datacharge
 * @license Apache-2.0
 * @description Upcoming task loader component for the app
 */

/**
 * Node modules
 */
import { databases, Query } from '@/lib/appwrite';
import { startOfToday } from 'date-fns';

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
      Query.isNotNull('due_date'),
      Query.greaterThanEqual('due_date', startOfToday().toISOString()),
      Query.orderAsc('due_date'),
      Query.equal('userId', getUserId()),
    ]);
  } catch (err) {
    console.error(err);
    throw new Error('Error getting inbox tasks');
  }
};

const upcomingTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks();
  console.log(tasks);
  return { tasks };
};

export default upcomingTaskLoader;
