/**
 * @copyright 2025 datacharge
 * @license Apache-2.0
 * @description Project Detail Loader component for the app
 */

/**
 * Node modules
 */
import { databases } from '@/lib/appwrite';

/**
 * Custom modules
 */
import { getUserId } from '@/lib/utils';

/**
 * Environment variables
 */
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

/**
 * Types
 */
import type { LoaderFunction } from 'react-router';

const getProject = async (projectId: string) => {
  try {
    const project = await databases.getDocument(
      APPWRITE_DATABASE_ID,
      'projects',
      projectId,
    );

    if (project.userId !== getUserId()) {
      throw new Error('Unauthorized');
    }

    return project;
  } catch (err) {
    console.log('Error getting project', err);

    if (err instanceof Error) {
      throw new Error(err.message);
    }

    throw new Error('Error getting project');
  }
};

const projectDetailLoader: LoaderFunction = async ({ params }) => {
  const { projectId } = params as { projectId: string };

  const project = await getProject(projectId);

  return { project };
};

export default projectDetailLoader;
