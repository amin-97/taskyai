/**
 * @copyright 2025 datacharge
 * @license Apache-2.0
 * @description App action for the app
 */

/**
 * Custom modules
 */
import { databases } from '@/lib/appwrite';
import { generateID, getUserId } from '@/lib/utils';

/**
 * Types
 */
import type { ActionFunction } from 'react-router';
import type { Task } from '@/types';

/**
 * Environment variables
 */
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const createTask = async (data: Task) => {
  try {
    return await databases.createDocument(
      APPWRITE_DATABASE_ID,
      'tasks',
      generateID(),
      { ...data, userId: getUserId() },
    );
  } catch (err) {
    console.error(err);
  }
};

const updateTask = async (data: Task) => {
  const documentId = data.id;

  if (!documentId) throw new Error('Task id not found');

  delete data.id;

  try {
    return await databases.updateDocument(
      APPWRITE_DATABASE_ID,
      'tasks',
      documentId,
      data,
    );
  } catch (err) {
    console.error(err);
  }
};

const appAction: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as Task;

  if (request.method === 'POST') {
    return await createTask(data);
  }

  if (request.method === 'PUT') {
    return await updateTask(data);
  }
};

export default appAction;
